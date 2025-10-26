"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/lib/auth-utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// VERSION 2: Minimal Grid - Swiss Style
export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSocialLogin = async (provider: "github" | "google") => {
    try {
      setIsLoading(provider);
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setIsLoading(null);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div 
            className="h-12 w-12 border-4 rounded-full border-t-transparent animate-spin"
            style={{ borderColor: '#F75C69', borderTopColor: 'transparent' }}
          />
          <p className="text-sm font-medium text-black dark:text-white">Loading</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 p-8">
      <div className="max-w-6xl mx-auto flex flex-col justify-between md:justify-center md:grid md:grid-cols-2 gap-4 md:gap-8 min-h-[calc(100vh-4rem)]">
        {/* Left Column - Branding */}
        <div className="flex flex-col justify-center items-center md:border-r border-zinc-300 dark:border-zinc-700 md:pr-8 order-2 md:order-1">
          <div className="text-center">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-black dark:text-white leading-none">
              Watchout<span className="text-3xl md:text-5xl ml-2" style={{ color: '#F75C69' }}>®</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mt-4 md:mt-6">
              Underserved communities beware
            </p>
          </div>
        </div>

        {/* Right Column - Sign In */}
        <div className="flex flex-col flex-1 justify-center items-center order-1 md:order-2 md:flex-initial">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
                Sign In
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Choose your authentication method
              </p>
            </div>

            <div className="space-y-3 flex flex-col items-center">
              <button
                className="w-1/2 border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white px-6 py-4 font-medium rounded-full hover:text-white dark:hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ ['--hover-bg' as any]: '#F75C69' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F75C69'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={() => handleSocialLogin("github")}
                disabled={isLoading !== null}
              >
                {isLoading === "github" ? (
                  <span className="flex items-center justify-center gap-3">
                    Connecting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    GitHub
                  </span>
                )}
              </button>

              <button
                className="w-1/2 border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white px-6 py-4 font-medium rounded-full hover:text-white dark:hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ ['--hover-bg' as any]: '#F75C69' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F75C69'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading !== null}
              >
                {isLoading === "google" ? (
                  <span className="flex items-center justify-center gap-3">
                    Connecting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </span>
                )}
              </button>
            </div>

            <div className="mt-8 text-center flex justify-center">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[180px]">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

