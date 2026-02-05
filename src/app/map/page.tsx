/**
 * Map Visualization Page
 *
 * Real-time logistics tracking visualization.
 * Two-column layout with map placeholder and route data panel.
 *
 * UI-only placeholder - no external map libraries.
 * Routes data structure shown for reference (awaiting API integration).
 */
"use client";

import {
  MapPin,
  Truck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Navigation,
  Activity,
  Shield,
  Route,
} from "lucide-react";
import Badge, { BadgeVariant } from "@/components/Badge";

// Route data structure (for API integration)
interface RouteData {
  id: string;
  destination: string;
  vehicle: string;
  status: "active" | "delayed" | "completed";
  eta: string;
}

// Status configuration
const statusConfig: Record<
  string,
  { label: string; variant: BadgeVariant; color: string }
> = {
  active: { label: "Active", variant: "info", color: "bg-blue-500" },
  delayed: { label: "Delayed", variant: "danger", color: "bg-red-500" },
  completed: { label: "Completed", variant: "success", color: "bg-emerald-500" },
};

export default function MapVisualizationPage() {
  // TODO: Fetch real routes from API endpoint
  const activeRoutes: RouteData[] = [
    {
      id: "ROUTE-001",
      destination: "New York, NY",
      vehicle: "Truck-A45",
      status: "active",
      eta: "2:30 PM",
    },
    {
      id: "ROUTE-002",
      destination: "Los Angeles, CA",
      vehicle: "Truck-B12",
      status: "active",
      eta: "4:15 PM",
    },
    {
      id: "ROUTE-003",
      destination: "Chicago, IL",
      vehicle: "Truck-C78",
      status: "completed",
      eta: "—",
    },
    {
      id: "ROUTE-004",
      destination: "Houston, TX",
      vehicle: "Truck-D56",
      status: "delayed",
      eta: "6:45 PM",
    },
    {
      id: "ROUTE-005",
      destination: "Miami, FL",
      vehicle: "Truck-E89",
      status: "active",
      eta: "3:20 PM",
    },
  ];
  
  const activeCount = activeRoutes.filter((r) => r.status === "active").length;
  const vehiclesInTransit = activeRoutes.filter(
    (r) => r.status === "active" || r.status === "delayed"
  ).length;

  return (
    <div className="flex h-[calc(100vh-7rem)] gap-6">
      {/* Main Map Area (70%) */}
      <div className="relative flex-[7] overflow-hidden rounded-2xl border border-gray-200 bg-slate-50 shadow-sm">
        {/* Grid pattern background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e2e8f0 1px, transparent 1px),
              linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Simulated route lines */}
        <svg className="absolute inset-0 h-full w-full">
          {/* Active route */}
          <path
            d="M 100 300 Q 250 150 400 200 T 700 150"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="12 6"
            opacity="0.8"
          />
          {/* Delayed route */}
          <path
            d="M 150 450 Q 350 350 500 400 T 750 300"
            fill="none"
            stroke="#ef4444"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="12 6"
            opacity="0.8"
          />
          {/* Completed route */}
          <path
            d="M 200 200 Q 400 100 550 180 T 800 100"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>

        {/* Vehicle markers */}
        <div className="absolute left-[40%] top-[35%] flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg ring-4 ring-blue-500/30">
          <Truck className="h-5 w-5" />
        </div>
        <div className="absolute left-[55%] top-[55%] flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg ring-4 ring-red-500/30">
          <Truck className="h-5 w-5" />
        </div>
        <div className="absolute left-[70%] top-[20%] flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
          <CheckCircle2 className="h-4 w-4" />
        </div>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm">
            <MapPin className="h-10 w-10 text-slate-400" />
          </div>
          <p className="mt-4 text-lg font-semibold text-slate-700">
            Live Route Visualization
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Real-time fleet tracking
          </p>
        </div>

        {/* Floating legend */}
        <div className="absolute bottom-4 left-4 rounded-xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Legend
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="h-3 w-6 rounded-full bg-blue-500" />
              <span className="text-sm text-slate-700">Active Route</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-3 w-6 rounded-full bg-red-500" />
              <span className="text-sm text-slate-700">Delayed Route</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-3 w-6 rounded-full bg-emerald-500" />
              <span className="text-sm text-slate-700">Completed Route</span>
            </div>
          </div>
        </div>

        {/* Map controls (UI only) */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200">
            <span className="text-lg font-bold">+</span>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200">
            <span className="text-lg font-bold">−</span>
          </button>
        </div>
      </div>

      {/* Side Panel (30%) */}
      <div className="flex w-[30%] min-w-[320px] flex-col gap-5">
        {/* Stats cards */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Fleet Overview
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {/* Active Routes */}
            <div className="rounded-xl bg-blue-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
                <Route className="h-5 w-5" />
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {activeCount}
              </p>
              <p className="text-sm text-slate-600">Active Routes</p>
            </div>

            {/* Vehicles in Transit */}
            <div className="rounded-xl bg-emerald-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white">
                <Truck className="h-5 w-5" />
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {vehiclesInTransit}
              </p>
              <p className="text-sm text-slate-600">In Transit</p>
            </div>
          </div>

          {/* Risk Level Indicator */}
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Risk Level
                  </p>
                  <p className="text-xs text-slate-600">Current assessment</p>
                </div>
              </div>
              <span className="rounded-full bg-amber-500 px-3 py-1 text-sm font-semibold text-white">
                Medium
              </span>
            </div>
          </div>
        </div>

        {/* Active Routes List */}
        <div className="flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Active Routes
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {activeRoutes.length} routes tracked
            </p>
          </div>
          <div className="divide-y divide-gray-100 overflow-y-auto">
            {activeRoutes.map((route) => {
              const config = statusConfig[route.status];
              return (
                <div
                  key={route.id}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50"
                >
                  {/* Status indicator */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      route.status === "completed"
                        ? "bg-emerald-100 text-emerald-600"
                        : route.status === "delayed"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {route.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : route.status === "delayed" ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : (
                      <Navigation className="h-5 w-5" />
                    )}
                  </div>

                  {/* Route info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {route.destination}
                    </p>
                    <p className="text-xs text-slate-500">
                      {route.vehicle} • {route.id}
                    </p>
                  </div>

                  {/* Status & ETA */}
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={config.variant} size="sm">
                      {config.label}
                    </Badge>
                    {route.eta !== "—" && (
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        {route.eta}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
