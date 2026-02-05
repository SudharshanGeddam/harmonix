/**
 * Sidebar Navigation Component
 *
 * Premium fixed left sidebar providing main app navigation.
 * Features active route highlighting with accent indicator and user profile section.
 *
 * Navigation:
 * - Dashboard (home)
 * - Package Tracker
 * - Ethical Receipts
 * - Map Visualization
 * - Settings & Help (secondary)
 */
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/AuthProvider";
import {
  LayoutDashboard,
  Package,
  FileCheck,
  Map,
  Settings,
  HelpCircle,
  LogOut,
  Zap,
  ChevronRight,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Overview & metrics",
  },
  {
    name: "Package Tracker",
    href: "/package-tracker",
    icon: Package,
    description: "Track shipments",
  },
  {
    name: "Ethical Receipts",
    href: "/ethical-receipts",
    icon: FileCheck,
    description: "Verify compliance",
  },
  {
    name: "Map Visualization",
    href: "/map",
    icon: Map,
    description: "Live fleet view",
  },
];

const bottomNavItems = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Help & Support",
    href: "/help",
    icon: HelpCircle,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("[Sidebar] Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const userEmail = user?.email || "User";
  const avatarText = userEmail
    .split("@")[0]
    .substring(0, 2)
    .toUpperCase();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Logo / Brand */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-orange-500/20 px-5 bg-gradient-to-r from-slate-900 via-slate-900 to-orange-950/30 transition-all duration-300">
        <div className="relative flex h-10 w-10 items-center justify-center">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 opacity-80 blur-sm animate-orangeGlow" />
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/40 group hover:scale-105 transition-transform duration-200">
            <Zap className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-white">
            Harmonix
          </span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-orange-300/70">
            Logistics Hub
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className="flex-1 space-y-1 overflow-y-auto px-3 py-6"
        aria-label="Main navigation"
      >
        {/* Section Label */}
        <div className="mb-4 flex items-center gap-2 px-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            Navigation
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent" />
        </div>

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-orange-500/20 text-orange-100"
                  : "text-slate-400 hover:bg-orange-500/10 hover:text-orange-100"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Active indicator - left accent bar */}
              <div
                className={`absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-b from-orange-400 to-orange-500 shadow-lg shadow-orange-500/40 scale-y-100"
                    : "scale-y-0 bg-orange-600 group-hover:scale-y-50 group-hover:bg-orange-500"
                }`}
              />

              {/* Icon container */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-orange-600/40"
                    : "bg-slate-800/40 group-hover:bg-orange-600/20"
                }`}
              >
                <Icon
                  className={`h-[18px] w-[18px] transition-all duration-200 group-hover:scale-110 ${
                    isActive ? "text-orange-300" : "text-slate-400 group-hover:text-orange-300"
                  }`}
                />
              </div>

              {/* Text */}
              <div className="flex flex-1 flex-col overflow-hidden">
                <span className="truncate">{item.name}</span>
                {item.description && (
                  <span
                    className={`truncate text-[10px] transition-colors duration-200 ${
                      isActive ? "text-orange-200/60" : "text-slate-600 group-hover:text-orange-200/60"
                    }`}
                  >
                    {item.description}
                  </span>
                )}
              </div>

              {/* Arrow indicator for active */}
              <ChevronRight
                className={`h-4 w-4 transition-all duration-200 ${
                  isActive
                    ? "text-orange-300 opacity-100"
                    : "text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-orange-300"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="shrink-0 border-t border-white/10 px-3 py-4">
        {/* Section Label */}
        <div className="mb-3 flex items-center gap-2 px-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            Support
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent" />
        </div>

        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
              }`}
            >
              <Icon
                className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-slate-300" : "text-slate-500 group-hover:text-slate-400"
                }`}
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* User Profile */}
      <div className="shrink-0 border-t border-orange-500/20 p-4">
        <div className="group flex items-center gap-3 rounded-xl bg-orange-500/10 p-3 transition-all duration-300 hover:bg-orange-500/20">
          {/* Avatar */}
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20 ring-2 ring-white/10">
              <span className="text-sm font-semibold text-white">{avatarText}</span>
            </div>
            {/* Online indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-emerald-500 shadow-lg shadow-emerald-500/50" />
          </div>

          {/* User info */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="truncate text-sm font-semibold text-white">
              {userEmail.split("@")[0]}
            </span>
            <span className="truncate text-xs text-orange-200/60">
              {userEmail}
            </span>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-orange-200/60 transition-all duration-300 hover:bg-orange-500/30 hover:text-orange-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
          </button>
        </div>
      </div>
    </aside>
  );
}
