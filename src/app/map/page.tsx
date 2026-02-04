/**
 * Map Visualization Page
 * 
 * Real-time fleet tracking and route visualization dashboard.
 * Displays vehicle locations, active routes, risk zones, and operational status.
 * 
 * Features:
 * - Interactive map placeholder with simulated vehicle markers
 * - Live route progress tracking with ETA
 * - Risk zone indicators with severity levels
 * - Fleet statistics and system status
 */
"use client";

import {
  Navigation,
  Truck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Radio,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  LocateFixed,
  Route,
  Activity,
  Shield,
  Map as MapIcon,
} from "lucide-react";

// Mock data for active routes
const activeRoutes = [
  {
    id: "RT-001",
    name: "Relief Camp Alpha",
    vehicle: "TRK-234",
    driver: "John Smith",
    status: "on-route",
    eta: "12 min",
    progress: 75,
    priority: "high",
  },
  {
    id: "RT-002",
    name: "Hospital District",
    vehicle: "TRK-156",
    driver: "Maria Garcia",
    status: "on-route",
    eta: "28 min",
    progress: 45,
    priority: "critical",
  },
  {
    id: "RT-003",
    name: "Community Center B",
    vehicle: "TRK-089",
    driver: "Alex Chen",
    status: "delayed",
    eta: "45 min",
    progress: 30,
    priority: "medium",
  },
  {
    id: "RT-004",
    name: "Water Station 12",
    vehicle: "TRK-312",
    driver: "Sarah Wilson",
    status: "arrived",
    eta: "—",
    progress: 100,
    priority: "low",
  },
];

// Mock data for risk zones
const riskZones = [
  { name: "Sector 4 - Flood Zone", level: "high", incidents: 3 },
  { name: "Highway 45 Corridor", level: "medium", incidents: 1 },
  { name: "Northern District", level: "low", incidents: 0 },
];

const statusColors = {
  "on-route": { bg: "bg-blue-500", text: "text-blue-700", light: "bg-blue-50" },
  delayed: { bg: "bg-amber-500", text: "text-amber-700", light: "bg-amber-50" },
  arrived: { bg: "bg-emerald-500", text: "text-emerald-700", light: "bg-emerald-50" },
};

const priorityColors = {
  critical: "border-red-500 bg-red-50",
  high: "border-orange-500 bg-orange-50",
  medium: "border-amber-500 bg-amber-50",
  low: "border-slate-300 bg-slate-50",
};

const riskLevelColors = {
  high: { bg: "bg-red-500", text: "text-red-700", light: "bg-red-50" },
  medium: { bg: "bg-amber-500", text: "text-amber-700", light: "bg-amber-50" },
  low: { bg: "bg-emerald-500", text: "text-emerald-700", light: "bg-emerald-50" },
};

