/**
 * Sidebar Navigation Component
 * 
 * Fixed left sidebar providing main app navigation.
 * Features active route highlighting and user profile section.
 * 
 * Navigation:
 * - Dashboard (home)
 * - Package Tracker
 * - Ethical Receipts
 * - Map Visualization
 * - Settings & Help (secondary)
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FileCheck,
  Map,
  Settings,
  HelpCircle,
  LogOut,
  Zap,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Package Tracker",
    href: "/package-tracker",
    icon: Package,
  },
  {
    name: "Ethical Receipts",
    href: "/ethical-receipts",
    icon: FileCheck,
  },
  {
    name: "Map Visualization",
    href: "/map",
    icon: Map,
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

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo / Brand */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-gray-200 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg shadow-slate-900/20">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-semibold tracking-tight text-slate-900">
            EthicTrack
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Supply Chain
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
        <div className="mb-2 px-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </span>
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
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/25"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white/30" />
              )}
              <Icon
                className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                }`}
              />
              <span className="truncate">{item.name}</span>
              {/* Hover glow effect for inactive items */}
              {!isActive && (
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-slate-100/0 via-slate-100/50 to-slate-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="shrink-0 border-t border-gray-200 px-3 py-4">
        <div className="mb-2 px-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Support
          </span>
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
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <Icon
                className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-slate-700" : "text-slate-400"
                }`}
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* User Profile */}
      <div className="shrink-0 border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 p-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 shadow-md">
              <span className="text-sm font-semibold text-white">JD</span>
            </div>
            {/* Online indicator */}
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="truncate text-sm font-semibold text-slate-900">
              John Doe
            </span>
            <span className="truncate text-xs text-slate-500">
              Admin Account
            </span>
          </div>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-white hover:text-slate-600 hover:shadow-sm"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
