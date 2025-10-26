import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { account, user as userTable, session as sessionTable } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { auth } from "@/lib/auth";
import type { Auth } from "better-auth";
import { decodeJwt, importJWK, jwtVerify } from "jose";

// Input validation
const ExchangeSchema = z.object({
  provider: z.enum(["google", "github"]),
  token: z.string().min(1),
});

// Helpers to fetch provider profiles
async function fetchGoogleProfileFromAccessToken(accessToken: string) {
  const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Invalid Google access token");
  return (await res.json()) as { id?: string; sub?: string; email?: string; name?: string; picture?: string };
}

async function verifyGoogleIdToken(idToken: string) {
  // We do a lightweight decode to get header.kid and iss, then jwks
  const decoded = decodeJwt(idToken);
  // Google JWKS endpoint
  const jwksRes = await fetch("https://www.googleapis.com/oauth2/v3/certs");
  if (!jwksRes.ok) throw new Error("Failed to fetch Google JWKS");
  const { keys } = (await jwksRes.json()) as { keys: Array<{ kid: string; kty: string; n: string; e: string; alg: string }>; };
  // Try to verify against the set of keys
  let payload: any | null = null;
  for (const jwk of keys) {
    try {
      const key = await importJWK(jwk, jwk.alg);
      const { payload: p } = await jwtVerify(idToken, key, {
        issuer: ["https://accounts.google.com", "accounts.google.com"],
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = p;
      break;
    } catch (_) {
      // try next key
    }
  }
  if (!payload) throw new Error("Invalid Google ID token");
  return payload as { sub: string; email?: string; name?: string; picture?: string };
}

async function fetchGitHubProfile(accessToken: string) {
  const res = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error("Invalid GitHub access token");
  const json = await res.json();
  // Fetch primary email if not present
  let email = json.email as string | null;
  if (!email) {
    const emailsRes = await fetch("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github+json" },
    });
    if (emailsRes.ok) {
      const emails = (await emailsRes.json()) as Array<{ email: string; primary: boolean; verified: boolean }>;
      email = emails.find((e) => e.primary)?.email ?? emails[0]?.email ?? null;
    }
  }
  return { id: String(json.id), login: json.login as string, name: json.name as string | null, email, avatar_url: json.avatar_url as string | undefined };
}

// Link or create user and account
async function linkOrCreateUser(
  providerId: "google" | "github",
  accountId: string,
  profile: { email?: string | null; name?: string | null; image?: string | null },
  requestId?: string
) {
  // Find existing account
  const existingAccount = await db.query.account.findFirst({
    where: (fields, { and, eq }) => and(eq(fields.providerId, providerId), eq(fields.accountId, accountId)),
  });

  if (existingAccount) {
    const existingUser = await db.query.user.findFirst({ where: (f, { eq }) => eq(f.id, existingAccount.userId) });
    if (!existingUser) throw new Error("Orphaned account without user");
    console.log(
      JSON.stringify({
        event: "mobile_exchange.account_exists",
        requestId,
        providerId,
        accountId,
        userId: existingUser.id,
      })
    );
    return existingUser;
  }

  // No account: try by email if available
  let existingUserByEmail = null as null | { id: string; email: string; name: string | null; image: string | null; emailVerified: boolean; createdAt: Date; updatedAt: Date };
  if (profile.email) {
    existingUserByEmail = await db.query.user.findFirst({ where: (f, { eq }) => eq(f.email, profile.email!.toLowerCase()) });
    if (existingUserByEmail) {
      console.log(
        JSON.stringify({
          event: "mobile_exchange.user_by_email_found",
          requestId,
          email: profile.email?.toLowerCase(),
          userId: existingUserByEmail.id,
        })
      );
    }
  }

  const userId = existingUserByEmail?.id ?? randomUUID();
  if (!existingUserByEmail) {
    await db.insert(userTable).values({
      id: userId,
      email: (profile.email ?? `${providerId}-${accountId}@example.com`).toLowerCase(),
      name: profile.name ?? providerId,
      image: profile.image ?? null,
      emailVerified: Boolean(profile.email),
    });
    console.log(
      JSON.stringify({
        event: "mobile_exchange.user_created",
        requestId,
        userId,
        providerId,
      })
    );
  }

  // Link account
  await db.insert(account).values({
    id: randomUUID(),
    userId,
    providerId,
    accountId,
    accessToken: null,
    refreshToken: null,
    idToken: null,
    scope: null,
    password: null,
  });
  console.log(
    JSON.stringify({
      event: "mobile_exchange.account_linked",
      requestId,
      providerId,
      accountId,
      userId,
    })
  );

  const createdUser = await db.query.user.findFirst({ where: (f, { eq }) => eq(f.id, userId) });
  if (!createdUser) throw new Error("Failed to create user");
  return createdUser;
}

