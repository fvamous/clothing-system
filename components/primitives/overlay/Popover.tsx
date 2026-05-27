"use client";

interface PopoverProps {
  open: boolean;
  children: React.ReactNode;
}

export default function Popover({
  open,
  children,
}: PopoverProps) {
  if (!open) return null;

  return (
    <div className="absolute z-50 mt-2 min-w-[220px] rounded-2xl border border-white/10 bg-zinc-950 p-3 shadow-2xl">
      {children}
    </div>
  );
}