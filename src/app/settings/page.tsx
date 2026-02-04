/**
 * Settings Page (Placeholder)
 * 
 * Configuration and preferences page for the EthicTrack platform.
 * Currently displays a coming soon state for demo purposes.
 */
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
  return (
    <div className="space-y-6">
      {/* Page header */}
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account and application preferences
        </p>
      </header>

      {/* Settings grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.title}
              className="group relative flex flex-col items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 transition-colors group-hover:bg-slate-200">
                <Icon className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">
                    {section.title}
                  </h3>
                  {section.status === "Coming Soon" && (
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
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
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg">
            <span className="text-xl font-bold text-white">JD</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">John Doe</h2>
            <p className="text-sm text-slate-500">john.doe@ethictrack.com</p>
            <p className="mt-1 text-xs text-slate-400">Administrator Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}
