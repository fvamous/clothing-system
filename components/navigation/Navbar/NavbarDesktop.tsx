"use client";

import Link from "next/link";

export default function NavbarDesktop() {
  return (
    <header className="fixed left-0 top-0 z-50 hidden w-full border-b border-white/10 bg-black/40 backdrop-blur-xl lg:block">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-lg font-semibold"
        >
          Clothing System
        </Link>

        <nav className="flex items-center gap-6 text-sm">

          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/cart">Cart</Link>

        </nav>

      </div>

    </header>
  );
}