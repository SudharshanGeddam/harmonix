/**
 * Ethical Receipts Page
 *
 * Verifiable delivery and ethical compliance records.
 * Displays a grid of receipt cards with verification status.
 *
 * UI-only with mock data - no backend calls.
 */
import ReceiptCard, { VerificationStatus } from "@/components/ReceiptCard";
import { Shield, CheckCircle2, Clock } from "lucide-react";

// Mock data for receipts
const mockReceipts = [
  {
    transactionId: "TXN-2026-0001",
    packageId: "PKG-2026-0847",
    timestamp: "Feb 4, 2026 09:23 AM",
    proofSummary:
      "Ethical sourcing verified. All materials traced to certified suppliers with fair labor practices.",
    status: "verified" as VerificationStatus,
  },
  {
    transactionId: "TXN-2026-0002",
    packageId: "PKG-2026-0848",
    timestamp: "Feb 4, 2026 08:45 AM",
    proofSummary:
      "Supply chain verification in progress. Awaiting confirmation from distribution center.",
    status: "pending" as VerificationStatus,
  },
  {
    transactionId: "TXN-2026-0003",
    packageId: "PKG-2026-0849",
    timestamp: "Feb 4, 2026 08:12 AM",
    proofSummary:
      "Carbon neutral delivery confirmed. Offset credits validated through blockchain verification.",
    status: "verified" as VerificationStatus,
  },
  {
    transactionId: "TXN-2026-0004",
    packageId: "PKG-2026-0850",
    timestamp: "Feb 4, 2026 07:30 AM",
    proofSummary:
      "Humanitarian compliance check pending. Documentation under review by ethics committee.",
    status: "pending" as VerificationStatus,
  },
  {
    transactionId: "TXN-2026-0005",
    packageId: "PKG-2026-0851",
    timestamp: "Feb 3, 2026 11:45 PM",
    proofSummary:
      "Cold chain integrity verified. Temperature logs confirm proper handling throughout transit.",
    status: "verified" as VerificationStatus,
  },
  {
    transactionId: "TXN-2026-0006",
    packageId: "PKG-2026-0852",
    timestamp: "Feb 3, 2026 10:20 PM",
    proofSummary:
      "Medical supply authenticity confirmed. Batch numbers match manufacturer records.",
    status: "verified" as VerificationStatus,
  },
];

export default function ReceiptsPage() {
  const verifiedCount = mockReceipts.filter((r) => r.status === "verified").length;
  const pendingCount = mockReceipts.filter((r) => r.status === "pending").length;

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
            <p className="text-xl font-bold text-slate-900">{verifiedCount}</p>
            <p className="text-sm text-slate-500">Verified</p>
          </div>
        </div>
        <div className="h-10 w-px bg-gray-200" />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">{pendingCount}</p>
            <p className="text-sm text-slate-500">Pending</p>
          </div>
        </div>
        <div className="h-10 w-px bg-gray-200" />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
            <Shield className="h-5 w-5 text-slate-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">{mockReceipts.length}</p>
            <p className="text-sm text-slate-500">Total Records</p>
          </div>
        </div>
      </div>

      {/* Receipts grid */}
      <section aria-label="Receipts grid">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockReceipts.map((receipt) => (
            <ReceiptCard
              key={receipt.transactionId}
              transactionId={receipt.transactionId}
              timestamp={receipt.timestamp}
              proofSummary={receipt.proofSummary}
              status={receipt.status}
              category={receipt.packageId}
              onVerify={() => {
                // UI only - no action
              }}
            />
          ))}
        </div>
      </section>

      {/* Results count */}
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-medium text-slate-700">{mockReceipts.length}</span>{" "}
        receipts
      </p>
    </div>
  );
}
