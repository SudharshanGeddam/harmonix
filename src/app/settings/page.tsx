/**
 * Settings Page (Placeholder)
 * 
 * Configuration and preferences page for the EthicTrack platform.
 * Currently displays a coming soon state for demo purposes.
 */
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthProvider";
import { Bell, Shield, Palette, Globe, Database } from "lucide-react";

const settingsSections = [
  {
    title: "Notifications",
    description: "Configure alert preferences and delivery channels",
    icon: Bell,
    status: "Available",
  },
  {
    title: "Security",
    description: "Manage authentication and access controls",
    icon: Shield,
    status: "Available",
  },
  {
    title: "Appearance",
    description: "Customize theme and display preferences",
    icon: Palette,
    status: "Coming Soon",
  },
  {
    title: "Integrations",
    description: "Connect third-party services and APIs",
    icon: Globe,
    status: "Coming Soon",
  },
  {
    title: "Data Management",
    description: "Export data and manage storage settings",
    icon: Database,
    status: "Available",
  },
];

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();

  const userEmail = user?.email || "user@example.com";
  const userName = userEmail.split("@")[0];
  const avatarText = userName.substring(0, 2).toUpperCase();
  return (
    <div className="space-y-6">
      {/* Page header */}
      <header>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account and application preferences
        </p>
      </header>

      {/* Settings grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          const handleClick = () => {
            if (section.title === "Notifications") {
              router.push("/notifications");
            }
          };
          return (
            <button
              key={section.title}
              onClick={handleClick}
              disabled={section.status === "Coming Soon"}
              className="group relative flex flex-col items-start gap-4 rounded-xl border border-orange-200/40 bg-gradient-to-br from-white to-orange-50/30 p-6 text-left shadow-sm transition-all duration-200 hover:border-orange-300/60 hover:shadow-lg hover:-translate-y-1 animate-fadeIn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 transition-all duration-200 group-hover:scale-110 group-hover:shadow-md">
                <Icon className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900 transition-colors duration-200 group-hover:text-orange-700">
                    {section.title}
                  </h3>
                  {section.status === "Coming Soon" && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {section.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Account section */}
      <div className="rounded-xl border border-orange-200/40 bg-gradient-to-br from-white to-orange-50/30 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
            <span className="text-xl font-bold text-white">{avatarText}</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{userName}</h2>
            <p className="text-sm text-slate-500">{userEmail}</p>
            <p className="mt-1 text-xs text-orange-600/70">Active Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}
