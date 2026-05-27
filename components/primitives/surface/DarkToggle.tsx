"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function DarkToggle() {
  const {
    theme,
    resolvedTheme,
    setTheme,
  } = useTheme();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        className="
          inline-flex
          h-10
          w-[92px]
          rounded-2xl
          border
          border-slate-200
          bg-white/70
          dark:border-white/10
          dark:bg-slate-950/70
        "
      />
    );
  }

  const activeTheme =
    resolvedTheme || theme || "light";

  const isDark =
    activeTheme === "dark";

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(
          isDark
            ? "light"
            : "dark"
        )
      }
      className="
        relative
        inline-flex
        h-10
        w-[92px]
        items-center
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white/85
        p-1
        text-slate-600
        shadow-[0_10px_24px_rgba(15,23,42,0.08)]
        backdrop-blur-xl
        transition-all
        duration-300
        dark:border-white/10
        dark:bg-slate-950/80
        dark:text-slate-300
        dark:shadow-[0_10px_28px_rgba(0,0,0,0.35)]
      "
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-between
          px-3
          text-[11px]
          font-semibold
          uppercase
          tracking-normal
          text-slate-500
          dark:text-slate-300
        "
      >
        <span className="flex items-center gap-1">
          <Sun size={12} />
          <span className="sr-only">Light</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="sr-only">Dark</span>
          <Moon size={12} />
        </span>
      </div>

      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 32,
        }}
        animate={{
          x: isDark ? 44 : 0,
        }}
        className="
          relative
          z-10
          flex
          h-8
          w-10
          items-center
          justify-center
          rounded-xl
          bg-slate-950
          text-white
          shadow-[0_8px_18px_rgba(15,23,42,0.25)]
          dark:bg-white
          dark:text-slate-950
        "
      >
        <motion.span
          key={
            isDark
              ? "moon"
              : "sun"
          }
          initial={{
            opacity: 0,
            scale: 0.7,
            rotate: -90,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 0.22,
          }}
          className="leading-none"
        >
          {isDark ? (
            <Moon size={14} />
          ) : (
            <Sun size={14} />
          )}
        </motion.span>
      </motion.div>
    </button>
  );
}
