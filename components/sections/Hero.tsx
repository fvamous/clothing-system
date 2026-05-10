"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section style={styles.wrapper}>
      {/* =========================
          ANIMATED BACKGROUND
      ========================= */}

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={styles.glowOne}
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={styles.glowTwo}
      />

      {/* GRID OVERLAY */}
      <div style={styles.grid} />

      {/* =========================
          CONTENT
      ========================= */}

      <div style={styles.container}>
        {/* BADGE */}
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          style={styles.badge}
        >
          ✨ Premium Fashion Experience
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={styles.title}
        >
          Elevate Your Style with
          <span style={styles.gradientText}>
            {" "}
            Modern Fashion
          </span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
            duration: 0.7,
          }}
          style={styles.subtitle}
        >
          Premium clothing system built
          for elegance, simplicity, and
          modern streetwear aesthetic.
          Crafted with cinematic visuals,
          smooth interactions, and modern
          commerce experience.
        </motion.p>

        {/* ACTIONS */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.6,
          }}
          style={styles.actions}
        >
          <Link
            href="/catalog"
            style={styles.primaryBtn}
          >
            Shop Collection
          </Link>

          <Link
            href="/about"
            style={styles.secondaryBtn}
          >
            Learn More
          </Link>
        </motion.div>

        {/* STATS */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.7,
          }}
          style={styles.stats}
        >
          <div style={styles.statCard}>
            <h3 style={styles.statValue}>
              6+
            </h3>

            <p style={styles.statLabel}>
              Products
            </p>
          </div>

          <div style={styles.statCard}>
            <h3 style={styles.statValue}>
              24/7
            </h3>

            <p style={styles.statLabel}>
              Support
            </p>
          </div>

          <div style={styles.statCard}>
            <h3 style={styles.statValue}>
              100%
            </h3>

            <p style={styles.statLabel}>
              Modern UI
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================
   PREMIUM HERO STYLES
========================= */

const styles: Record<
  string,
  React.CSSProperties
> = {
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

  background:
    "linear-gradient(135deg, #ffffff 0%, #fff1f5 35%, #f8faff 100%)",

  border:
    "1px solid rgba(255,255,255,0.7)",

  boxShadow:
    "0 30px 80px rgba(15,23,42,0.08)",
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

    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",

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

    background:
      "rgba(255,255,255,0.65)",

    border:
      "1px solid rgba(255,255,255,0.5)",

    backdropFilter: "blur(16px)",

    color: "#444",

    fontSize: 14,
    fontWeight: 600,

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",
  },

  title: {
    marginTop: 28,

    fontSize: "clamp(42px, 8vw, 84px)",

    lineHeight: 1,

    fontWeight: 800,

    letterSpacing: "-0.04em",

    color: "#111",
  },

  gradientText: {
    background:
      "linear-gradient(135deg, #ff7a9c 0%, #ffb199 100%)",

    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    margin: "26px auto 0",

    maxWidth: 760,

    fontSize: "clamp(16px, 2vw, 20px)",

    lineHeight: 1.8,

    color: "#555",
  },

  actions: {
    marginTop: 36,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    gap: 16,

    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "14px 24px",

    borderRadius: 999,

    background:
      "linear-gradient(135deg, #ff8da1, #ffb8a1)",

    color: "#fff",

    textDecoration: "none",

    fontWeight: 700,

    boxShadow:
      "0 14px 35px rgba(255,154,158,0.35)",

    transition: "all .25s ease",
  },

  secondaryBtn: {
    padding: "14px 24px",

    borderRadius: 999,

    background:
      "rgba(255,255,255,0.65)",

    border:
      "1px solid rgba(255,255,255,0.55)",

    backdropFilter: "blur(16px)",

    color: "#222",

    textDecoration: "none",

    fontWeight: 600,

    boxShadow:
      "0 10px 25px rgba(0,0,0,0.05)",
  },

  stats: {
    marginTop: 64,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    gap: 18,

    flexWrap: "wrap",
  },

  statCard: {
    minWidth: 150,

    padding: "22px 26px",

    borderRadius: 28,

    background:
      "rgba(255,255,255,0.60)",

    border:
      "1px solid rgba(255,255,255,0.55)",

    backdropFilter: "blur(18px)",

    boxShadow:
      "0 18px 40px rgba(0,0,0,0.05)",
  },

  statValue: {
    margin: 0,

    fontSize: 30,
    fontWeight: 800,

    color: "#111",
  },

  statLabel: {
    marginTop: 8,

    fontSize: 14,

    color: "#666",
  },
};