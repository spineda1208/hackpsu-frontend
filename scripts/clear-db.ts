import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { videoStream, alert, user, session, account, verification } from "../src/db/schema";
import { sql } from "drizzle-orm";

const connectionString = process.env.DRIZZLE_DATABASE_URL;
if (!connectionString) {
  throw new Error("DRIZZLE_DATABASE_URL is not set");
}
const db = drizzle(connectionString);

async function clearDatabase() {
  console.log("🗑️  Starting database cleanup...");

  try {
    // Delete all alerts first (though cascade should handle it)
    await db.delete(alert);
    console.log("✅ Deleted all alerts");

    // Delete all video streams
    await db.delete(videoStream);
    console.log("✅ Deleted all video streams");

    // Clear auth tables
    await db.delete(verification);
    console.log("✅ Deleted all verifications");

    await db.delete(session);
    console.log("✅ Deleted all sessions");

    await db.delete(account);
    console.log("✅ Deleted all accounts");

    await db.delete(user);
    console.log("✅ Deleted all users");

    console.log("✨ Database cleanup complete!");
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    process.exit(1);
  }
}

clearDatabase();
