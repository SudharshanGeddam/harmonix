/**
 * Login Page
 * Email + password authentication with Supabase
 * 
 * Features:
 * - Email validation
 * - Password strength requirements
 * - Sign up and sign in modes
 * - Rate limit handling
 * - Loading states
 * - Blue gradient background
 * - Centered card UI
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Mail, Lock, Loader } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Email validation
  const isValidEmail = (e: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(e);
  };

  // Form validation
  const isFormValid = () => {
    if (!email || !password) return false;
    if (!isValidEmail(email)) return false;
    if (isSignUp) {
      if (password.length < 6) return false;
      if (password !== confirmPassword) return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (isSignUp && password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign up
        const { error: signUpError, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (signUpError) {
          // Handle specific error cases
          if (
            signUpError.message.includes("rate limit") ||
            signUpError.message.includes("Too many requests")
          ) {
            setError(
              "Too many signup attempts. Please wait 1 hour before trying again, or use a different email address."
            );
          } else if (signUpError.message.includes("already registered")) {
            setError(
              "This email is already registered. Please sign in instead."
            );
          } else {
            setError(signUpError.message || "Failed to sign up");
          }
          return;
        }

        if (data?.user) {
          setSuccessMessage(
            "Account created! Check your email to verify your account before signing in."
          );
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          
          // Switch to signin after 3 seconds
          setTimeout(() => {
            setIsSignUp(false);
            setSuccessMessage(null);
          }, 3000);
        }
      } else {
        // Sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          if (
            signInError.message.includes("Invalid login credentials") ||
            signInError.message.includes("Email not confirmed")
          ) {
            setError(
              "Invalid email or password. Make sure you've verified your email."
            );
          } else {
            setError(signInError.message || "Failed to sign in");
          }
          return;
        }

        // Sign in successful - redirect to dashboard
        router.push("/");
      }
    } catch (err) {
      console.error("[Login] Auth error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
    setSuccessMessage(null);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -right-4 bottom-0 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm p-8 shadow-xl">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 text-white font-bold text-lg mb-3">
              H
            </div>
            <h1 className="text-2xl font-bold text-white">Harmonix</h1>
            <p className="mt-2 text-sm text-slate-400">
              {isSignUp
                ? "Create your account"
                : "Sign in to your account"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={isLoading}
                  required
                  className="w-full rounded-lg border border-slate-600 bg-slate-700/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 transition-all duration-200 focus:border-indigo-500 focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    isSignUp ? "At least 6 characters" : "Enter your password"
                  }
                  disabled={isLoading}
                  required
                  className="w-full rounded-lg border border-slate-600 bg-slate-700/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 transition-all duration-200 focus:border-indigo-500 focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {isSignUp && (
                <p className="mt-1.5 text-xs text-slate-400">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Confirm password input (sign up only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                    required
                    className="w-full rounded-lg border border-slate-600 bg-slate-700/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 transition-all duration-200 focus:border-indigo-500 focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-400 flex gap-2">
                <span className="font-medium">Error:</span>
                <span>{error}</span>
              </div>
            )}

            {/* Success message */}
            {successMessage && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm text-emerald-400 flex gap-2">
                <span className="font-medium">Success:</span>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && <Loader className="h-4 w-4 animate-spin" />}
              <span>
                {isLoading
                  ? "Processing..."
                  : isSignUp
                    ? "Create Account"
                    : "Sign In"}
              </span>
            </button>
          </form>

          {/* Toggle mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                type="button"
                onClick={toggleMode}
                disabled={isLoading}
                className="font-medium text-indigo-400 transition-colors duration-200 hover:text-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          {/* Footer info */}
          <p className="mt-6 text-center text-xs text-slate-500">
            Demo application. Use any email and password to test.
          </p>
        </div>
      </div>
    </div>
  );
}
