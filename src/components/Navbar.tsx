/**
 * Navbar Component
 *
 * Premium sticky top navigation bar with page title, search,
 * notifications, and user menu with auth info.
 *
 * Features:
 * - Dynamic page title from route
 * - Global search with Command+K hint
 * - Notification badge with pulse animation
 * - AI assistant quick action
 * - User menu with email display and logout
 */
"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  Bell,
  User,
  Command,
  Sparkles,
  Menu,
  LogOut,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/AuthProvider";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashboard", subtitle: "Welcome back, here's what's happening" },
  "/tracker": { title: "Package Tracker", subtitle: "Track your shipments" },
  "/package-tracker": { title: "Package Tracker", subtitle: "Monitor and manage shipments" },
  "/receipts": { title: "Receipts", subtitle: "View your purchase records" },
  "/ethical-receipts": { title: "Ethical Receipts", subtitle: "Verify blockchain compliance" },
  "/map": { title: "Map Visualization", subtitle: "Real-time fleet tracking" },
  "/settings": { title: "Settings", subtitle: "Manage your preferences" },
  "/help": { title: "Help & Support", subtitle: "Get assistance and resources" },
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const [searchFocused, setSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const currentPage = pageTitles[pathname] || { title: "EthicTrack", subtitle: "Supply chain platform" };

  // Extract email domain for avatar text
  const userEmail = user?.email || "User";
  const avatarText = userEmail
    .split("@")[0]
    .substring(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("[Navbar] Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
      setShowUserMenu(false);
    }
  };

  if (isLoading) {
    return (
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between gap-4 px-6">
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between gap-4 px-6">
        {/* Left Section - Page Title */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button (hidden on desktop) */}
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 lg:hidden focus:outline-none focus:ring-2 focus:ring-slate-200">
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden flex-col sm:flex">
            <h1 className="text-lg font-semibold text-gray-900">
              {currentPage.title}
            </h1>
            <p className="text-xs text-gray-500">{currentPage.subtitle}</p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex flex-1 items-center justify-center px-4">
          <div
            className={`relative flex w-full max-w-md items-center transition-all duration-300 ${
              searchFocused ? "max-w-lg" : ""
            }`}
          >
              <div
              className={`relative flex w-full items-center rounded-lg border transition-all duration-200 ${
                searchFocused
                  ? "border-slate-400 bg-white shadow-md ring-2 ring-slate-200"
                  : "border-gray-200 bg-slate-50/80 hover:bg-slate-100/80"
              }`}
            >
              <Search
                className={`ml-3 h-4 w-4 transition-colors duration-200 ${
                  searchFocused ? "text-slate-600" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                placeholder="Search packages, receipts, routes..."
                className="h-10 flex-1 bg-transparent px-3 text-sm text-gray-900 placeholder-gray-400 outline-none"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              {/* Keyboard shortcut hint */}
              <div
                className={`mr-3 hidden items-center gap-1 transition-opacity md:flex ${
                  searchFocused ? "opacity-0" : "opacity-100"
                }`}
              >
                <kbd className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white text-[10px] font-medium text-gray-500">
                  <Command className="h-3 w-3" />
                </kbd>
                <kbd className="flex h-5 min-w-[20px] items-center justify-center rounded border border-gray-300 bg-white text-[10px] font-medium text-gray-500">
                  K
                </kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* AI Assistant Button */}
          <button className="group hidden items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-slate-50 hover:shadow-md sm:flex">
            <Sparkles className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            <span>Ask AI</span>
          </button>

          {/* Notification Button */}
          <button className="group relative flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-slate-50 hover:text-gray-900 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-200">
            <Bell className="h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110" />
            {/* Notification badge with pulse */}
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-[10px] font-bold text-white shadow-lg">
                3
              </span>
            </span>
          </button>

          {/* User Menu */}
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="group relative flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-2 pr-3 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 shadow-sm text-white font-semibold text-xs">
              {avatarText}
            </div>
            <span className="hidden text-sm font-medium text-gray-700 lg:block max-w-[100px] truncate">
              {userEmail.split("@")[0]}
            </span>
            {/* Online status indicator */}
            <span className="absolute bottom-1 left-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />

            {/* Dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                {/* User info */}
                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{userEmail}</p>
                </div>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-slate-50 transition-colors duration-200 rounded-b-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                </button>
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
