/**
 * ReceiptCard Component
 * 
 * Ethical verification receipt display card.
 * Shows transaction details, proof summary, and verification status.
 * Features blockchain-style hash visualization and verify action.
 * 
 * Status types: verified (green), pending (amber), failed (red)
 */
import { CheckCircle2, Clock, AlertCircle, Shield, ExternalLink } from "lucide-react";

export type VerificationStatus = "verified" | "pending" | "failed";

interface ReceiptCardProps {
  transactionId: string;
  timestamp: string;
  proofSummary: string;
  status: VerificationStatus;
  supplier?: string;
  category?: string;
  onVerify?: () => void;
}

const statusConfig: Record<
  VerificationStatus,
  {
    label: string;
    icon: typeof CheckCircle2;
    color: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  verified: {
    label: "Verified",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  failed: {
    label: "Failed",
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
};

export default function ReceiptCard({
  transactionId,
  timestamp,
  proofSummary,
  status,
  supplier,
  category,
  onVerify,
}: ReceiptCardProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <article className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:-translate-y-1">
      {/* Top accent bar */}
      <div
        className={`h-1 w-full ${
          status === "verified"
            ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
            : status === "pending"
            ? "bg-gradient-to-r from-amber-400 to-amber-500"
            : "bg-gradient-to-r from-red-400 to-red-500"
        }`}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bgColor} transition-transform duration-300 group-hover:scale-110`}
            >
              <Shield className={`h-5 w-5 ${config.color}`} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {transactionId}
              </p>
              <p className="text-xs text-slate-500">{timestamp}</p>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.bgColor} ${config.color} ${config.borderColor}`}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {config.label}
          </span>
        </div>

        {/* Category & Supplier */}
        {(category || supplier) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {category && (
              <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                {category}
              </span>
            )}
            {supplier && (
              <span className="text-xs text-slate-500">
                via <span className="font-medium text-slate-700">{supplier}</span>
              </span>
            )}
          </div>
        )}

        {/* Proof Summary */}
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Proof Summary
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600 line-clamp-3">
            {proofSummary}
          </p>
        </div>

        {/* Blockchain-style hash visualization */}
        <div className="mt-4 rounded-lg bg-slate-50 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Verification Hash
          </p>
          <p className="mt-1 truncate font-mono text-xs text-slate-500">
            0x{transactionId.replace(/-/g, "").toLowerCase()}a7f3b2c1e8d4...
          </p>
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={onVerify}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-slate-800 active:scale-95 disabled:opacity-50"
          >
            <Shield className="h-4 w-4" />
            Verify
          </button>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-slate-400 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-600">
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50/0 via-slate-50/0 to-slate-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}
