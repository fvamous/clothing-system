import React from "react";
import { cn } from "@/lib/core/utils";
import { tokens } from "@/lib/ui/tokens";

type BadgeVariant =
  | "default"
  | "success"
  | "danger"
  | "warning"
  | "glass";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  default:
    "bg-white/10 border-white/10 text-white",

  success:
    "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",

  danger:
    "bg-red-500/10 border-red-500/20 text-red-400",

  warning:
    "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",

  // 🔥 NEW: GLASS PREMIUM VARIANT (for cart / UI counters)
  glass:
    "bg-white/20 dark:bg-white/10 border-white/20 backdrop-blur-md text-white",
};

export default function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        `
        inline-flex items-center justify-center
        rounded-full border

        px-2.5 py-0.5
        text-[11px] font-semibold

        transition-all duration-200
        `,
        variants[variant],
        className
      )}
      style={{
        boxShadow: tokens.shadow.sm,
      }}
    >
      {children}
    </span>
  );
}