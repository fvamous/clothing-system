"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useSafeTheme } from "@/hooks/ui/useSafeTheme";

export default function AboutHero() {
  const { isDark, mounted } = useSafeTheme();

  // ✅ prevent hydration mismatch
  if (!mounted) return null;

  return (
    <section
      style={{
        ...styles.hero,
        background: isDark
          ? "linear-gradient(to bottom, #020617, #0f172a)"
          : "linear-gradient(to bottom, #fff, #fff7f7)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          ...styles.logoBox,

          background: isDark
            ? "rgba(15,23,42,0.55)"
            : "rgba(255,255,255,0.6)",

          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,154,158,0.25)",

          boxShadow: isDark
            ? "0 20px 60px rgba(0,0,0,0.45)"
            : "0 20px 60px rgba(0,0,0,0.08)",
        }}
      >
        <Image
          src="/logo.jpeg"
          alt="Brand Logo"
          width={140}
          height={140}
          style={styles.logo}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          ...styles.title,
          color: isDark ? "#fff" : "#111",
        }}
      >
        EV STORE
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          ...styles.subtitle,
          color: isDark
            ? "rgba(255,255,255,0.7)"
            : "#555",
        }}
      >
        Modern fashion for the new generation.
      </motion.p>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    textAlign: "center",

    paddingTop: 170,
    paddingBottom: 100,

    minHeight: "30vh",
  },

  logoBox: {
    width: 200,
    height: 200,

    borderRadius: "50%",
    margin: "0 auto",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
  },

  logo: {
    borderRadius: "50%",
    objectFit: "cover",
  },

  title: {
    marginTop: 28,
    fontSize: 52,
    fontWeight: 800,
    letterSpacing: 3,
  },

  subtitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: 500,
  },
};