// Create a Better Auth session token for the user
async function createBetterAuthSession(userId: string) {
  // Using internal adapter to create a session aligned with Better Auth expectations
  // We call signInSocial endpoint flow minimally by directly creating a session
  // Note: internalAdapter is not exported; rely on DB table contract for sessions
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30d like Better Auth default
  const token = randomUUID();
  await db.insert(sessionTable).values({ id: randomUUID(), userId, token, expiresAt });
  return token;
}

export async function POST(req: Request) {
  try {
    const requestId = randomUUID();
    const body = await req.json();
    const { provider, token } = ExchangeSchema.parse(body);
    console.log(
      JSON.stringify({
        event: "mobile_exchange.received",
        requestId,
        provider,
        userAgent: req.headers.get("user-agent") ?? null,
      })
    );

    let email: string | null = null;
    let name: string | null = null;
    let image: string | null = null;
    let accountId: string;

    if (provider === "google") {
      // Try ID token first
      let sub: string | undefined;
      try {
        console.log(
          JSON.stringify({ event: "mobile_exchange.google_verify_id_token_attempt", requestId })
        );
        const payload = await verifyGoogleIdToken(token);
        sub = payload.sub;
        email = (payload.email ?? null) as string | null;
        name = (payload.name ?? null) as string | null;
        image = (payload.picture ?? null) as string | null;
      } catch {
        // Fallback: treat token as access token
        console.log(
          JSON.stringify({ event: "mobile_exchange.google_userinfo_attempt", requestId })
        );
        const info = await fetchGoogleProfileFromAccessToken(token);
        sub = (info.sub ?? info.id) as string | undefined;
        email = (info.email ?? null) as string | null;
        name = (info.name ?? null) as string | null;
        image = (info.picture ?? null) as string | null;
      }
      if (!sub) throw new Error("Unable to resolve Google user");
      accountId = sub;
    } else {
      // GitHub: access token
      console.log(
        JSON.stringify({ event: "mobile_exchange.github_userinfo_attempt", requestId })
      );
      const g = await fetchGitHubProfile(token);
      accountId = g.id;
      email = (g.email ?? null) as string | null;
      name = (g.name ?? g.login ?? null) as string | null;
      image = (g.avatar_url ?? null) as string | null;
    }

    const user = await linkOrCreateUser(provider, accountId, { email, name, image }, requestId);
    const sessionToken = await createBetterAuthSession(user.id);
    console.log(
      JSON.stringify({ event: "mobile_exchange.session_created", requestId, userId: user.id })
    );

    return NextResponse.json({
      token: sessionToken,
      user: { id: user.id, email: user.email, name: user.name, avatarUrl: user.image ?? null },
    });
  } catch (e: any) {
    const isDev = process.env.NODE_ENV !== "production";
    console.error(
      JSON.stringify({
        event: "mobile_exchange.error",
        message: e?.message ?? "Invalid request",
        stack: isDev ? e?.stack : undefined,
      })
    );
    return NextResponse.json({ message: e?.message ?? "Invalid request" }, { status: 400 });
  }
}
