/**
 * Package Tracker Page
 *
 * Track package movement and delivery status.
 * Features search, status filtering, and data table.
 * Enhanced with orange color palette and smooth animations.
 *
 * Fetches real data from backend API.
 */
"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown, Package, Loader2 } from "lucide-react";
import Badge, { BadgeVariant } from "@/components/Badge";
import { getPackages, Package as PackageType, ApiError } from "@/lib/api";

// Status configuration for badges
const statusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  "in-transit": { label: "In Transit", variant: "info" },
  "in_transit": { label: "In Transit", variant: "info" },
  delivered: { label: "Delivered", variant: "success" },
  delayed: { label: "Delayed", variant: "high" },
  pending: { label: "Pending", variant: "warning" },
};

// Map API status to display status
function mapPackageStatus(status?: string): string {
  if (!status) return "pending";
  const normalized = status.toLowerCase().replace(/[-_\s]/g, "-");
  if (normalized === "in-transit" || normalized === "in_transit") return "in-transit";
  if (normalized === "delivered") return "delivered";
  if (normalized === "delayed") return "delayed";
  return "pending";
}

// Format date for display
function formatDate(dateString?: string): string {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

export default function TrackerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch packages on mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getPackages();
        
        // DEBUG: Log API response
        console.log("[TrackerPage] API response:", response);
        
        // Extract packages array from response
        const packagesArray = response.packages || [];
        
        // DEBUG: Log extracted packages
        console.log("[TrackerPage] Extracted packages array:", packagesArray);
        
        setPackages(packagesArray);
      } catch (err) {
        const errorMessage = err instanceof ApiError ? err.message : "Failed to load packages";
        setError(errorMessage);
        console.error("[TrackerPage] Error fetching packages:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Filter packages based on search and status
  const filteredPackages = packages.filter((pkg) => {
    const id = pkg.id || pkg.tracking_number || "";
    const destination = pkg.current_location || "";
    const matchesSearch =
      id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.toLowerCase().includes(searchQuery.toLowerCase());
    const pkgStatus = mapPackageStatus(pkg.status);
    const matchesStatus = statusFilter === "all" || pkgStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page header */}
      <header className="animate-fadeInSlideUp">
        <h1 className="text-3xl font-bold text-slate-900">Package Tracker</h1>
        <p className="mt-1 text-sm text-orange-700/70 font-medium">
          Track package movement and delivery status
        </p>
      </header>

      {/* Search and filter bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fadeInSlideUp">
        {/* Search input */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-600/60 transition-colors duration-200" />
          <input
            type="search"
            placeholder="Search by Package ID or destination"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-orange-200/40 bg-gradient-to-r from-orange-50/50 to-amber-50/30 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-orange-600/40 transition-all duration-200 focus:border-orange-400/60 focus:outline-none focus:ring-2 focus:ring-orange-200/50 focus:bg-white hover:bg-gradient-to-r hover:from-orange-100/40 hover:to-amber-100/20"
            aria-label="Search packages"
          />
        </div>

        {/* Filter dropdown */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none rounded-lg border border-orange-200/40 bg-gradient-to-r from-orange-50/50 to-amber-50/30 py-2.5 pl-4 pr-10 text-sm font-medium text-orange-700/80 transition-all duration-200 focus:border-orange-400/60 focus:outline-none focus:ring-2 focus:ring-orange-200/50 focus:bg-white hover:bg-gradient-to-r hover:from-orange-100/40 hover:to-amber-100/20"
            aria-label="Filter by status"
          >
            <option value="all">Status: All</option>
            <option value="in-transit">Status: In Transit</option>
            <option value="delivered">Status: Delivered</option>
            <option value="delayed">Status: Delayed</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-600/60 transition-colors duration-200" />
        </div>
      </div>

      {/* Package table */}
      <div className="overflow-hidden rounded-xl border border-orange-200/30 bg-white shadow-sm hover:shadow-md transition-all duration-300 animate-fadeInSlideUp">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            {/* Sticky header */}
            <thead className="sticky top-0 z-10 border-b border-orange-200/40 bg-gradient-to-r from-orange-50/80 to-amber-50/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                  Package ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                  Destination
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100/50">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-10 w-10 text-orange-400 animate-spin" />
                      <p className="text-sm font-medium text-orange-800">
                        Loading packages...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="h-10 w-10 text-red-300" />
                      <p className="text-sm font-medium text-red-600">
                        Failed to load packages
                      </p>
                      <p className="text-sm text-orange-700/60">{error}</p>
                    </div>
                  </td>
                </tr>
              ) : filteredPackages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="h-10 w-10 text-orange-200" />
                      <p className="text-sm font-medium text-orange-800">
                        No packages found
                      </p>
                      <p className="text-sm text-orange-700/60">
                        Try adjusting your search or filter
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPackages.map((pkg, index) => {
                  const pkgStatus = mapPackageStatus(pkg.status);
                  const statusInfo = statusConfig[pkgStatus] || statusConfig["pending"];
                  return (
                    <tr
                      key={pkg.id || pkg.tracking_number}
                      className={`transition-all duration-200 hover:bg-orange-50/40 hover:shadow-sm ${
                        index % 2 === 1 ? "bg-orange-50/20" : "bg-white"
                      }`}
                    >
                      {/* Package ID */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900">
                          {pkg.tracking_number || pkg.id}
                        </span>
                      </td>

                      {/* Destination */}
                      <td className="px-6 py-4">
                        <span className="text-orange-800/80">{pkg.current_location || "N/A"}</span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <Badge variant={statusInfo.variant} dot animate={pkgStatus === "delayed"}>
                          {statusInfo.label}
                        </Badge>
                      </td>

                      {/* Last Updated */}
                      <td className="px-6 py-4">
                        <span className="text-orange-700/60">{formatDate(pkg.updated_at)}</span>
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
      <p className="text-sm text-orange-700/70 font-medium">
        Showing{" "}
        <span className="font-semibold text-orange-800">
          {filteredPackages.length}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-orange-800">
          {packages.length}
        </span>{" "}
        packages
      </p>
    </div>
  );
}
