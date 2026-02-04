/**
 * Dashboard Home Page
 *
 * Premium operations dashboard for logistics and disaster response.
 * Features animated stat cards, real-time activity feed, and alert monitoring.
 *
 * Sections:
 * - Hero header with live status indicator
 * - Key statistics cards with sparklines
 * - Recent activity timeline
 * - Active alerts with severity indicators
 * - Quick stats ribbon
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
  Users,
  Activity,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  Radio,
} from "lucide-react";

// Mock data for statistics with sparkline trends
const stats = [
  {
    title: "Total Packages",
    value: "12,847",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Package,
    gradient: "blue" as const,
    sparklineData: [45, 52, 49, 60, 55, 68, 72, 80, 75, 85, 90, 95],
  },
  {
    title: "Active Routes",
    value: "284",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: Route,
    gradient: "emerald" as const,
    sparklineData: [20, 25, 22, 30, 28, 35, 32, 40, 38, 42, 45, 48],
  },
  {
    title: "Alerts Detected",
    value: "23",
    change: "+5",
    changeType: "negative" as const,
    icon: AlertTriangle,
    gradient: "amber" as const,
    sparklineData: [8, 12, 10, 15, 18, 14, 20, 16, 22, 19, 25, 23],
  },
  {
    title: "Completed Deliveries",
    value: "8,392",
    change: "+18.7%",
    changeType: "positive" as const,
    icon: CheckCircle2,
    gradient: "violet" as const,
    sparklineData: [150, 180, 165, 200, 190, 220, 210, 250, 240, 280, 300, 320],
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
    badge: "bg-gradient-to-r from-red-500 to-rose-500 text-white",
    icon: "text-red-500 bg-red-50 ring-1 ring-red-100",
    border: "border-l-red-500",
    glow: "shadow-red-500/20",
  },
  high: {
    badge: "bg-gradient-to-r from-orange-500 to-amber-500 text-white",
    icon: "text-orange-500 bg-orange-50 ring-1 ring-orange-100",
    border: "border-l-orange-500",
    glow: "shadow-orange-500/20",
  },
  medium: {
    badge: "bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-900",
    icon: "text-amber-500 bg-amber-50 ring-1 ring-amber-100",
    border: "border-l-amber-400",
    glow: "shadow-amber-500/20",
  },
  low: {
    badge: "bg-gradient-to-r from-blue-400 to-cyan-400 text-white",
    icon: "text-blue-500 bg-blue-50 ring-1 ring-blue-100",
    border: "border-l-blue-400",
    glow: "shadow-blue-500/20",
  },
};

const statusStyles = {
  completed: {
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    icon: "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white",
  },
  "in-transit": {
    badge: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    icon: "bg-gradient-to-br from-blue-400 to-blue-500 text-white",
  },
  warning: {
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    icon: "bg-gradient-to-br from-amber-400 to-amber-500 text-white",
  },
};

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-8">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -right-4 bottom-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white">
                Dashboard
              </h1>
              <span className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Live
              </span>
            </div>
            <p className="text-base text-slate-400">
              Real-time logistics and risk overview for disaster response operations
            </p>
          </div>

          {/* Quick action buttons */}
          <div className="flex items-center gap-3">
            <button className="group flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm transition-all hover:bg-white/20 hover:ring-white/30">
              <Radio className="h-4 w-4" />
              <span>Broadcast</span>
            </button>
            <button className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40">
              <Sparkles className="h-4 w-4" />
              <span>AI Insights</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Mini stats row */}
        <div className="relative mt-6 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-slate-400">System Health:</span>
            <span className="text-sm font-semibold text-emerald-400">98.5%</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-slate-400">Response Time:</span>
            <span className="text-sm font-semibold text-amber-400">24ms</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-slate-400">Active Regions:</span>
            <span className="text-sm font-semibold text-blue-400">12</span>
          </div>
        </div>
      </header>

      {/* Stats grid */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Key Statistics
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              gradient={stat.gradient}
              sparklineData={stat.sparklineData}
            />
          ))}
        </div>
      </section>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent Activity - Takes 3 columns */}
        <section aria-labelledby="activity-heading" className="lg:col-span-3">
          <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg shadow-slate-900/20">
                  <Clock className="h-5 w-5 text-white" />
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
              <button className="group flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
                View all
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                const style = statusStyles[activity.status as keyof typeof statusStyles];
                return (
                  <div
                    key={activity.id}
                    className="group flex items-center gap-4 px-6 py-4 transition-all hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-lg ${style.icon}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {activity.title}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <p className="truncate text-xs text-slate-500">
                          {activity.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${style.badge}`}
                      >
                        {activity.status === "in-transit"
                          ? "In Transit"
                          : activity.status.charAt(0).toUpperCase() +
                            activity.status.slice(1)}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-gray-100 bg-gradient-to-r from-slate-50 to-white px-6 py-3">
              <p className="text-center text-xs text-slate-500">
                Showing 5 of 127 activities
              </p>
            </div>
          </div>
        </section>

        {/* Alerts Section - Takes 2 columns */}
        <section aria-labelledby="alerts-heading" className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-red-50 to-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-500 shadow-lg shadow-red-500/30">
                  <AlertTriangle className="h-5 w-5 text-white" />
                  {/* Pulse indicator */}
                  <span className="absolute -right-1 -top-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                  </span>
                </div>
                <div>
                  <h2
                    id="alerts-heading"
                    className="text-base font-semibold text-slate-900"
                  >
                    Alerts & Risks
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
                    className={`group relative px-6 py-4 transition-all hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent border-l-4 ${styles.border}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-slate-900">
                            {alert.title}
                          </p>
                          <span
                            className={`shrink-0 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-sm ${styles.badge} ${styles.glow}`}
                          >
                            {alert.severity}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">
                          {alert.description}
                        </p>
                        <p className="mt-2 text-[11px] font-medium text-slate-400">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-gray-100 px-6 py-4">
              <button className="group w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:shadow-xl hover:from-slate-700 hover:to-slate-800 active:scale-[0.98]">
                <span>View All Alerts</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Quick stats bar */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 p-8 shadow-2xl shadow-indigo-500/25">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm ring-1 ring-white/30">
              <Zap className="h-7 w-7 text-amber-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-indigo-200">Response Time</p>
              <p className="text-3xl font-bold text-white">24 min</p>
              <p className="text-xs text-indigo-300">avg response</p>
            </div>
          </div>
          
          <div className="hidden h-16 w-px bg-white/20 sm:block" />
          
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm ring-1 ring-white/30">
              <Truck className="h-7 w-7 text-emerald-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-indigo-200">Fleet Utilization</p>
              <p className="text-3xl font-bold text-white">87.3%</p>
              <p className="text-xs text-indigo-300">capacity used</p>
            </div>
          </div>
          
          <div className="hidden h-16 w-px bg-white/20 sm:block" />
          
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm ring-1 ring-white/30">
              <Users className="h-7 w-7 text-blue-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-indigo-200">People Served</p>
              <p className="text-3xl font-bold text-white">45,892</p>
              <p className="text-xs text-indigo-300">this month</p>
            </div>
          </div>
          
          <div className="hidden h-16 w-px bg-white/20 sm:block" />
          
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm ring-1 ring-white/30">
              <MapPin className="h-7 w-7 text-violet-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-indigo-200">Active Zones</p>
              <p className="text-3xl font-bold text-white">12</p>
              <p className="text-xs text-indigo-300">regions covered</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
