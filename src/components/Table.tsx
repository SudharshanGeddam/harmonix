/**
 * Table Components
 * 
 * Composable table system with zebra striping and hover effects.
 * Mobile-friendly with horizontal scroll on smaller screens.
 * 
 * Components:
 * - Table: Root container with border and shadow
 * - TableHeader: Styled thead with background
 * - TableBody: Divided rows container
 * - TableRow: Row with zebra striping option
 * - TableHead: Header cell with uppercase styling
 * - TableCell: Data cell with alignment options
 * - TableEmpty: Empty state placeholder
 */
import { ReactNode } from "react";

// Table Root
interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className = "" }: TableProps) {
  return (
    <div className={`overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>
      <table className="w-full min-w-[640px]">{children}</table>
    </div>
  );
}

// Table Header
interface TableHeaderProps {
  children: ReactNode;
}

export function TableHeader({ children }: TableHeaderProps) {
  return (
    <thead className="border-b border-gray-200 bg-slate-50/80">
      {children}
    </thead>
  );
}

// Table Body
interface TableBodyProps {
  children: ReactNode;
}

export function TableBody({ children }: TableBodyProps) {
  return <tbody className="divide-y divide-gray-100">{children}</tbody>;
}

// Table Row
interface TableRowProps {
  children: ReactNode;
  className?: string;
  zebra?: boolean;
  index?: number;
}

export function TableRow({
  children,
  className = "",
  zebra = true,
  index = 0,
}: TableRowProps) {
  return (
    <tr
      className={`transition-colors hover:bg-slate-50 ${
        zebra && index % 2 === 1 ? "bg-slate-50/50" : "bg-white"
      } ${className}`}
    >
      {children}
    </tr>
  );
}

// Table Head Cell
interface TableHeadProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

export function TableHead({
  children,
  className = "",
  align = "left",
}: TableHeadProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <th
      className={`whitespace-nowrap px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 ${alignStyles[align]} ${className}`}
    >
      {children}
    </th>
  );
}

// Table Cell
interface TableCellProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

export function TableCell({
  children,
  className = "",
  align = "left",
}: TableCellProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <td
      className={`whitespace-nowrap px-5 py-4 text-sm ${alignStyles[align]} ${className}`}
    >
      {children}
    </td>
  );
}

// Empty State
interface TableEmptyProps {
  message?: string;
  colSpan: number;
}

export function TableEmpty({
  message = "No data available",
  colSpan,
}: TableEmptyProps) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-5 py-12 text-center text-sm text-slate-500"
      >
        <div className="flex flex-col items-center gap-2">
          <svg
            className="h-10 w-10 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p>{message}</p>
        </div>
      </td>
    </tr>
  );
}
