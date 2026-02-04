/**
 * Package Tracker Page
 * 
 * Real-time package tracking with blue gradient header and clean table design.
 * Features real backend data with modal for receiving packages.
 * 
 * Features:
 * - Fetch packages from getPackages() API
 * - Display urgency, sender_type, fragile status, priority_label
 * - "Receive Package" modal with form submission
 * - Loading, error, and empty states
 * - Trigger notifications for high-priority packages
 */
"use client";

import { useState, useEffect } from "react";
import { Search, Package, X, AlertTriangle } from "lucide-react";
import Badge, { BadgeVariant } from "@/components/Badge";
import { getPackages, processPackage, Package as PackageType, ApiError } from "@/lib/api";
import { useNotifications } from "@/lib/NotificationContext";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/Table";


// Status mapping
const statusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  "in_transit": { label: "In Transit", variant: "info" },
  "in-transit": { label: "In Transit", variant: "info" },
  delivered: { label: "Delivered", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  delayed: { label: "Delayed", variant: "danger" },
};

// Urgency mapping
const urgencyConfig: Record<string, { label: string; color: string }> = {
  low: { label: "Low", color: "bg-blue-100 text-blue-800" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  high: { label: "High", color: "bg-orange-100 text-orange-800" },
  critical: { label: "Critical", color: "bg-red-100 text-red-800" },
};

type PackageStatus = keyof typeof statusConfig;

function mapPackageStatus(status?: string): PackageStatus {
  const normalized = (status || "pending").toLowerCase().replace(" ", "_");
  return (normalized in statusConfig ? normalized : "pending") as PackageStatus;
}

function getUrgencyColor(urgency?: string): string {
  return urgencyConfig[urgency?.toLowerCase() || "low"]?.color || urgencyConfig.low.color;
}

function getUrgencyLabel(urgency?: string): string {
  return urgencyConfig[urgency?.toLowerCase() || "low"]?.label || "Low";
}

// Receive Package Modal
interface ReceivePackageModalProps {
  isOpen: boolean;
  packageId: string;
  onClose: () => void;
  onSubmit: (data: ReceivePackageFormData) => Promise<void>;
  isSubmitting: boolean;
}

interface ReceivePackageFormData {
  weight: string;
  fragile: boolean;
  sender_type: string;
  claimed_product_type: string;
}

function ReceivePackageModal({
  isOpen,
  packageId,
  onClose,
  onSubmit,
  isSubmitting,
}: ReceivePackageModalProps) {
  const [formData, setFormData] = useState<ReceivePackageFormData>({
    weight: "",
    fragile: false,
    sender_type: "",
    claimed_product_type: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit(formData);
      setFormData({
        weight: "",
        fragile: false,
        sender_type: "",
        claimed_product_type: "",
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process package");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Receive Package</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Package ID (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Package ID
            </label>
            <input
              type="text"
              value={packageId}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
              placeholder="e.g., 2.5"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sender Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sender Type
            </label>
            <select
              value={formData.sender_type}
              onChange={(e) =>
                setFormData({ ...formData, sender_type: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select sender type</option>
              <option value="hospital">Hospital</option>
              <option value="ngo">NGO</option>
              <option value="retail">Retail</option>
              <option value="government">Government</option>
            </select>
          </div>

          {/* Claimed Product Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Claimed Product Type
            </label>
            <input
              type="text"
              value={formData.claimed_product_type}
              onChange={(e) =>
                setFormData({ ...formData, claimed_product_type: e.target.value })
              }
              placeholder="e.g., Medical Supplies"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Fragile */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="fragile"
              checked={formData.fragile}
              onChange={(e) =>
                setFormData({ ...formData, fragile: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="fragile" className="text-sm font-medium text-gray-700">
              Fragile
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Receive Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PackageTrackerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifiedPackageIds, setNotifiedPackageIds] = useState<Set<string>>(new Set());
  const { addNotification } = useNotifications();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getPackages();
        setPackages(response.packages);
        
        // Check for high-priority packages and create notifications
        response.packages.forEach((pkg) => {
          const urgency = pkg.urgency?.toLowerCase() || "low";
          const isHighPriority = urgency === "high" || urgency === "critical";
          
          if (isHighPriority && !notifiedPackageIds.has(pkg.id)) {
            addNotification({
              title: `${urgency.charAt(0).toUpperCase() + urgency.slice(1)} Priority Package`,
              message: `Package ${pkg.id} from ${pkg.destination || "unknown"} requires attention`,
              type: urgency === "critical" ? "error" : "warning",
              priority: urgency === "critical" ? "critical" : "high",
              packageId: pkg.id,
            });
            
            // Mark as notified to avoid duplicate notifications
            setNotifiedPackageIds((prev) => new Set(prev).add(pkg.id));
          }
        });
      } catch (err) {
        const errorMessage =
          err instanceof ApiError
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

  // Filter packages based on search
  const filteredPackages = packages.filter((pkg) =>
    pkg.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReceivePackage = (packageId: string) => {
    setSelectedPackageId(packageId);
    setIsReceiveModalOpen(true);
  };

  const handleReceiveSubmit = async (formData: ReceivePackageFormData) => {
    if (!selectedPackageId) return;
    
    console.log("[handleReceiveSubmit] Starting submission...");
    try {
      setIsSubmitting(true);
      const payload = {
        weight: parseFloat(formData.weight),
        fragile: formData.fragile,
        sender_type: formData.sender_type,
        claimed_product_type: formData.claimed_product_type || null,
      };
      console.log("[handleReceiveSubmit] Sending payload:", payload);
      
      // Send PATCH request to process package
      console.log("[handleReceiveSubmit] Calling processPackage...");
      const processResponse = await processPackage(selectedPackageId, payload);
      console.log("[handleReceiveSubmit] Process response:", processResponse);
      
      // Wait a moment for backend to be consistent
      console.log("[handleReceiveSubmit] Waiting 500ms...");
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Refresh packages list from backend
      console.log("[handleReceiveSubmit] Calling getPackages...");
      const refreshed = await getPackages();
      console.log("[handleReceiveSubmit] getPackages response:", refreshed);
      console.log("[handleReceiveSubmit] Refetched packages:", refreshed.packages);
      console.log("[handleReceiveSubmit] Previous packages count:", packages.length);
      console.log("[handleReceiveSubmit] New packages count:", refreshed.packages.length);
      
      console.log("[handleReceiveSubmit] Updating state with new packages...");
      setPackages(refreshed.packages);
      console.log("[handleReceiveSubmit] State updated");
      
      // Close modal and clear selected package only after successful refresh
      console.log("[handleReceiveSubmit] Closing modal...");
      setIsReceiveModalOpen(false);
      setSelectedPackageId(null);
      console.log("[handleReceiveSubmit] Submission complete!");
    } catch (err) {
      console.error("[handleReceiveSubmit] Caught error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to process package";
      console.error("[handleReceiveSubmit] Error message:", errorMessage);
      throw new Error(errorMessage);
    } finally {
      console.log("[handleReceiveSubmit] Finally block - setting isSubmitting to false");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Blue gradient header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold">Package Tracker</h1>
        <p className="text-blue-100 mt-2">
          Track and manage packages in real-time
        </p>
      </div>

      {/* Search bar */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search by ID, destination, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
          />
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex gap-4">
          <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Failed to Load Packages</h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Package ID</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Sender Type</TableHead>
              <TableHead>Fragile</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Actions</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
                    <p className="text-sm text-gray-500">Loading packages...</p>
                  </div>
                </td>
              </tr>
            ) : filteredPackages.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Package className="h-10 w-10 text-gray-300" />
                    <p className="text-sm font-medium text-gray-600">
                      {searchQuery ? "No packages match your search" : "No packages found"}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredPackages.map((pkg, index) => (
                <TableRow key={pkg.id} index={index}>
                  <TableCell>
                    <span className="font-semibold text-gray-900">{pkg.id}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 text-sm">{pkg.destination || "Not specified"}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 text-sm">{pkg.category || "N/A"}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={pkg.priority_label === "high" ? "danger" : pkg.priority_label === "medium" ? "warning" : "success"} dot>
                      {pkg.priority_label || "Normal"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 text-sm capitalize">{pkg.sender_type || "Not specified"}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={pkg.fragile ? "warning" : "success"} dot>
                      {pkg.fragile ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={statusConfig[mapPackageStatus(pkg.status)].variant}
                      dot
                    >
                      {statusConfig[mapPackageStatus(pkg.status)].label}
                    </Badge>
                  </TableCell>
                  <TableCell align="right">
                    <button
                      onClick={() => handleReceivePackage(pkg.id)}
                      className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Receive
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!isLoading && !error && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredPackages.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {packages.length}
            </span>{" "}
            packages
          </p>
        </div>
      )}

      {/* Modal */}
      <ReceivePackageModal
        isOpen={isReceiveModalOpen}
        packageId={selectedPackageId || ""}
        onClose={() => {
          setIsReceiveModalOpen(false);
          setSelectedPackageId(null);
        }}
        onSubmit={handleReceiveSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
