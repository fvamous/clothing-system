import React from "react";
import { cn } from "@/lib/core/utils";

type BadgeVariant =
  | "default"
  | "success"
  | "danger"
  | "warning";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  default: "bg-white/10 border-white/10 text-white",
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  danger: "border-red-500/20 bg-red-500/10 text-red-400",
  warning: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
};

export default function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}