"use client";

import type { ReactNode } from "react";

import Navbar from "@/components/navigation/Navbar";

import BackgroundLayers from "./BackgroundLayers";
import MobileDock from "./MobileDock";

export default function StorefrontShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">

      <BackgroundLayers />

      <Navbar />

      <main className="relative z-10 pb-24 pt-24">
        {children}
      </main>

      <MobileDock />

    </div>
  );
}