"use client";

import Link from "next/link";

const items = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/catalog",
    label: "Shop",
  },
  {
    href: "/cart",
    label: "Cart",
  },
  {
    href: "/admin",
    label: "Admin",
  },
];

export default function MobileDock() {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-3xl border border-zinc-200/70 bg-white/85 p-2 text-zinc-950 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl sm:hidden dark:border-white/10 dark:bg-black/50 dark:text-white">

      <div className="flex items-center justify-around">

        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl px-4 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {item.label}
          </Link>
        ))}

      </div>

    </div>
  );
}
