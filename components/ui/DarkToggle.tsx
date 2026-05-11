"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DarkToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        relative w-[62px] h-[34px]
        rounded-full
        flex items-center
        p-[3px]
        backdrop-blur-md
        transition-all duration-300
      "
      style={{
        background: isDark
          ? "rgba(2, 6, 23, 0.70)"
          : "rgba(255, 255, 255, 0.60)",

        border: isDark
          ? "1px solid rgba(255,255,255,0.10)"
          : "1px solid rgba(0,0,0,0.10)",

        boxShadow: isDark
          ? "0 10px 30px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 10px 30px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
      }}
    >
      {/* TRACK ICONS */}
      <div className="absolute left-2 text-[10px] opacity-50">
        ☀️
      </div>
      <div className="absolute right-2 text-[10px] opacity-50">
        🌙
      </div>

      {/* KNOB */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="
          relative z-10
          h-[28px] w-[28px]
          rounded-full
          flex items-center justify-center
        "
        animate={{
          x: isDark ? 28 : 0,
          boxShadow: isDark
            ? "0 0 18px rgba(56,189,248,0.35), 0 6px 14px rgba(0,0,0,0.6)"
            : "0 6px 14px rgba(0,0,0,0.12)",
        }}
        style={{
          background: isDark
            ? "linear-gradient(145deg, #0f172a, #111827)"
            : "linear-gradient(145deg, #ffffff, #e5e7eb)",
        }}
      >
        {/* ICON */}
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-[12px]"
        >
          {isDark ? "🌙" : "☀️"}
        </motion.span>
      </motion.div>
    </button>
  );
}