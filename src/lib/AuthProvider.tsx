/**
 * Auth Provider
 * Minimal auth state handling with redirects
 */
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const publicRoutes = ["/login"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session && !publicRoutes.includes(pathname)) {
          router.push("/login");
        } else if (session && pathname === "/login") {
          router.push("/");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        if (!publicRoutes.includes(pathname)) {
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: string, session: any) => {
        if (event === "SIGNED_OUT" && !publicRoutes.includes(pathname)) {
          router.push("/login");
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-600" />
      </div>
    );
  }

  return <>{children}</>;
}
