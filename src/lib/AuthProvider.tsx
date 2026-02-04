/**
 * Auth Provider
 * Manages Supabase authentication state with proper session handling and redirects
 * 
 * Features:
 * - Checks initial session on mount
 * - Listens to auth state changes via onAuthStateChange
 * - Redirects unauthenticated users to /login
 * - Redirects authenticated users away from /login
 * - Stores user session in React state (no localStorage)
 * - Shows loading spinner during auth check
 */
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

const publicRoutes = ["/login"];

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check initial session
    const initAuth = async () => {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Handle routing after session check
        if (!currentSession && !publicRoutes.includes(pathname)) {
          router.push("/login");
        } else if (currentSession && pathname === "/login") {
          router.push("/");
        }
      } catch (error) {
        console.error("[Auth] Session check failed:", error);
        if (!publicRoutes.includes(pathname)) {
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initAuth();
  }, [router, pathname]);

  useEffect(() => {
    if (!isInitialized) return;

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("[Auth] State change event:", event);

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Handle events
        if (event === "SIGNED_IN") {
          // User just signed in - redirect to dashboard
          if (pathname === "/login") {
            router.push("/");
          }
        } else if (event === "SIGNED_OUT") {
          // User signed out - redirect to login
          if (!publicRoutes.includes(pathname)) {
            router.push("/login");
          }
        } else if (event === "USER_UPDATED") {
          // User info updated - keep on same page
          console.log("[Auth] User updated:", currentSession?.user?.email);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [router, pathname, isInitialized]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-600" />
          <p className="text-sm text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        isAuthenticated: !!session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use auth context
 * Usage: const { session, user, isAuthenticated } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
