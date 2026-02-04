/**
 * Help & Support Page (Placeholder)
 * 
 * Help center and documentation access for the EthicTrack platform.
 * Provides quick links to resources and support channels.
 */
"use client";

import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  Mail,
  FileText,
  Video,
  ExternalLink,
} from "lucide-react";

const helpResources = [
  {
    title: "Documentation",
    description: "Comprehensive guides and API references",
    icon: BookOpen,
    action: "Browse Docs",
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step walkthrough videos",
    icon: Video,
    action: "Watch Now",
  },
  {
    title: "FAQs",
    description: "Answers to commonly asked questions",
    icon: FileText,
    action: "View FAQs",
  },
];

const supportChannels = [
  {
    title: "Live Chat",
    description: "Chat with our support team",
    icon: MessageCircle,
    availability: "24/7 Available",
    color: "emerald",
  },
  {
    title: "Email Support",
    description: "support@ethictrack.com",
    icon: Mail,
    availability: "Response within 24h",
    color: "blue",
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <header>
        <h1 className="text-2xl font-bold text-white">Help & Support</h1>
        <p className="mt-1 text-sm text-slate-500">
          Get help with EthicTrack features and contact our support team
        </p>
      </header>

      {/* Quick help banner */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-100">
            <HelpCircle className="h-7 w-7 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Need quick help?
            </h2>
            <p className="text-sm text-slate-600">
              Search our knowledge base or start a conversation with our AI assistant
            </p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-3">
            <svg
              className="h-5 w-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for help articles..."
              className="flex-1 border-none bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Help resources */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Help Resources
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {helpResources.map((resource) => {
            const Icon = resource.icon;
            return (
              <button
                key={resource.title}
                className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 transition-colors group-hover:bg-slate-200">
                  <Icon className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {resource.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {resource.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 group-hover:text-slate-900">
                  {resource.action}
                  <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Support channels */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Contact Support
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {supportChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.title}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    channel.color === "emerald"
                      ? "bg-emerald-100"
                      : "bg-blue-100"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      channel.color === "emerald"
                        ? "text-emerald-600"
                        : "text-blue-600"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {channel.title}
                  </h3>
                  <p className="text-sm text-slate-500">{channel.description}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    channel.color === "emerald"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {channel.availability}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
