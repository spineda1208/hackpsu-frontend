/**
 * Central export file for all auth-related utilities
 * This provides a single import point for all authentication functionality
 */

// Better Auth client and hooks
export { authClient, signIn, signOut, useSession } from "./auth-client";

// Auth context and hooks
export { AuthProvider, useAuth } from "@/contexts/auth-context";
export type { User, Session, AuthContextValue } from "@/contexts/auth-context";
