/**
 * Package Tracker Page
 * 
 * Comprehensive package tracking and management interface.
 * Monitor shipment status, search packages, and filter by delivery state.
 * 
 * Features:
 * - Real-time search by ID, destination, or contents
 * - Status filtering (All, In Transit, Delivered, Delayed)
 * - Sortable data table with carrier information
 * - Status summary cards with live counts
 */
"use client";

import { useState } from "react";
import { Search, Package, Download, RefreshCw } from "lucide-react";
import Badge, { BadgeVariant } from "@/components/Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/Table";

// Mock data for packages
const mockPackages = [
  {
    id: "PKG-2026-001",
    destination: "Relief Camp Alpha, Zone 3",
    contents: "Medical Supplies",
    status: "delivered",
    carrier: "Express Logistics",
    lastUpdated: "Feb 4, 2026 09:23 AM",
  },
  {
    id: "PKG-2026-002",
    destination: "Hospital District, Sector 7",
    contents: "Emergency Kits",
    status: "in-transit",
    carrier: "Swift Delivery",
    lastUpdated: "Feb 4, 2026 08:45 AM",
  },
  {
    id: "PKG-2026-003",
    destination: "Community Center B",
    contents: "Food Packages",
    status: "in-transit",
    carrier: "Rapid Response",
    lastUpdated: "Feb 4, 2026 08:12 AM",
  },
  {
    id: "PKG-2026-004",
    destination: "Shelter Zone Delta",
    contents: "Blankets & Clothing",
    status: "delayed",
    carrier: "Express Logistics",
    lastUpdated: "Feb 4, 2026 07:30 AM",
  },
  {
    id: "PKG-2026-005",
    destination: "Water Station 12",
    contents: "Water Purification",
    status: "delivered",
    carrier: "Priority Freight",
    lastUpdated: "Feb 3, 2026 11:45 PM",
  },
  {
    id: "PKG-2026-006",
    destination: "Mobile Clinic Unit 5",
    contents: "Vaccines",
    status: "in-transit",
    carrier: "MedExpress",
    lastUpdated: "Feb 3, 2026 10:20 PM",
  },
  {
    id: "PKG-2026-007",
    destination: "Emergency HQ",
    contents: "Communication Equipment",
    status: "delivered",
    carrier: "Swift Delivery",
    lastUpdated: "Feb 3, 2026 09:15 PM",
  },
  {
    id: "PKG-2026-008",
    destination: "Evacuation Point C",
    contents: "Tents & Shelters",
    status: "delayed",
    carrier: "Rapid Response",
    lastUpdated: "Feb 3, 2026 08:00 PM",
  },
  {
    id: "PKG-2026-009",
    destination: "Field Kitchen 3",
    contents: "Cooking Equipment",
    status: "in-transit",
    carrier: "Express Logistics",
    lastUpdated: "Feb 3, 2026 06:30 PM",
  },
  {
    id: "PKG-2026-010",
    destination: "Power Station Alpha",
    contents: "Generators",
    status: "delivered",
    carrier: "Heavy Freight Co",
    lastUpdated: "Feb 3, 2026 04:45 PM",
  },
];

const statusConfig: Record<
  string,
  { label: string; variant: BadgeVariant }
> = {
  "in-transit": { label: "In Transit", variant: "info" },
  delivered: { label: "Delivered", variant: "success" },
  delayed: { label: "Delayed", variant: "danger" },
};

export default function PackageTrackerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter packages based on search and status
  const filteredPackages = mockPackages.filter((pkg) => {
    const matchesSearch =
      pkg.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.contents.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || pkg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: mockPackages.length,
    "in-transit": mockPackages.filter((p) => p.status === "in-transit").length,
    delivered: mockPackages.filter((p) => p.status === "delivered").length,
    delayed: mockPackages.filter((p) => p.status === "delayed").length,
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Package Tracker</h1>
          <p className="mt-1 text-sm text-slate-500">
            Track and manage all packages in the supply chain
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 active:scale-[0.98]">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </header>

      {/* Filters bar */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search by ID, destination, or contents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100"
            aria-label="Search packages"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
          {(["all", "in-transit", "delivered", "delayed"] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                  statusFilter === status
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {status === "all"
                  ? "All"
                  : statusConfig[status]?.label || status}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs ${
                    statusFilter === status
                      ? "bg-slate-100 text-slate-700"
                      : "bg-slate-200/50 text-slate-500"
                  }`}
                >
                  {statusCounts[status]}
                </span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {statusCounts["in-transit"]}
            </p>
            <p className="text-sm text-slate-500">In Transit</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
            <Package className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {statusCounts.delivered}
            </p>
            <p className="text-sm text-slate-500">Delivered</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
            <Package className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {statusCounts.delayed}
            </p>
            <p className="text-sm text-slate-500">Delayed</p>
          </div>
        </div>
      </div>

      {/* Packages table */}
      <Table>
        <TableHeader>
          <tr>
            <TableHead>Package ID</TableHead>
            <TableHead>Contents</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Carrier</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead align="right">Actions</TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {filteredPackages.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-5 py-12 text-center text-sm text-slate-500"
              >
                <div className="flex flex-col items-center gap-2">
                  <Package className="h-10 w-10 text-slate-300" />
                  <p>No packages found matching your criteria</p>
                </div>
              </td>
            </tr>
          ) : (
            filteredPackages.map((pkg, index) => (
              <TableRow key={pkg.id} index={index}>
                <TableCell>
                  <span className="font-semibold text-slate-900">{pkg.id}</span>
                </TableCell>
                <TableCell>
                  <span className="text-slate-700">{pkg.contents}</span>
                </TableCell>
                <TableCell>
                  <span className="text-slate-600">{pkg.destination}</span>
                </TableCell>
                <TableCell>
                  <span className="text-slate-600">{pkg.carrier}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={statusConfig[pkg.status].variant}
                    dot
                  >
                    {statusConfig[pkg.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-slate-500">{pkg.lastUpdated}</span>
                </TableCell>
                <TableCell align="right">
                  <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-700">{filteredPackages.length}</span> of{" "}
          <span className="font-medium text-slate-700">{mockPackages.length}</span> packages
        </p>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>
          <div className="flex items-center gap-1">
            <button className="h-9 w-9 rounded-lg bg-slate-900 text-sm font-medium text-white">
              1
            </button>
            <button className="h-9 w-9 rounded-lg text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100">
              2
            </button>
            <button className="h-9 w-9 rounded-lg text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100">
              3
            </button>
          </div>
          <button className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50">
            Next
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
