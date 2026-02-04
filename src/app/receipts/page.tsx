/**
 * Ethical Receipts Page
 *
 * Verifiable delivery and ethical compliance records.
 * Displays a grid of receipt cards with verification status.
 *
 * Fetches real data from backend API.
 */
"use client";

import { useState, useEffect } from "react";
import ReceiptCard, { VerificationStatus } from "@/components/ReceiptCard";
import { getReceipts, Receipt as ReceiptType, ApiError } from "@/lib/api";
import { Shield, CheckCircle2, Clock, Loader2 } from "lucide-react";

// Map API status to display status
function mapReceiptStatus(status?: string): VerificationStatus {
  if (!status) return "pending";
  const normalized = status.toLowerCase();
  if (normalized === "verified" || normalized === "completed") return "verified";
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

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<ReceiptType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch receipts on mount
  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getReceipts();
        setReceipts(data);
      } catch (err) {
        const errorMessage = err instanceof ApiError ? err.message : "Failed to load receipts";
        setError(errorMessage);
        console.error("[ReceiptsPage] Error fetching receipts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  const verifiedCount = receipts.filter((r) => mapReceiptStatus(r.category) === "verified").length;
  const pendingCount = receipts.filter((r) => mapReceiptStatus(r.category) === "pending").length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Ethical Receipts</h1>
        <p className="mt-1 text-sm text-slate-500">
          Verifiable delivery and ethical compliance records
        </p>
      </header>

      {/* Stats summary */}
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">{isLoading ? "-" : verifiedCount}</p>
            <p className="text-sm text-slate-500">Verified</p>
          </div>
        </div>
        <div className="h-10 w-px bg-gray-200" />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">{isLoading ? "-" : pendingCount}</p>
            <p className="text-sm text-slate-500">Pending</p>
          </div>
        </div>
        <div className="h-10 w-px bg-gray-200" />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
            <Shield className="h-5 w-5 text-slate-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">{isLoading ? "-" : receipts.length}</p>
            <p className="text-sm text-slate-500">Total Records</p>
          </div>
        </div>
      </div>

      {/* Receipts grid */}
      <section aria-label="Receipts grid">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-12">
            <Loader2 className="h-12 w-12 text-slate-400 animate-spin mb-3" />
            <p className="text-sm font-medium text-slate-900">Loading receipts...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 py-12">
            <Shield className="h-12 w-12 text-red-300 mb-3" />
            <p className="text-sm font-medium text-red-600">Failed to load receipts</p>
            <p className="text-sm text-slate-500 mt-1">{error}</p>
          </div>
        ) : receipts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-12">
            <Shield className="h-12 w-12 text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-900">No receipts found</p>
            <p className="text-sm text-slate-500 mt-1">
              Receipts will appear here as transactions are verified
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {receipts.map((receipt, index) => (
              <div
                key={receipt.id}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <ReceiptCard
                  transactionId={receipt.id}
                  timestamp={formatDate(receipt.created_at || receipt.date)}
                  proofSummary={receipt.category || receipt.merchant || "Transaction record"}
                  status={mapReceiptStatus(receipt.category)}
                  category={receipt.amount ? `$${receipt.amount}` : receipt.category || "N/A"}
                  onVerify={() => {
                    // UI only - no action
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Results count */}
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-medium text-slate-700">{receipts.length}</span>{" "}
        receipts
      </p>
    </div>
  );
}
