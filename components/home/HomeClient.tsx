"use client";

import Hero from "@/components/sections/Hero";
import StatsServer from "@/components/admin/modules/dashboard/StatsServer";
import FeaturedSection from "@/components/home/FeaturedSection";
import { useSafeTheme } from "@/hooks/useSafeTheme";

export default function HomeClient() {
  const { isDark, mounted } = useSafeTheme();

  if (!mounted) return null;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        transition: "background .4s ease, color .3s ease",
        background: isDark
          ? "radial-gradient(circle at top, #0b1220 0%, #020617 50%, #000)"
          : "#fff",
        color: isDark ? "#e5e7eb" : "#111",
      }}
    >
      <Hero />
      <StatsServer />
      <FeaturedSection isDark={isDark} />
    </main>
  );
}