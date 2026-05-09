"use client";

import { useEffect, useState } from "react";

type Stats = {
  customers: number;
  products: number;
  countries: number;
};

export default function AboutStats() {
  const [stats, setStats] = useState<Stats>({
    customers: 0,
    products: 0,
    countries: 12, // fallback sementara
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();

        setStats({
          customers: data.customers,
          products: data.products,
          countries: data.countries ?? 12,
        });
      } catch (err) {
        console.error("Failed stats load", err);
      }
    }

    fetchStats();
  }, []);

  return (
    <section style={styles.wrapper}>
      <div style={styles.grid}>

        <StatCard
          value={`${stats.customers.toLocaleString()}+`}
          label="Happy Customers"
        />

        <StatCard
          value={`${stats.products}+`}
          label="Premium Products"
        />

        <StatCard
          value={`${stats.countries}+`}
          label="Countries Reached"
        />

        <StatCard value="24/7" label="Support System" />
      </div>
    </section>
  );
}

/* =========================
   CARD
========================= */

function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div style={styles.card}>
      <h3 style={styles.value}>{value}</h3>
      <p style={styles.label}>{label}</p>
    </div>
  );
}

/* =========================
   STYLE
========================= */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    marginTop: 80,
    padding: "0 20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 16,
    maxWidth: 900,
    margin: "0 auto",
  },

  card: {
    padding: 20,
    borderRadius: 18,
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(0,0,0,0.06)",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    color: "#111",
  },

  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
    letterSpacing: 0.5,
  },
};