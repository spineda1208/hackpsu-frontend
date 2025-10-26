"use client";

import { Sidebar } from "@/components/sidebar";
import { useAuth } from "@/lib/auth-utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="flex h-screen overflow-hidden bg-white dark:bg-zinc-950">
        <Sidebar />
        <main className="flex-1 w-full md:w-auto overflow-y-auto bg-zinc-50 dark:bg-black">
          <div className="container py-6 px-8 pt-20 md:pt-6">{children}</div>
        </main>
      </div>
    </>
  );
}
