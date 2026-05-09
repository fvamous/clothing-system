"use client";

import { motion } from "framer-motion";

export default function AboutStats() {
  return (
    <section style={styles.wrapper}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={styles.grid}
      >
        <Stat number="10K+" label="Happy Customers" />
        <Stat number="50+" label="Premium Products" />
        <Stat number="12" label="Countries Reached" />
        <Stat number="24/7" label="Support System" />
      </motion.div>
    </section>
  );
}

/* =========================
   STAT ITEM
========================= */

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div style={styles.card}>
      <div style={styles.number}>{number}</div>
      <div style={styles.label}>{label}</div>
    </div>
  );
}

/* =========================
   STYLES (LUXURY SAAS FEEL)
========================= */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    marginTop: 80,
    display: "flex",
    justifyContent: "center",
    padding: "0 20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 20,
    maxWidth: 900,
    width: "100%",
  },

  card: {
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(18px)",

    border: "1px solid rgba(255,154,158,0.2)",
    borderRadius: 18,

    padding: "24px 20px",
    textAlign: "center",

    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",

    transition: "all .3s ease",
  },

  number: {
    fontSize: 28,
    fontWeight: 700,
    color: "#111",
    marginBottom: 6,
  },

  label: {
    fontSize: 13,
    color: "#666",
    letterSpacing: 0.3,
  },
};