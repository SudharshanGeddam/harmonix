/**
 * Dashboard Home Page
 * 
 * Main operations dashboard for logistics and disaster response.
 * Provides at-a-glance metrics, activity feed, and alert monitoring.
 * 
 * Sections:
 * - Key statistics cards (packages, routes, alerts, deliveries)
 * - Recent activity timeline with status tracking
 * - Active alerts panel with severity indicators
 * - Quick stats bar with operational metrics
 */
import StatCard from "@/components/StatCard";
import {
  Package,
  Route,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Truck,
  AlertCircle,
  ShieldAlert,
  CloudRain,
  Flame,
  Users,
} from "lucide-react";

// Mock data for statistics
const stats = [
  {
    title: "Total Packages",
    value: "12,847",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Package,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-50",
  },
  {
    title: "Active Routes",
    value: "284",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: Route,
    iconColor: "text-emerald-600",
    iconBgColor: "bg-emerald-50",
  },
  {
    title: "Active Alerts",
    value: "23",
    change: "+5",
    changeType: "negative" as const,
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    iconBgColor: "bg-amber-50",
  },
  {
    title: "Completed Deliveries",
    value: "8,392",
    change: "+18.7%",
    changeType: "positive" as const,
    icon: CheckCircle2,
    iconColor: "text-violet-600",
    iconBgColor: "bg-violet-50",
  },
];

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    type: "delivery",
    title: "Emergency supplies delivered",
    location: "Relief Camp Alpha, Zone 3",
    time: "5 minutes ago",
    status: "completed",
    icon: CheckCircle2,
  },
  {
    id: 2,
    type: "dispatch",
    title: "Medical kit dispatched",
    location: "Hospital District, Sector 7",
    time: "12 minutes ago",
    status: "in-transit",
    icon: Truck,
  },
  {
    id: 3,
    type: "alert",
    title: "Route deviation detected",
    location: "Highway 45, Mile 23",
    time: "18 minutes ago",
    status: "warning",
    icon: AlertCircle,
  },
  {
    id: 4,
    type: "delivery",
    title: "Food packages delivered",
    location: "Community Center B",
    time: "32 minutes ago",
    status: "completed",
    icon: CheckCircle2,
  },
  {
    id: 5,
    type: "dispatch",
    title: "Water purification units",
    location: "River Delta Camp",
    time: "45 minutes ago",
    status: "in-transit",
    icon: Truck,
  },
];

// Mock data for alerts
const alerts = [
  {
    id: 1,
    severity: "critical",
    title: "Flood warning in Sector 4",
    description: "Routes 12, 15, and 18 may be affected. Consider alternate paths.",
    time: "10 min ago",
    icon: CloudRain,
  },
  {
    id: 2,
    severity: "high",
    title: "Vehicle breakdown on Route 7",
    description: "Truck #234 requires immediate assistance. ETA for backup: 25 min.",
    time: "23 min ago",
    icon: Truck,
  },
  {
    id: 3,
    severity: "medium",
    title: "Increased demand at Camp Delta",
    description: "Medical supplies running low. Resupply recommended within 6 hours.",
    time: "1 hour ago",
    icon: Users,
  },
  {
    id: 4,
    severity: "low",
    title: "Weather advisory",
    description: "Light rain expected in northern sectors. No major impact anticipated.",
    time: "2 hours ago",
    icon: ShieldAlert,
  },
];

const severityStyles = {
  critical: {
    badge: "bg-red-100 text-red-700 border-red-200",
    icon: "text-red-500 bg-red-50",
    border: "border-l-red-500",
  },
  high: {
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    icon: "text-orange-500 bg-orange-50",
    border: "border-l-orange-500",
  },
  medium: {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    icon: "text-amber-500 bg-amber-50",
    border: "border-l-amber-500",
  },
  low: {
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    icon: "text-blue-500 bg-blue-50",
    border: "border-l-blue-500",
  },
};

const statusStyles = {
  completed: "bg-emerald-50 text-emerald-700",
  "in-transit": "bg-blue-50 text-blue-700",
  warning: "bg-amber-50 text-amber-700",
};

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">
            Operations Dashboard
          </h1>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>
        <p className="text-sm text-slate-500">
          Real-time overview of logistics and disaster response operations
        </p>
      </header>

      {/* Stats grid */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Key Statistics
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              iconColor={stat.iconColor}
              iconBgColor={stat.iconBgColor}
            />
          ))}
        </div>
      </section>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent Activity - Takes 3 columns */}
        <section
          aria-labelledby="activity-heading"
          className="lg:col-span-3"
        >
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                  <Clock className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <h2
                    id="activity-heading"
                    className="text-base font-semibold text-slate-900"
                  >
                    Recent Activity
                  </h2>
                  <p className="text-xs text-slate-500">
                    Latest operations and updates
                  </p>
                </div>
              </div>
              <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                View all
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        activity.status === "completed"
                          ? "bg-emerald-100 text-emerald-600"
                          : activity.status === "in-transit"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {activity.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        <p className="text-xs text-slate-500 truncate">
                          {activity.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          statusStyles[activity.status as keyof typeof statusStyles]
                        }`}
                      >
                        {activity.status === "in-transit"
                          ? "In Transit"
                          : activity.status.charAt(0).toUpperCase() +
                            activity.status.slice(1)}
                      </span>
                      <span className="text-xs text-slate-400">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Alerts Section - Takes 2 columns */}
        <section
          aria-labelledby="alerts-heading"
          className="lg:col-span-2"
        >
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2
                    id="alerts-heading"
                    className="text-base font-semibold text-slate-900"
                  >
                    Active Alerts
                  </h2>
                  <p className="text-xs text-slate-500">
                    {alerts.length} alerts require attention
                  </p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {alerts.map((alert) => {
                const Icon = alert.icon;
                const styles =
                  severityStyles[alert.severity as keyof typeof severityStyles];
                return (
                  <div
                    key={alert.id}
                    className={`relative px-6 py-4 transition-colors hover:bg-slate-50 border-l-4 ${styles.border}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-slate-900 truncate">
                            {alert.title}
                          </p>
                          <span
                            className={`shrink-0 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles.badge}`}
                          >
                            {alert.severity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {alert.description}
                        </p>
                        <p className="mt-2 text-[11px] text-slate-400">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-gray-100 px-6 py-3">
              <button className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.98]">
                View All Alerts
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Quick stats bar */}
      <section className="rounded-2xl border border-gray-200 bg-gradient-to-r from-slate-900 to-slate-800 p-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <Flame className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Response Time</p>
              <p className="text-xl font-bold text-white">24 min avg</p>
            </div>
          </div>
          <div className="h-12 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <Truck className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Fleet Utilization</p>
              <p className="text-xl font-bold text-white">87.3%</p>
            </div>
          </div>
          <div className="h-12 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">People Served</p>
              <p className="text-xl font-bold text-white">45,892</p>
            </div>
          </div>
          <div className="h-12 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <MapPin className="h-6 w-6 text-violet-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Active Zones</p>
              <p className="text-xl font-bold text-white">12 regions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
