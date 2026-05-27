"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  Images,
  LayoutDashboard,
  Package2,
  ShoppingBag,
} from "lucide-react";

import { cn } from "@/lib/core/utils";

export const adminRailItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: Package2,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    href: "/admin/lookbook",
    label: "Lookbook",
    icon: Images,
  },
];

export default function NavigationRail() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 flex h-screen w-[280px] flex-col border-r border-zinc-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-black/30">

      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
          Control Room
        </p>

        <h1 className="mt-2 text-xl font-black tracking-tight">
          Clothing Admin
        </h1>
      </div>

      <nav className="flex flex-col gap-1.5">

        {adminRailItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950",
                "dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white",
                active &&
                  "bg-zinc-950 text-white shadow-lg shadow-zinc-950/10 hover:bg-zinc-950 hover:text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-white dark:hover:text-zinc-950"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

      </nav>

      <div className="mt-auto rounded-3xl border border-zinc-200/70 bg-zinc-50 p-4 text-sm text-zinc-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400">
        <p className="font-semibold text-zinc-950 dark:text-white">
          Single skeleton
        </p>
        <p className="mt-1 text-xs leading-relaxed">
          Storefront and admin now share one design foundation.
        </p>
      </div>

    </div>
  );
}
