"use client";

import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutStats from "@/components/about/AboutStats";
import AboutGallery from "@/components/about/AboutGallery";

export default function AboutPage() {
  return (
    <main style={styles.wrapper}>
      <div style={styles.bgGlow} />

      <AboutHero />
      <AboutStats />
      <AboutGallery />
      <AboutStory />
    </main>
  );
}

/* =========================
   GLOBAL PAGE STYLE ONLY
========================= */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: "100vh",

    background:
      "linear-gradient(135deg, #ffffff 0%, #ffe4ec 40%, #f8f9ff 100%)",

    position: "relative",
    overflow: "hidden",

    paddingBottom: 100,
  },

  bgGlow: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",

    background:
      "radial-gradient(circle, rgba(255,154,158,0.25), transparent 70%)",

    top: "-200px",
    right: "-150px",

    filter: "blur(60px)",
    pointerEvents: "none",
  },
};