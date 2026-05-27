"use client";

import { cn } from "@/lib/core/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
}

export default function Drawer({
  open,
  onClose,
  children,
  side = "right",
}: DrawerProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[998] bg-black/60 transition-opacity",
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />

      <div
        className={cn(
          "fixed top-0 z-[999] h-full w-full max-w-md",
          "border-white/10 bg-zinc-950",
          "transition-transform duration-300",
          side === "right"
            ? "right-0 border-l"
            : "left-0 border-r",
          open
            ? "translate-x-0"
            : side === "right"
            ? "translate-x-full"
            : "-translate-x-full"
        )}
      >
        {children}
      </div>
    </>
  );
}