export default function MapVisualizationPage() {
  return (
    <div className="flex h-[calc(100vh-7rem)] gap-5">
      {/* Main Map Area */}
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-slate-100 shadow-sm">
        {/* Map placeholder with visual elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(to right, #cbd5e1 1px, transparent 1px),
                linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Simulated map elements */}
          <div className="absolute inset-0">
            {/* Main roads */}
            <div className="absolute left-1/4 top-0 h-full w-1 bg-slate-300/60" />
            <div className="absolute left-1/2 top-0 h-full w-2 bg-slate-400/50" />
            <div className="absolute right-1/4 top-0 h-full w-1 bg-slate-300/60" />
            <div className="absolute top-1/3 left-0 w-full h-1 bg-slate-300/60" />
            <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-400/50" />
            <div className="absolute top-2/3 left-0 w-full h-1 bg-slate-300/60" />

            {/* Animated route paths */}
            <svg className="absolute inset-0 h-full w-full">
              {/* Route 1 - Curved path */}
              <path
                d="M 100 400 Q 300 200 500 300 T 800 200"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 8"
                className="animate-pulse"
              />
              {/* Route 2 */}
              <path
                d="M 200 100 Q 400 300 600 250 T 900 400"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="6 6"
                opacity="0.7"
              />
            </svg>

            {/* Animated vehicle markers */}
            <div className="absolute left-[30%] top-[40%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-3 animate-ping rounded-full bg-blue-400 opacity-30" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 shadow-lg shadow-blue-500/30">
                  <Truck className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <div className="absolute left-[55%] top-[35%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-3 animate-ping rounded-full bg-emerald-400 opacity-30" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
                  <Truck className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <div className="absolute left-[70%] top-[60%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-3 animate-ping rounded-full bg-amber-400 opacity-30" style={{ animationDuration: "2s" }} />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 shadow-lg shadow-amber-500/30">
                  <Truck className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            {/* Destination markers */}
            <div className="absolute left-[20%] top-[25%]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                <MapPin className="h-5 w-5 text-red-500" />
              </div>
            </div>

            <div className="absolute left-[80%] top-[30%]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                <MapPin className="h-5 w-5 text-red-500" />
              </div>
            </div>

            <div className="absolute left-[45%] top-[70%]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                <MapPin className="h-5 w-5 text-red-500" />
              </div>
            </div>

            {/* Risk zone overlay */}
            <div className="absolute left-[15%] top-[50%] h-32 w-32 rounded-full bg-red-500/10 border-2 border-dashed border-red-300" />
          </div>

          {/* Center map icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center opacity-20">
              <MapIcon className="mx-auto h-32 w-32 text-slate-400" />
              <p className="mt-2 text-lg font-medium text-slate-500">
                Interactive Map View
              </p>
            </div>
          </div>
        </div>

        {/* Map controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md transition-all hover:bg-slate-50 hover:shadow-lg">
            <ZoomIn className="h-5 w-5 text-slate-600" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md transition-all hover:bg-slate-50 hover:shadow-lg">
            <ZoomOut className="h-5 w-5 text-slate-600" />
          </button>
          <div className="my-1 h-px bg-slate-200" />
          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md transition-all hover:bg-slate-50 hover:shadow-lg">
            <Layers className="h-5 w-5 text-slate-600" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md transition-all hover:bg-slate-50 hover:shadow-lg">
            <LocateFixed className="h-5 w-5 text-slate-600" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md transition-all hover:bg-slate-50 hover:shadow-lg">
            <Maximize2 className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Live indicator */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-md backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
          <span className="text-sm font-medium text-slate-700">Live Tracking</span>
        </div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-white/90 px-5 py-3 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Active Vehicles</p>
                <p className="text-lg font-bold text-slate-900">24</p>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                <Route className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Active Routes</p>
                <p className="text-lg font-bold text-slate-900">18</p>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
                <Activity className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Avg Speed</p>
                <p className="text-lg font-bold text-slate-900">42 mph</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2">
            <Radio className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-white">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="flex w-80 flex-col gap-4">
        {/* Active Routes */}
        <div className="flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-slate-600" />
                <h2 className="font-semibold text-slate-900">Active Routes</h2>
              </div>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                {activeRoutes.length} active
              </span>
            </div>
          </div>
          <div className="max-h-[320px] overflow-y-auto">
            <div className="divide-y divide-gray-100">
              {activeRoutes.map((route) => {
                const statusStyle = statusColors[route.status as keyof typeof statusColors];
                return (
                  <div
                    key={route.id}
                    className={`p-4 transition-colors hover:bg-slate-50 border-l-4 ${
                      priorityColors[route.priority as keyof typeof priorityColors]
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {route.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {route.vehicle} • {route.driver}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle.light} ${statusStyle.text}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.bg}`} />
                        {route.status === "on-route"
                          ? "On Route"
                          : route.status === "delayed"
                          ? "Delayed"
                          : "Arrived"}
                      </span>
                    </div>
                    {route.status !== "arrived" && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Progress</span>
                          <span className="font-medium text-slate-700">
                            ETA: {route.eta}
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full transition-all ${statusStyle.bg}`}
                            style={{ width: `${route.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Risk Levels */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-slate-600" />
              <h2 className="font-semibold text-slate-900">Risk Zones</h2>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {riskZones.map((zone, index) => {
              const riskStyle = riskLevelColors[zone.level as keyof typeof riskLevelColors];
              return (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${riskStyle.light}`}
                    >
                      <AlertTriangle className={`h-4 w-4 ${riskStyle.text}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {zone.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {zone.incidents} active incident{zone.incidents !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${riskStyle.light} ${riskStyle.text}`}
                  >
                    {zone.level}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">Legend</h2>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                <Truck className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-slate-600">Vehicle in Transit</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-slate-600">Delivery Complete</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500">
                <Clock className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-slate-600">Delayed / Warning</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-red-500" />
              <span className="text-sm text-slate-600">Destination Point</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full border-2 border-dashed border-red-300 bg-red-50" />
              <span className="text-sm text-slate-600">Risk Zone</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-6 items-center">
                <div className="h-1 w-6 rounded-full bg-blue-500" style={{ backgroundImage: "repeating-linear-gradient(90deg, #3b82f6 0, #3b82f6 4px, transparent 4px, transparent 8px)" }} />
              </div>
              <span className="text-sm text-slate-600">Active Route</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
