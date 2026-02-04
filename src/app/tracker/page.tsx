/**
 * Package Tracker Page
 *
 * Track package movement and delivery status.
 * Features search, status filtering, and data table.
 *
 * UI-only with mock data - no backend calls.
 */
"use client";

import { useState } from "react";
import { Search, ChevronDown, Package } from "lucide-react";
import Badge, { BadgeVariant } from "@/components/Badge";

// Status configuration for badges
const statusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  "in-transit": { label: "In Transit", variant: "info" },
  delivered: { label: "Delivered", variant: "success" },
  delayed: { label: "Delayed", variant: "danger" },
};

type PackageStatus = keyof typeof statusConfig;

// Mock data for packages (6-8 rows)
const mockPackages = [
  {
    id: "PKG-2026-0001",
    destination: "Relief Camp Alpha, Zone 3",
    status: "delivered" as PackageStatus,
    lastUpdated: "Feb 4, 2026 09:23 AM",
  },
  {
    id: "PKG-2026-0002",
    destination: "Hospital District, Sector 7",
    status: "in-transit" as PackageStatus,
    lastUpdated: "Feb 4, 2026 08:45 AM",
  },
  {
    id: "PKG-2026-0003",
    destination: "Community Center B",
    status: "in-transit" as PackageStatus,
    lastUpdated: "Feb 4, 2026 08:12 AM",
  },
  {
    id: "PKG-2026-0004",
    destination: "Shelter Zone Delta",
    status: "delayed" as PackageStatus,
    lastUpdated: "Feb 4, 2026 07:30 AM",
  },
  {
    id: "PKG-2026-0005",
    destination: "Water Station 12",
    status: "delivered" as PackageStatus,
    lastUpdated: "Feb 3, 2026 11:45 PM",
  },
  {
    id: "PKG-2026-0006",
    destination: "Mobile Clinic Unit 5",
    status: "in-transit" as PackageStatus,
    lastUpdated: "Feb 3, 2026 10:20 PM",
  },
  {
    id: "PKG-2026-0007",
    destination: "Emergency HQ",
    status: "delivered" as PackageStatus,
    lastUpdated: "Feb 3, 2026 09:15 PM",
  },
  {
    id: "PKG-2026-0008",
    destination: "Evacuation Point C",
    status: "delayed" as PackageStatus,
    lastUpdated: "Feb 3, 2026 08:00 PM",
  },
];

export default function TrackerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter packages based on search and status
  const filteredPackages = mockPackages.filter((pkg) => {
    const matchesSearch =
      pkg.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || pkg.status === statusFilter;
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
            placeholder="Search by Package ID or destination"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-colors duration-200 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            aria-label="Search packages"
          />
        </div>

        {/* Filter dropdown */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 transition-colors duration-200 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            aria-label="Filter by status"
          >
            <option value="all">Status: All</option>
            <option value="in-transit">Status: In Transit</option>
            <option value="delivered">Status: Delivered</option>
            <option value="delayed">Status: Delayed</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

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
                  Destination
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
              {filteredPackages.length === 0 ? (
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
                filteredPackages.map((pkg, index) => (
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

                    {/* Destination */}
                    <td className="px-6 py-4">
                      <span className="text-slate-700">{pkg.destination}</span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <Badge variant={statusConfig[pkg.status].variant} dot>
                        {statusConfig[pkg.status].label}
                      </Badge>
                    </td>

                    {/* Last Updated */}
                    <td className="px-6 py-4">
                      <span className="text-slate-500">{pkg.lastUpdated}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-medium text-slate-700">
          {filteredPackages.length}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-700">
          {mockPackages.length}
        </span>{" "}
        packages
      </p>
    </div>
  );
}
