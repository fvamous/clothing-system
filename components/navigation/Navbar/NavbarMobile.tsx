"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Heart,
  LayoutDashboard,
  Menu,
  ShoppingBag,
  Sparkles,
  User2,
  X,
} from "lucide-react";

import DarkToggle from "@/components/primitives/surface/DarkToggle";

const navItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/catalog",
    label: "Catalog",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/cart",
    label: "Cart",
    icon: ShoppingBag,
  },
  {
    href: "/ai",
    label: "AI Style",
    icon: Sparkles,
  },
  {
    href: "/wishlist",
    label: "Wishlist",
    icon: Heart,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User2,
  },
  {
    href: "/admin",
    label: "Admin",
    icon: LayoutDashboard,
  },
];

export default function NavbarMobile() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-zinc-200/70 bg-white/85 px-4 text-zinc-950 shadow-sm backdrop-blur-2xl lg:hidden dark:border-white/10 dark:bg-black/40 dark:text-white">

        <Link href="/" className="text-sm font-black tracking-tight">
          Clothing System
        </Link>

        <div className="flex items-center gap-2">
          <DarkToggle />

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-950/10 dark:bg-white dark:text-zinc-950"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

      </header>

      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-3 top-3 flex max-h-[calc(100vh-24px)] w-[min(360px,calc(100vw-24px))] flex-col overflow-hidden rounded-[32px] border border-zinc-200/70 bg-white/95 p-4 text-zinc-950 shadow-[0_30px_100px_rgba(15,23,42,0.28)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#09090b]/95 dark:text-white">
            <div className="flex items-center justify-between border-b border-zinc-200/70 pb-4 dark:border-white/10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  Menu
                </p>
                <h2 className="mt-1 text-lg font-black tracking-tight">
                  Clothing System
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700 dark:bg-white/10 dark:text-zinc-200"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-4 grid gap-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    {Icon ? (
                      <Icon className="h-4 w-4" />
                    ) : (
                      <span className="h-4 w-4 rounded-full bg-zinc-300 dark:bg-white/20" />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
