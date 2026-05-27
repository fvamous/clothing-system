"use client";

import { useState } from "react";

import Link from "next/link";

import {
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

import { usePathname } from "next/navigation";

import TopNavSearch from "./TopNavSearch";

import DarkToggle from "@/components/primitives/surface/DarkToggle";

import { adminRailItems } from "@/components/layout/NavigationRail";

import { cn } from "@/lib/core/utils";

export default function AdminTopNav() {
  const [open, setOpen] =
    useState(false);

  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/80 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-black/30">

        <div className="flex min-h-16 flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-8">

          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                Admin Panel
              </p>
              <h2 className="text-lg font-black tracking-tight text-zinc-950 dark:text-white">
                Manage Clothing System
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-950/10 lg:hidden dark:bg-white dark:text-zinc-950"
              aria-label="Open admin menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <TopNavSearch />

            <DarkToggle />

            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-zinc-200/70 bg-white px-4 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:bg-white/10"
            >
              <ExternalLink className="h-4 w-4" />
              Storefront
            </Link>
          </div>

        </div>

      </header>

      {open && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            aria-label="Close admin menu"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-3 top-3 flex max-h-[calc(100vh-24px)] w-[min(360px,calc(100vw-24px))] flex-col overflow-hidden rounded-[32px] border border-zinc-200/70 bg-white/95 p-4 text-zinc-950 shadow-[0_30px_100px_rgba(15,23,42,0.28)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#09090b]/95 dark:text-white">
            <div className="flex items-center justify-between border-b border-zinc-200/70 pb-4 dark:border-white/10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  Control Room
                </p>
                <h2 className="mt-1 text-lg font-black tracking-tight">
                  Clothing Admin
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700 dark:bg-white/10 dark:text-zinc-200"
                aria-label="Close admin menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-4 grid gap-2 overflow-y-auto">
              {adminRailItems.map((item) => {
                const Icon = item.icon;
                const active =
                  item.href === "/admin"
                    ? pathname === item.href
                    : pathname.startsWith(
                        item.href
                      );

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
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
          </div>
        </div>
      )}
    </>
  );
}
