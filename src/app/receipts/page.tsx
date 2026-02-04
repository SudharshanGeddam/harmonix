/**
 * Ethical Receipts Page
 *
 * Verifiable delivery and ethical compliance records.
 * Displays a grid of receipt cards with verification status.
 *
 * Fetches real data from API with loading and error states.
 */
"use client";

import { useState, useEffect } from "react";
import ReceiptCard, { VerificationStatus } from "@/components/ReceiptCard";
import { getReceipts, Receipt as ReceiptType, ApiError } from "@/lib/api";
import { Shield, CheckCircle2, Clock } from "lucide-react";

function mapReceiptStatus(status?: string): VerificationStatus {
  const normalizedStatus = (status || "pending").toLowerCase();
  if (normalizedStatus === "verified" || normalizedStatus === "completed") {
    return "verified";
  }
  return "pending";
}

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

export default function ReceiptsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [receipts, setReceipts] = useState<ReceiptType[]>([]);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getReceipts();
        setReceipts(data);
      } catch (err) {
        const errorMessage = err instanceof ApiError 
          ? err.message 
          : "Failed to load receipts";
        setError(errorMessage);
        console.error("Error fetching receipts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  const verifiedCount = receipts.filter(
    (r) => mapReceiptStatus(r.category) === "verified"
  ).length;
  const pendingCount = receipts.filter(
    (r) => mapReceiptStatus(r.category) === "pending"
  ).length;

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

      {/* Error state */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Failed to load receipts</p>
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      {/* Receipts grid */}
      <section aria-label="Receipts grid">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl border border-gray-200 bg-white animate-pulse"
              />
            ))}
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
            {receipts.map((receipt) => (
              <ReceiptCard
                key={receipt.id}
                transactionId={receipt.id}
                timestamp={formatDate(receipt.created_at)}
                proofSummary={receipt.category || "Transaction record"}
                status={mapReceiptStatus(receipt.category)}
                category={`$${receipt.amount || 0}`}
                onVerify={() => {
                  // UI only - no action
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Results count */}
      {!isLoading && (
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-700">{receipts.length}</span>{" "}
          receipts
        </p>
      )}
    </div>
  );
}
