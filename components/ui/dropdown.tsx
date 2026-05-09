// components/ui/dropdown.tsx

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type DropdownProps = {
  label: string;
  items: {
    label: string;
    onClick: () => void;
  }[];
};

export default function Dropdown({
  label,
  items,
}: DropdownProps) {
  const [open, setOpen] =
    useState(false);

  return (
    <div className="relative">
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          flex items-center gap-2
          rounded-xl
          border border-white/10
          bg-white/5
          px-4 py-2
          transition-all
          hover:bg-white/10
        "
      >
        {label}

        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="
            absolute right-0 top-12 z-50
            min-w-[180px]
            rounded-2xl
            border border-white/10
            bg-zinc-900/95
            p-2
            backdrop-blur-xl
          "
        >
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className="
                w-full rounded-xl
                px-4 py-2 text-left
                transition-all
                hover:bg-white/10
              "
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}