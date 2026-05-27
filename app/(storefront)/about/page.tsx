"use client";

import AboutGallery from "@/components/about/AboutGallery";
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutStory from "@/components/about/AboutStory";

import { useSafeTheme } from "@/hooks/ui/useSafeTheme";

export default function AboutPage() {
  const { isDark, mounted } =
    useSafeTheme();

  if (!mounted) return null;

  return (
    <main
      style={{
        ...styles.wrapper,

        background: isDark
          ? "linear-gradient(135deg, #020617 0%, #0f172a 40%, #111827 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #ffe4ec 40%, #f8f9ff 100%)",
      }}
    >
      <div
        style={{
          ...styles.bgGlow,

          background: isDark
            ? "radial-gradient(circle, rgba(59,130,246,0.16), transparent 70%)"
            : "radial-gradient(circle, rgba(255,154,158,0.25), transparent 70%)",
        }}
      />

      <AboutHero />
      <AboutStats />
      <AboutGallery />
      <AboutStory />
    </main>
  );
}

const styles: Record<
  string,
  React.CSSProperties
> = {
  wrapper: {
    minHeight: "100vh",

    position: "relative",

    overflow: "hidden",

    paddingBottom: 100,

    transition:
      "background 0.3s ease",
  },

  bgGlow: {
    position: "absolute",

    width: 600,
    height: 600,

    borderRadius: "50%",

    top: -200,
    right: -150,

    filter: "blur(60px)",

    pointerEvents: "none",

    transition:
      "background 0.3s ease",
  },
};