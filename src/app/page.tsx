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
    <div className="h-40 rounded-xl bg-white shadow-sm animate-pulse">
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-8 bg-gray-200 rounded w-32" />
        <div className="h-3 bg-gray-100 rounded w-20" />
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
    <div className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
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
        setMetrics(data);
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
      setMetrics(data);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100/50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Real-time metrics from FastAPI backend</p>
          </div>
          {!isLoading && error && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex gap-4">
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
                color="bg-blue-600"
              />
              <StatCard
                icon={TrendingUp}
                title="Active Routes"
                value={(metrics.total_receipts ?? 0).toLocaleString()}
                color="bg-emerald-600"
              />
              <StatCard
                icon={AlertTriangle}
                title="Alerts"
                value="0"
                color="bg-amber-600"
              />
              <StatCard
                icon={CheckCircle2}
                title="Completed Deliveries"
                value={`${metrics.sustainability_score ?? 0}%`}
                color="bg-violet-600"
              />
            </>
          )}
        </div>

        {/* Info Box */}
        {!isLoading && !error && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Recent Activity</h3>
            <p className="text-gray-600 text-sm">{metrics.recent_activity || "No recent activity recorded"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
