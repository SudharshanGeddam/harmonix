/**
 * Ethical Receipts Page
 * 
 * Transparency and trust dashboard for supply chain verification.
 * Displays blockchain-verified receipts with ethical sourcing proof.
 * 
 * Features:
 * - Trust score metrics and verification rates
 * - Filterable receipt cards by verification status
 * - Proof summaries with supplier and category info
 * - Blockchain hash visualization for authenticity
 */
"use client";

import { useState } from "react";
import {
  Search,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  FileText,
  TrendingUp,
} from "lucide-react";
import ReceiptCard, { VerificationStatus } from "@/components/ReceiptCard";

// Mock data for receipts
const mockReceipts = [
  {
    id: "TXN-2026-0001",
    timestamp: "Feb 4, 2026 • 09:15 AM",
    proofSummary:
      "Fair trade certification verified for coffee beans sourced from Colombian cooperative. All workers received living wages above regional minimum.",
    status: "verified" as VerificationStatus,
    supplier: "Colombian Coffee Co.",
    category: "Fair Trade",
  },
  {
    id: "TXN-2026-0002",
    timestamp: "Feb 4, 2026 • 08:42 AM",
    proofSummary:
      "Carbon offset verification in progress. Shipment utilized electric vehicles for last-mile delivery. Awaiting third-party audit completion.",
    status: "pending" as VerificationStatus,
    supplier: "Green Logistics Inc.",
    category: "Carbon Neutral",
  },
  {
    id: "TXN-2026-0003",
    timestamp: "Feb 4, 2026 • 07:30 AM",
    proofSummary:
      "Sustainable sourcing confirmed for timber products. FSC certification validated. Chain of custody documentation complete.",
    status: "verified" as VerificationStatus,
    supplier: "EcoWood Supply",
    category: "Sustainable",
  },
  {
    id: "TXN-2026-0004",
    timestamp: "Feb 3, 2026 • 11:20 PM",
    proofSummary:
      "Verification failed due to incomplete documentation. Missing labor compliance certificates for manufacturing facility in batch #4521.",
    status: "failed" as VerificationStatus,
    supplier: "Global Textiles Ltd.",
    category: "Labor Rights",
  },
  {
    id: "TXN-2026-0005",
    timestamp: "Feb 3, 2026 • 09:45 PM",
    proofSummary:
      "Organic certification verified for agricultural products. USDA organic seal validated. No synthetic pesticides detected in sample testing.",
    status: "verified" as VerificationStatus,
    supplier: "Organic Farms Direct",
    category: "Organic",
  },
  {
    id: "TXN-2026-0006",
    timestamp: "Feb 3, 2026 • 06:15 PM",
    proofSummary:
      "Ethical mining certification pending review. Conflict-free minerals declaration submitted. Awaiting blockchain verification from source mines.",
    status: "pending" as VerificationStatus,
    supplier: "Ethical Minerals Corp",
    category: "Conflict-Free",
  },
  {
    id: "TXN-2026-0007",
    timestamp: "Feb 3, 2026 • 04:30 PM",
    proofSummary:
      "Animal welfare standards verified for dairy products. Pasture-raised certification confirmed. Third-party audit passed with excellence rating.",
    status: "verified" as VerificationStatus,
    supplier: "Happy Farms Dairy",
    category: "Animal Welfare",
  },
  {
    id: "TXN-2026-0008",
    timestamp: "Feb 3, 2026 • 02:00 PM",
    proofSummary:
      "Renewable energy verification complete. Manufacturing facility powered by 100% solar energy. Green energy certificates validated.",
    status: "verified" as VerificationStatus,
    supplier: "SolarTech Manufacturing",
    category: "Renewable Energy",
  },
  {
    id: "TXN-2026-0009",
    timestamp: "Feb 3, 2026 • 11:30 AM",
    proofSummary:
      "Water stewardship certification in review. Zero liquid discharge claim requires additional documentation from treatment facility.",
    status: "pending" as VerificationStatus,
    supplier: "AquaPure Industries",
    category: "Water Conservation",
  },
];

export default function EthicalReceiptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter receipts
  const filteredReceipts = mockReceipts.filter((receipt) => {
    const matchesSearch =
      receipt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.proofSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.supplier?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || receipt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: mockReceipts.length,
    verified: mockReceipts.filter((r) => r.status === "verified").length,
    pending: mockReceipts.filter((r) => r.status === "pending").length,
    failed: mockReceipts.filter((r) => r.status === "failed").length,
  };

  const verificationRate = Math.round((stats.verified / stats.total) * 100);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">
              Ethical Receipts
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Blockchain Verified
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Transparent proof of ethical sourcing and compliance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300">
            <Download className="h-4 w-4" />
            Export All
          </button>
        </div>
      </header>

      {/* Trust metrics banner */}
      <section className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
              <ShieldCheck className="h-7 w-7 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-800">
                Trust Score
              </p>
              <p className="text-3xl font-bold text-emerald-900">
                {verificationRate}%
              </p>
            </div>
          </div>
          <div className="h-12 w-px bg-emerald-200 hidden sm:block" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100/80">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-emerald-700">Verified</p>
              <p className="text-xl font-bold text-emerald-900">
                {stats.verified}
              </p>
            </div>
          </div>
          <div className="h-12 w-px bg-emerald-200 hidden sm:block" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100/80">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-emerald-700">Pending</p>
              <p className="text-xl font-bold text-emerald-900">
                {stats.pending}
              </p>
            </div>
          </div>
          <div className="h-12 w-px bg-emerald-200 hidden sm:block" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-emerald-700">This Month</p>
              <p className="text-xl font-bold text-emerald-900">+23%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search receipts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100"
            aria-label="Search receipts"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
          {[
            { key: "all", label: "All", icon: FileText },
            { key: "verified", label: "Verified", icon: CheckCircle2 },
            { key: "pending", label: "Pending", icon: Clock },
            { key: "failed", label: "Failed", icon: AlertCircle },
          ].map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.key}
                onClick={() => setStatusFilter(filter.key)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                  statusFilter === filter.key
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Receipts grid */}
      {filteredReceipts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-16">
          <FileText className="h-12 w-12 text-slate-300" />
          <p className="mt-4 text-sm font-medium text-slate-900">
            No receipts found
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReceipts.map((receipt) => (
            <ReceiptCard
              key={receipt.id}
              transactionId={receipt.id}
              timestamp={receipt.timestamp}
              proofSummary={receipt.proofSummary}
              status={receipt.status}
              supplier={receipt.supplier}
              category={receipt.category}
              onVerify={() => {
                // Non-functional - UI only
                console.log(`Verify clicked for ${receipt.id}`);
              }}
            />
          ))}
        </div>
      )}

      {/* Info footer */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200">
            <ShieldCheck className="h-4 w-4 text-slate-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">
              About Ethical Verification
            </p>
            <p className="mt-1 text-sm text-slate-600">
              All receipts are cryptographically signed and stored on a
              distributed ledger. Verification ensures compliance with fair
              trade, environmental, and labor standards throughout the supply
              chain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
