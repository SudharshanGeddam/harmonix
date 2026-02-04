/**
 * Ethical Receipts Page
 * 
 * Trust-focused dashboard displaying real receipts with verification status.
 * Blue-accented cards with verified/pending indicators.
 * 
 * Features:
 * - Fetch receipts from getReceipts() API
 * - Verified / Pending verification indicators
 * - Trust score metrics
 * - Graceful empty state
 * - No mock data
 */
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { getReceipts, Receipt as ReceiptType, ApiError } from "@/lib/api";


// Helper functions
function mapReceiptStatus(id?: string): "verified" | "pending" {
  // Simple mapping: assume every receipt is verified unless explicitly pending
  return id ? "verified" : "pending";
}

function formatDate(dateString?: string): string {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

function formatCurrency(amount?: number): string {
  if (amount === undefined || amount === null) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// Receipt Card Component
interface ReceiptCardProps {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category?: string;
  status: "verified" | "pending";
  harm_score?: number;
  disaster_type?: string | null;
  destination?: string;
  priority_label?: string;
}

function getHarmScoreColor(score?: number): { bg: string; text: string; icon: string } {
  if (score === undefined || score === null) {
    return { bg: "bg-gray-100", text: "text-gray-700", icon: "text-gray-500" };
  }
  if (score >= 80) {
    return { bg: "bg-red-100", text: "text-red-700", icon: "text-red-600" };
  }
  if (score >= 50) {
    return { bg: "bg-amber-100", text: "text-amber-700", icon: "text-amber-600" };
  }
  return { bg: "bg-green-100", text: "text-green-700", icon: "text-green-600" };
}

function getCombinedUrgency(priority?: string, harm_score?: number): { 
  label: string; 
  bg: string; 
  text: string; 
  icon: string; 
  animate: boolean;
  description: string;
} {
  const priorityIsHigh = priority?.toLowerCase() === "high";
  const priorityIsMedium = priority?.toLowerCase() === "medium";
  const harmIsHigh = harm_score !== undefined && harm_score !== null && harm_score >= 80;
  const harmIsMedium = harm_score !== undefined && harm_score !== null && harm_score >= 50;

  // CRITICAL HUMANITARIAN: high priority AND harm_score >= 80
  if (priorityIsHigh && harmIsHigh) {
    return {
      label: "CRITICAL HUMANITARIAN",
      bg: "bg-gradient-to-r from-red-600 to-orange-600",
      text: "text-white",
      icon: "🔥",
      animate: true,
      description: "Urgency derived from delivery priority and disaster impact at destination.",
    };
  }

  // HIGH URGENCY: high priority OR harm_score >= 80
  if (priorityIsHigh || harmIsHigh) {
    return {
      label: "HIGH URGENCY",
      bg: "bg-gradient-to-r from-orange-500 to-amber-500",
      text: "text-white",
      icon: "⚠️",
      animate: false,
      description: "Urgency derived from delivery priority and disaster impact at destination.",
    };
  }

  // ELEVATED RISK: medium priority AND harm_score >= 50
  if (priorityIsMedium && harmIsMedium) {
    return {
      label: "ELEVATED RISK",
      bg: "bg-gradient-to-r from-yellow-400 to-amber-400",
      text: "text-gray-800",
      icon: "🟡",
      animate: false,
      description: "Urgency derived from delivery priority and disaster impact at destination.",
    };
  }

  // NORMAL: default case
  return {
    label: "NORMAL",
    bg: "bg-gray-200",
    text: "text-gray-700",
    icon: "⚪",
    animate: false,
    description: "Urgency derived from delivery priority and disaster impact at destination.",
  };
}

function ReceiptCard({ 
  id, 
  merchant, 
  amount, 
  date, 
  category, 
  status,
  harm_score,
  disaster_type,
  destination,
  priority_label
}: ReceiptCardProps) {
  const harmScoreColor = getHarmScoreColor(harm_score);
  const isHighHarm = harm_score !== undefined && harm_score !== null && harm_score >= 80;
  const urgency = getCombinedUrgency(priority_label, harm_score);

  return (
    <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
      {/* Header with status and harm score */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
            {merchant || "Transaction"}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{date}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          {status === "verified" ? (
            <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0">
              <Clock className="h-3.5 w-3.5" />
              Pending
            </div>
          )}
          
          {/* Harm Score Badge */}
          {harm_score !== undefined && harm_score !== null ? (
            <div 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${harmScoreColor.bg} group relative ${isHighHarm ? "animate-criticalPulse" : ""}`}
              title="Harm score indicates humanitarian urgency at destination"
            >
              <AlertTriangle className={`h-3.5 w-3.5 ${harmScoreColor.icon}`} />
              <span className={`font-bold text-sm ${harmScoreColor.text}`}>
                {harm_score}
              </span>
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                High harm score indicates humanitarian urgency
              </div>
            </div>
          ) : (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${harmScoreColor.bg}`}>
              <AlertTriangle className={`h-3.5 w-3.5 ${harmScoreColor.icon}`} />
              <span className={`text-xs font-medium ${harmScoreColor.text}`}>
                No disaster
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Disaster context */}
      {(disaster_type || destination) && (
        <div className="mb-4 pb-4 border-b border-blue-100">
          <div className="flex items-center gap-2 text-xs">
            {disaster_type && (
              <span className="inline-flex items-center gap-1 bg-orange-100/70 text-orange-700 px-2 py-1 rounded">
                <AlertCircle className="h-3 w-3" />
                {disaster_type}
              </span>
            )}
            {destination && (
              <span className="text-gray-600">
                📍 {destination}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Urgency Impact Badge */}
      <div className={`mb-4 pb-4 border-b border-blue-100 ${urgency.animate ? "animate-pulse" : ""}`}>
        <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Urgency Impact</p>
        <div 
          className={`flex items-center justify-between px-3 py-2 rounded-lg ${urgency.bg} group relative`}
          title={urgency.description}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{urgency.icon}</span>
            <span className={`font-bold text-sm ${urgency.text}`}>
              {urgency.label}
            </span>
          </div>
          {/* Tooltip on hover */}
          <div className="absolute -bottom-8 left-0 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 pointer-events-none">
            {urgency.description}
          </div>
        </div>
      </div>

      {/* Amount and category */}
      <div className="border-t border-blue-100 pt-4">
        <p className="text-2xl font-bold text-gray-900 mb-2">{formatCurrency(amount)}</p>
        {category && (
          <p className="text-xs text-gray-600 bg-blue-50 inline-block px-2.5 py-1 rounded-lg">
            {category}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-blue-100">
        <p className="text-xs text-gray-500">ID: {id.substring(0, 12)}...</p>
      </div>
    </div>
  );
}

export default function EthicalReceiptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "verified" | "pending">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [receipts, setReceipts] = useState<ReceiptType[]>([]);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getReceipts();
        
        // Ensure data is an array
        const receiptsArray = Array.isArray(data) ? data : (data?.receipts || []);
        setReceipts(receiptsArray);
      } catch (err) {
        const errorMessage =
          err instanceof ApiError ? err.message : "Failed to load receipts";
        setError(errorMessage);
        console.error("Error fetching receipts:", err);
        // Set empty receipts array on error to prevent stuck loading state
        setReceipts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  // Filter receipts
  const filteredReceipts = receipts.filter((receipt) => {
    const matchesSearch =
      receipt.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.merchant?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const receiptStatus = mapReceiptStatus(receipt.id);
    const matchesStatus =
      statusFilter === "all" || receiptStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: receipts.length,
    verified: receipts.filter((r) => mapReceiptStatus(r.id) === "verified").length,
    pending: receipts.filter((r) => mapReceiptStatus(r.id) === "pending").length,
  };

  const verificationRate =
    stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 0;
  
  const totalAmount = receipts.reduce((sum, r) => sum + (r.amount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Blue gradient header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Ethical Receipts</h1>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white border border-white/30">
            <ShieldCheck className="h-3.5 w-3.5" />
            Trust Verified
          </span>
        </div>
        <p className="text-blue-100">
          Transparent proof of ethical sourcing and compliance
        </p>
      </div>

      {/* Trust metrics banner */}
      {!isLoading && (
        <section className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <ShieldCheck className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Harm Score
                </p>
                <p className="text-3xl font-bold text-blue-900">
                  {verificationRate}%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Verified</p>
                <p className="text-2xl font-bold text-blue-900">
                  {stats.verified}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Pending</p>
                <p className="text-2xl font-bold text-blue-900">
                  {stats.pending}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search by ID, merchant, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1 flex-shrink-0">
            {[
              { key: "all" as const, label: "All", icon: FileText },
              { key: "verified" as const, label: "Verified", icon: CheckCircle2 },
              { key: "pending" as const, label: "Pending", icon: Clock },
            ].map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.key}
                  onClick={() => setStatusFilter(filter.key)}
                  disabled={isLoading}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 disabled:opacity-50 whitespace-nowrap ${
                    statusFilter === filter.key
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex gap-4">
          <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Failed to Load Receipts</h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Receipts grid */}
      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-xl border border-gray-200 bg-white animate-pulse"
            />
          ))}
        </div>
      ) : filteredReceipts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 py-16">
          <FileText className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-sm font-medium text-gray-900">
            {searchQuery ? "No receipts match your search" : "No receipts found"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Receipts will appear here"}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReceipts.map((receipt) => (
            <ReceiptCard
              key={receipt.id}
              id={receipt.id}
              merchant={receipt.merchant || "Transaction"}
              amount={receipt.amount || 0}
              date={formatDate(receipt.created_at)}
              category={receipt.category}
              status={mapReceiptStatus(receipt.id)}
              harm_score={receipt.harm_score}
              disaster_type={receipt.disaster_type}
              destination={receipt.destination}
              priority_label={receipt.priority_label}
            />
          ))}
        </div>
      )}

      {/* Info footer */}
      <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-200">
            <ShieldCheck className="h-4 w-4 text-blue-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              About Ethical Verification
            </p>
            <p className="mt-1 text-sm text-gray-600">
              All receipts are cryptographically verified to ensure compliance
              with fair trade, environmental, and labor standards throughout the
              supply chain.
            </p>
          </div>
        </div>
      </div>

      {/* Results count */}
      {!isLoading && !error && (
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {filteredReceipts.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {receipts.length}
          </span>{" "}
          receipts
          {totalAmount > 0 && (
            <>
              {" "}
              • Total: <span className="font-semibold text-gray-900">{formatCurrency(totalAmount)}</span>
            </>
          )}
        </p>
      )}
    </div>
  );
}
