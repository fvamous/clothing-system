"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Hero() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <section
      style={{
        ...styles.wrapper,
        background: isDark
          ? "linear-gradient(135deg, #0b0f19 0%, #0f172a 50%, #020617 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #fff1f5 35%, #f8faff 100%)",
      }}
    >
      {/* =========================
          TOP OVERLAY FIX (IMPORTANT)
          FIX: white background bleeding into navbar
      ========================= */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 160,
          zIndex: 1,
          pointerEvents: "none",

          background: isDark
            ? "linear-gradient(to bottom, rgba(2,6,23,0.75), transparent)"
            : "linear-gradient(to bottom, rgba(255,255,255,0.85), transparent)",
        }}
      />

      {/* GLOW EFFECTS */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          ...styles.glowOne,
          opacity: isDark ? 0.25 : 1,
        }}
      />

      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        style={{
          ...styles.glowTwo,
          opacity: isDark ? 0.2 : 1,
        }}
      />

      {/* GRID */}
      <div
        style={{
          ...styles.grid,
          backgroundImage: isDark
            ? "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
            : "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
        }}
      />

      {/* CONTENT */}
      <div style={styles.container}>
        {/* BADGE */}
        <motion.div
          style={{
            ...styles.badge,
            background: isDark
              ? "rgba(15,23,42,0.6)"
              : "rgba(255,255,255,0.65)",
            color: isDark ? "#e5e7eb" : "#444",
            border: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(255,255,255,0.5)",
          }}
        >
          ✨ Premium Fashion Experience
        </motion.div>

        {/* TITLE */}
        <motion.h1
          style={{
            ...styles.title,
            color: isDark ? "#f8fafc" : "#111",
          }}
        >
          Elevate Your Style with{" "}
          <span style={styles.gradientText}>Modern Fashion</span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          style={{
            ...styles.subtitle,
            color: isDark ? "#94a3b8" : "#555",
          }}
        >
          Premium clothing system built for elegance, simplicity, and modern
          streetwear aesthetic.
        </motion.p>

        {/* ACTIONS */}
        <motion.div style={styles.actions}>
          <Link href="/catalog" style={styles.primaryBtn}>
            Shop Collection
          </Link>

          <Link
            href="/about"
            style={{
              ...styles.secondaryBtn,
              background: isDark
                ? "rgba(15,23,42,0.6)"
                : "rgba(255,255,255,0.65)",
              color: isDark ? "#e5e7eb" : "#222",
              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(255,255,255,0.55)",
            }}
          >
            Learn More
          </Link>
        </motion.div>

        {/* STATS */}
        <div style={styles.stats}>
          {["6+", "24/7", "100%"].map((v, i) => (
            <div
              key={i}
              style={{
                ...styles.statCard,
                background: isDark
                  ? "rgba(15,23,42,0.5)"
                  : "rgba(255,255,255,0.6)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(255,255,255,0.55)",
              }}
            >
              <h3
                style={{
                  ...styles.statValue,
                  color: isDark ? "#fff" : "#111",
                }}
              >
                {v}
              </h3>
              <p
                style={{
                  ...styles.statLabel,
                  color: isDark ? "#94a3b8" : "#666",
                }}
              >
                {i === 0 ? "Products" : i === 1 ? "Support" : "Modern UI"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   STYLES (UNCHANGED)
========================= */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: "relative",
    isolation: "isolate",
    minHeight: "92vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: "120px 24px 80px",
    margin: "16px",
    borderRadius: 40,
    border: "1px solid rgba(255,255,255,0.7)",
    boxShadow: "0 30px 80px rgba(15,23,42,0.08)",
  },

  glowOne: {
    position: "absolute",
    top: "-180px",
    right: "-120px",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,154,158,0.30), transparent 70%)",
    filter: "blur(70px)",
  },

  glowTwo: {
    position: "absolute",
    bottom: "-180px",
    left: "-100px",
    width: 450,
    height: 450,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(173,216,255,0.25), transparent 70%)",
    filter: "blur(80px)",
  },

  grid: {
    position: "absolute",
    inset: 0,
    backgroundSize: "40px 40px",
    maskImage:
      "radial-gradient(circle at center, black 30%, transparent 90%)",
  },

  container: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: 980,
    textAlign: "center",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 18px",
    borderRadius: 999,
    backdropFilter: "blur(16px)",
    fontSize: 14,
    fontWeight: 600,
  },

  title: {
    marginTop: 28,
    fontSize: "clamp(42px, 8vw, 84px)",
    lineHeight: 1,
    fontWeight: 800,
    letterSpacing: "-0.04em",
  },

  gradientText: {
    background: "linear-gradient(135deg, #ff7a9c 0%, #ffb199 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    margin: "26px auto 0",
    maxWidth: 760,
    fontSize: "clamp(16px, 2vw, 20px)",
    lineHeight: 1.8,
  },

  actions: {
    marginTop: 36,
    display: "flex",
    justifyContent: "center",
    gap: 16,
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "14px 24px",
    borderRadius: 999,
    background: "linear-gradient(135deg, #ff8da1, #ffb8a1)",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
  },

  secondaryBtn: {
    padding: "14px 24px",
    borderRadius: 999,
    backdropFilter: "blur(16px)",
    textDecoration: "none",
    fontWeight: 600,
  },

  stats: {
    marginTop: 64,
    display: "flex",
    justifyContent: "center",
    gap: 18,
    flexWrap: "wrap",
  },

  statCard: {
    minWidth: 150,
    padding: "22px 26px",
    borderRadius: 28,
    backdropFilter: "blur(18px)",
  },

  statValue: {
    fontSize: 30,
    fontWeight: 800,
  },

  statLabel: {
    marginTop: 8,
    fontSize: 14,
  },
};