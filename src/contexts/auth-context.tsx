"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useSession } from "@/lib/auth-client";

// Types based on Better Auth schema
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  expiresAt: Date;
  token: string;
  userId: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface AuthContextValue {
  // User data
  user: User | null;
  session: Session | null;

  // Computed properties
  isAuthenticated: boolean;
  isLoading: boolean;

  // Helper getters for common user properties
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  email: string | null;
  avatar: string | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: sessionData, isPending } = useSession();

  const contextValue = useMemo<AuthContextValue>(() => {
    const user = sessionData?.user ?? null;
    const session = sessionData?.session ?? null;
    const isAuthenticated = !!user && !!session;

    // Parse first and last name from the full name
    const nameParts = user?.name?.trim().split(" ") ?? [];
    const firstName = nameParts[0] ?? null;
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : null;

    return {
      user: user as User | null,
      session: session as Session | null,
      isAuthenticated,
      isLoading: isPending,
      firstName,
      lastName,
      fullName: user?.name ?? null,
      email: user?.email ?? null,
      avatar: user?.image ?? null,
    };
  }, [sessionData, isPending]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
