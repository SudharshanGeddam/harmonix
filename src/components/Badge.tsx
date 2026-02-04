/**
 * Badge Component
 * 
 * Versatile status badge with multiple variants and sizes.
 * Supports optional dot indicator for live status display.
 * Features smooth animations and orange primary color scheme.
 * 
 * Variants: default, primary, success, warning, danger, info, critical, high
 * Sizes: sm, md
 */
import { ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "critical"
  | "high";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
  animate?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700 border-slate-200",
  primary: "bg-orange-100 text-orange-700 border-orange-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  critical: "bg-red-50 text-red-700 border-red-200",
  high: "bg-orange-50 text-orange-700 border-orange-200",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-slate-500",
  primary: "bg-orange-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
  critical: "bg-red-500",
  high: "bg-orange-500",
};

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  dot = false,
  animate = false,
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  const animationClass =
    animate && (variant === "critical" || variant === "high")
      ? "animate-subtlePulse"
      : "";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${animationClass}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]} ${
            animate && (variant === "critical" || variant === "high")
              ? "animate-pulse"
              : ""
          }`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
