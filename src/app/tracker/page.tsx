/**
 * Package Tracker Page
 *
 * Track package movement and delivery status.
 * Features search, status filtering, and data table.
 *
 * Fetches real data from API with loading and error states.
 */
"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown, Package } from "lucide-react";
import Badge, { BadgeVariant } from "@/components/Badge";
import { getPackages, Package as PackageType, ApiError } from "@/lib/api";

// Status configuration for badges
const statusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  "in-transit": { label: "In Transit", variant: "info" },
  "in_transit": { label: "In Transit", variant: "info" },
  delivered: { label: "Delivered", variant: "success" },
  delayed: { label: "Delayed", variant: "danger" },
  pending: { label: "Pending", variant: "warning" },
};

type PackageStatus = keyof typeof statusConfig;

function formatDate(dateString?: string): string {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      meridiem: "short",
    });
  } catch {
    return dateString;
  }
}

function mapPackageStatus(status?: string): PackageStatus {
  const normalizedStatus = (status || "pending").toLowerCase().replace("-", "_");
  return (normalizedStatus in statusConfig ? normalizedStatus : "pending") as PackageStatus;
}

export default function TrackerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [packages, setPackages] = useState<PackageType[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getPackages();
        setPackages(data);
      } catch (err) {
        const errorMessage = err instanceof ApiError 
          ? err.message 
          : "Failed to load packages";
        setError(errorMessage);
        console.error("Error fetching packages:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Filter packages based on search and status
  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      (pkg.id?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (pkg.current_location?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    const pkgStatus = mapPackageStatus(pkg.status);
    const matchesStatus =
      statusFilter === "all" || pkgStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Package Tracker</h1>
        <p className="mt-1 text-sm text-slate-500">
          Track package movement and delivery status
        </p>
      </header>

      {/* Search and filter bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search input */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search by Package ID or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-colors duration-200 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:bg-slate-50 disabled:text-slate-400"
            aria-label="Search packages"
          />
        </div>

        {/* Filter dropdown */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            disabled={isLoading}
            className="appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 transition-colors duration-200 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:bg-slate-50 disabled:text-slate-400"
            aria-label="Filter by status"
          >
            <option value="all">Status: All</option>
            <option value="in_transit">Status: In Transit</option>
            <option value="delivered">Status: Delivered</option>
            <option value="delayed">Status: Delayed</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Failed to load packages</p>
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      {/* Package table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            {/* Sticky header */}
            <thead className="sticky top-0 z-10 border-b border-gray-200 bg-slate-50/95 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Package ID
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Location
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-400" />
                      <p className="text-sm font-medium text-slate-900">
                        Loading packages...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredPackages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="h-10 w-10 text-slate-300" />
                      <p className="text-sm font-medium text-slate-900">
                        No packages found
                      </p>
                      <p className="text-sm text-slate-500">
                        Try adjusting your search or filter
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPackages.map((pkg, index) => {
                  const pkgStatus = mapPackageStatus(pkg.status);
                  const statusInfo = statusConfig[pkgStatus];
                  return (
                    <tr
                      key={pkg.id}
                      className={`transition-colors hover:bg-slate-50 ${
                        index % 2 === 1 ? "bg-slate-50/50" : "bg-white"
                      }`}
                    >
                      {/* Package ID */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900">
                          {pkg.id}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4">
                        <span className="text-slate-700">
                          {pkg.current_location || "Not specified"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <Badge variant={statusInfo.variant} dot>
                          {statusInfo.label}
                        </Badge>
                      </td>

                      {/* Last Updated */}
                      <td className="px-6 py-4">
                        <span className="text-slate-500">
                          {formatDate(pkg.updated_at)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results count */}
      {!isLoading && (
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-700">
            {filteredPackages.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-700">
            {packages.length}
          </span>{" "}
          packages
        </p>
      )}
    </div>
  );
}
