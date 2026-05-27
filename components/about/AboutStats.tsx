"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import GlassCard from "@/components/ui/GlassCard";
import { Text } from "@/components/ui/Text";

type Stats = {
  customers: number;
  products: number;
  countries: number;
};

type StatsResponse = Partial<Stats> & {
  data?: Partial<Stats>;
};

const defaultStats: Stats = {
  customers: 0,
  products: 0,
  countries: 12,
};

export default function AboutStats() {
  const { theme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        const payload: StatsResponse =
          await res.json();

        const data: Partial<Stats> =
          payload.data ?? payload;

        setStats({
          customers: Number(data?.customers ?? 0),
          products: Number(data?.products ?? 0),
          countries: Number(data?.countries ?? 12),
        });
      } catch (err) {
        console.error("Failed stats load", err);

        setStats(defaultStats);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (!mounted) return null;

  const currentTheme =
    theme === "system"
      ? systemTheme
      : theme;

  const isDark = currentTheme === "dark";

  const format = (n: number) =>
    Number(n ?? 0).toLocaleString();

  return (
    <section
      style={{
        ...styles.wrapper,

        // ✅ DARK SECTION
        background: isDark
          ? "linear-gradient(to bottom, #020617, #0f172a)"
          : "transparent",

        borderRadius: isDark ? 40 : 0,

        padding: isDark
          ? "70px 24px"
          : "0 20px",
      }}
    >
      <div style={styles.grid}>
        <StatBox
          isDark={isDark}
          loading={loading}
          value={format(stats.customers)}
          label="Happy Customers"
        />

        <StatBox
          isDark={isDark}
          loading={loading}
          value={format(stats.products)}
          label="Products"
        />

        <StatBox
          isDark={isDark}
          loading={loading}
          value={format(stats.countries)}
          label="Countries"
        />

        <StatBox
          isDark={isDark}
          loading={false}
          value="24/7"
          label="Support"
        />
      </div>
    </section>
  );
}

/* =========================
   CARD
========================= */

function StatBox({
  value,
  label,
  isDark,
  loading,
}: {
  value: string;
  label: string;
  isDark: boolean;
  loading: boolean;
}) {
  return (
    <GlassCard>
      <div
        style={{
          ...styles.card,

          background: isDark
            ? "rgba(15,23,42,0.72)"
            : "rgba(255,255,255,0.6)",

          border: isDark
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid rgba(0,0,0,0.06)",

          color: isDark ? "#fff" : "#111",

          boxShadow: isDark
            ? "0 14px 40px rgba(0,0,0,0.35)"
            : "0 8px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Text size="lg">
          {loading ? "..." : `${value}+`}
        </Text>

        <Text muted>
          {label}
        </Text>
      </div>
    </GlassCard>
  );
}

/* =========================
   STYLE BASE
========================= */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    marginTop: 80,
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",

    gap: 18,

    maxWidth: 1000,
    margin: "0 auto",
  },

  card: {
    padding: 28,

    borderRadius: 24,

    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",

    textAlign: "center",

    transition: "all 0.3s ease",
  },
};
