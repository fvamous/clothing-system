"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section style={styles.wrapper}>
      {/* BACKGROUND LAYER */}
      <div style={styles.bgGlow} />

      {/* CONTENT */}
      <div style={styles.container}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={styles.title}
        >
          Elevate Your Style with
          <span style={styles.gradientText}> Modern Fashion</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={styles.subtitle}
        >
          Premium clothing system built for elegance, simplicity, and modern streetwear aesthetic.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={styles.actions}
        >
          <Link href="/catalog" style={styles.primaryBtn}>
            Shop Collection
          </Link>

          <Link href="/about" style={styles.secondaryBtn}>
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================
   STYLES (MATCH NAVBAR SYSTEM)
========================= */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: "relative",
    minHeight: "85vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",

    background:
      "linear-gradient(135deg, #ffffff 0%, #ffe4ec 40%, #f8f9ff 100%)",
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
  },

  container: {
    position: "relative",
    maxWidth: "900px",
    textAlign: "center",
    padding: "0 24px",
  },

  title: {
    fontSize: "52px",
    fontWeight: 700,
    lineHeight: 1.1,
    color: "#111",
  },

  gradientText: {
    background:
      "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    marginTop: 16,
    fontSize: "16px",
    color: "#555",
    lineHeight: 1.6,
  },

  actions: {
    marginTop: 28,
    display: "flex",
    justifyContent: "center",
    gap: 14,
  },

  primaryBtn: {
    padding: "10px 18px",
    borderRadius: 999,

    background:
      "linear-gradient(135deg, #ff9a9e, #fad0c4)",

    color: "#fff",
    textDecoration: "none",
    fontWeight: 600,

    boxShadow: "0 10px 25px rgba(255,154,158,0.25)",
  },

  secondaryBtn: {
    padding: "10px 18px",
    borderRadius: 999,

    background: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(255,154,158,0.3)",

    color: "#333",
    textDecoration: "none",
    fontWeight: 500,

    backdropFilter: "blur(14px)",
  },
};