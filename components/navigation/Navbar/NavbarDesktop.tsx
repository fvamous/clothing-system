"use client";

import Link from "next/link";

import { LayoutDashboard, ShoppingBag } from "lucide-react";

import NavbarAction from "./NavbarAction";

import DarkToggle from "@/components/primitives/surface/DarkToggle";

export default function NavbarDesktop() {
  return (
    <header className="fixed left-0 top-0 z-50 hidden w-full border-b border-zinc-200/70 bg-white/80 text-zinc-950 shadow-sm backdrop-blur-2xl lg:block dark:border-white/10 dark:bg-black/40 dark:text-white">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-lg font-black tracking-tight"
        >
          Clothing System
        </Link>

        <nav className="flex items-center gap-2 text-sm font-medium">

          <Link className="rounded-2xl px-4 py-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white" href="/">Home</Link>
          <Link className="rounded-2xl px-4 py-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white" href="/catalog">Catalog</Link>
          <Link className="rounded-2xl px-4 py-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white" href="/about">About</Link>
          <Link className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white" href="/cart">
            <ShoppingBag className="h-4 w-4" />
            Cart
          </Link>
          <Link className="inline-flex items-center gap-2 rounded-2xl bg-zinc-950 px-4 py-2 text-white shadow-lg shadow-zinc-950/10 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200" href="/admin">
            <LayoutDashboard className="h-4 w-4" />
            Admin
          </Link>

        </nav>

        <div className="flex items-center gap-3">
          <DarkToggle />
          <NavbarAction />
        </div>

      </div>

    </header>
  );
}
