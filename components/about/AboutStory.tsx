"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AboutStory() {
  const { theme, systemTheme } = useTheme();

  // ✅ hydration safe
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <section
      style={{
        maxWidth: 700,
        margin: "80px auto",
        textAlign: "center",

        // ✅ dark mode section background
        background: isDark
          ? "rgba(15,23,42,0.55)"
          : "transparent",

        backdropFilter: isDark ? "blur(18px)" : "none",
        WebkitBackdropFilter: isDark ? "blur(18px)" : "none",

        border: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "none",

        boxShadow: isDark
          ? "0 20px 60px rgba(0,0,0,0.35)"
          : "none",

        borderRadius: 32,

        padding: isDark ? "40px" : 0,
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: 16,
          lineHeight: 1.8,
          marginBottom: 20,

          color: isDark ? "#cbd5e1" : "#444",
        }}
      >
        Inspired by global fashion houses, EV Store focuses on clean
        aesthetics, minimal design, and premium digital shopping experience.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        viewport={{ once: true }}
        style={{
          fontSize: 16,
          lineHeight: 1.8,

          color: isDark ? "#cbd5e1" : "#444",
        }}
      >
        Built to compete with modern brands like Zara, COS, and Acne Studios,
        we bring fashion closer to digital-first generation.
      </motion.p>
    </section>
  );
}