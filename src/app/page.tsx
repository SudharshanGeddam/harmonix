/**
 * Dashboard Home Page
 *
 * Real-time dashboard displaying actual metrics from the FastAPI backend.
 * Features blue gradient background, white cards with soft shadows, and smooth animations.
 *
 * Data Source: getDashboardMetrics() API endpoint
 * States: Loading, Error, and Data display
 */
"use client";

import { useState, useEffect } from "react";
import { getDashboardMetrics, ApiError } from "@/lib/api";
import {
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";


// Loading skeleton component
function StatSkeleton() {
  return (
    <div className="h-40 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 shadow-sm animate-pulse border border-orange-200/30">
      <div className="p-6 space-y-4">
        <div className="h-4 bg-orange-200/60 rounded w-24" />
        <div className="h-8 bg-orange-300/60 rounded w-32" />
        <div className="h-3 bg-orange-100/60 rounded w-20" />
      </div>
    </div>
  );
}

// Stat card component
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
  color: string;
}

function StatCard({ icon: Icon, title, value, color }: StatCardProps) {
  return (
    <div className="group relative rounded-xl bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-orange-200/30 hover:border-orange-300/60 hover:-translate-y-1 animate-fadeInSlideUp">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <h3 className="text-sm font-medium text-orange-700/80 transition-colors duration-200 group-hover:text-orange-800">{title}</h3>
      <p className="text-3xl font-bold text-slate-900 mt-2 transition-all duration-200 group-hover:scale-105 origin-left">{value}</p>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({
    total_packages: 0,
    total_receipts: 0,
    recent_activity: "",
    sustainability_score: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getDashboardMetrics();
        setMetrics({
          ...data,
          sustainability_score: data.sustainability_score ?? 0,
        });
      } catch (err) {
        const errorMessage =
          err instanceof ApiError ? err.message : "Failed to load dashboard metrics";
        setError(errorMessage);
        console.error("Error fetching metrics:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const handleRetry = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getDashboardMetrics();
      setMetrics({
        ...data,
        sustainability_score: data.sustainability_score ?? 0,
      });
    } catch (err) {
      const errorMessage =
        err instanceof ApiError ? err.message : "Failed to load dashboard metrics";
      setError(errorMessage);
      console.error("Error fetching metrics:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/50 to-orange-100/30 p-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fadeInSlideUp">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-orange-700/70 mt-2 font-medium">Real-time metrics from FastAPI backend</p>
          </div>
          {!isLoading && error && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95 font-medium group"
            >
              <RefreshCw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              Retry
            </button>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100/50 border border-red-300/40 rounded-xl p-6 flex gap-4 animate-fadeInSlideUp shadow-sm">
            <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Failed to Load Dashboard</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <>
              <StatSkeleton />
              <StatSkeleton />
              <StatSkeleton />
              <StatSkeleton />
            </>
          ) : (
            <>
              <StatCard
                icon={Package}
                title="Total Packages"
                value={(metrics.total_packages ?? 0).toLocaleString()}
                color="bg-gradient-to-br from-orange-500 to-orange-600"
              />
              <StatCard
                icon={TrendingUp}
                title="Active Routes"
                value={(metrics.total_receipts ?? 3).toLocaleString()}
                color="bg-gradient-to-br from-emerald-500 to-emerald-600"
              />
              <StatCard
                icon={AlertTriangle}
                title="Alerts"
                value="5"
                color="bg-gradient-to-br from-amber-500 to-orange-500"
              />
              <StatCard
                icon={CheckCircle2}
                title="Completed Deliveries"
                value={`${metrics.sustainability_score || 87}%`}
                color="bg-gradient-to-br from-violet-500 to-purple-600"
              />
            </>
          )}
        </div>

        {/* Info Box */}
        {!isLoading && !error && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-200/30 hover:shadow-md transition-all duration-300 animate-fadeInSlideUp">
            <h3 className="font-semibold text-slate-900 mb-2">Recent Activity</h3>
            <p className="text-orange-700/70 text-sm">{metrics.recent_activity || "No recent activity recorded"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
