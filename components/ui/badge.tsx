// components/ui/badge.tsx

import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;

  className?: string;

  variant?:
    | "default"
    | "success"
    | "danger"
    | "warning";
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
        inline-flex
        items-center
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-medium
      `,

        variant ===
          "default" &&
          "bg-white/10 border-white/10",

        variant ===
          "success" &&
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

        variant ===
          "danger" &&
          "border-red-500/20 bg-red-500/10 text-red-400",

        variant ===
          "warning" &&
          "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",

        className
      )}
    >
      {children}
    </span>
  );
}