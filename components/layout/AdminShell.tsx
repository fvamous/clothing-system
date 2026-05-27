"use client";

import type { ReactNode } from "react";

import NavigationRail from "./NavigationRail";

import AdminTopNav from "@/components/navigation/AdminTopNav";

export default function AdminShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-[#050507] dark:text-white">

      <div className="flex">

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <NavigationRail />
        </aside>

        {/* Content */}
        <div className="flex min-h-screen flex-1 flex-col">

          <AdminTopNav />

          <main className="flex-1 p-4 lg:p-8">
            {children}
          </main>

        </div>

      </div>

    </div>
  );
}
