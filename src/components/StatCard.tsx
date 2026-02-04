/**
 * StatCard Component
 *
 * Premium statistics card with gradient accents, animated sparkline,
 * and smooth hover effects. Designed for enterprise dashboards.
 *
 * @param title - Metric label
 * @param value - Primary numeric value
 * @param change - Trend change (e.g., "+12%")
 * @param changeType - "positive" | "negative" | "neutral"
 * @param icon - Lucide icon component
 * @param gradient - Gradient color scheme
 * @param sparklineData - Optional array for mini chart
 */
import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient?: "blue" | "emerald" | "amber" | "violet" | "rose" | "indigo";
  sparklineData?: number[];
}

const gradientStyles = {
  blue: {
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
    iconShadow: "shadow-blue-500/30",
    accentBg: "from-blue-500/10 via-transparent to-transparent",
    ring: "ring-blue-500/20",
    sparkline: "stroke-blue-500",
    sparklineFill: "fill-blue-500/10",
  },
  emerald: {
    iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    iconShadow: "shadow-emerald-500/30",
    accentBg: "from-emerald-500/10 via-transparent to-transparent",
    ring: "ring-emerald-500/20",
    sparkline: "stroke-emerald-500",
    sparklineFill: "fill-emerald-500/10",
  },
  amber: {
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    iconShadow: "shadow-amber-500/30",
    accentBg: "from-amber-500/10 via-transparent to-transparent",
    ring: "ring-amber-500/20",
    sparkline: "stroke-amber-500",
    sparklineFill: "fill-amber-500/10",
  },
  violet: {
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
    iconShadow: "shadow-violet-500/30",
    accentBg: "from-violet-500/10 via-transparent to-transparent",
    ring: "ring-violet-500/20",
    sparkline: "stroke-violet-500",
    sparklineFill: "fill-violet-500/10",
  },
  rose: {
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-600",
    iconShadow: "shadow-rose-500/30",
    accentBg: "from-rose-500/10 via-transparent to-transparent",
    ring: "ring-rose-500/20",
    sparkline: "stroke-rose-500",
    sparklineFill: "fill-rose-500/10",
  },
  indigo: {
    iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    iconShadow: "shadow-indigo-500/30",
    accentBg: "from-indigo-500/10 via-transparent to-transparent",
    ring: "ring-indigo-500/20",
    sparkline: "stroke-indigo-500",
    sparklineFill: "fill-indigo-500/10",
  },
};

function Sparkline({
  data,
  strokeClass,
  fillClass,
}: {
  data: number[];
  strokeClass: string;
  fillClass: string;
}) {
  const width = 80;
  const height = 32;
  const padding = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const linePath = `M ${points.join(" L ")}`;
  const areaPath = `${linePath} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible"
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopOpacity="0.3" />
          <stop offset="100%" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} className={fillClass} />
      <path
        d={linePath}
        fill="none"
        className={strokeClass}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Animated dot at the end */}
      <circle
        cx={points[points.length - 1].split(",")[0]}
        cy={points[points.length - 1].split(",")[1]}
        r="3"
        className={`${strokeClass.replace("stroke-", "fill-")}`}
      >
        <animate
          attributeName="r"
          values="3;4;3"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.6;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export default function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  gradient = "blue",
  sparklineData,
}: StatCardProps) {
  const styles = gradientStyles[gradient];

  const changeConfig = {
    positive: {
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      icon: TrendingUp,
    },
    negative: {
      color: "text-rose-600",
      bg: "bg-rose-50",
      icon: TrendingDown,
    },
    neutral: {
      color: "text-slate-600",
      bg: "bg-slate-50",
      icon: Minus,
    },
  };

  const ChangeIcon = changeConfig[changeType].icon;

  return (
    <article className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:-translate-y-1">
      {/* Gradient accent background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${styles.accentBg} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Decorative corner gradient */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 opacity-60 transition-all duration-500 group-hover:scale-150 group-hover:opacity-40" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative">
        {/* Top row: Icon and sparkline */}
        <div className="flex items-start justify-between">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${styles.iconBg} shadow-lg ${styles.iconShadow} transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-3`}
          >
            <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
          </div>

          {sparklineData && sparklineData.length > 1 && (
            <div className="opacity-60 transition-opacity duration-300 group-hover:opacity-100">
              <Sparkline
                data={sparklineData}
                strokeClass={styles.sparkline}
                fillClass={styles.sparklineFill}
              />
            </div>
          )}
        </div>

        {/* Value and title */}
        <div className="mt-5">
          <p className="text-sm font-medium text-slate-500 transition-colors duration-300 group-hover:text-slate-600">
            {title}
          </p>
          <p className="mt-1.5 text-4xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        {/* Change indicator */}
        {change && (
          <div className="mt-4 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${changeConfig[changeType].bg} ${changeConfig[changeType].color}`}
            >
              <ChangeIcon className="h-3 w-3" />
              {change}
            </span>
            <span className="text-xs text-slate-400">vs last period</span>
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 h-1 w-0 ${styles.iconBg} transition-all duration-500 group-hover:w-full`}
      />
    </article>
  );
}
