"use client";

import { useTheme } from "next-themes";

export default function DarkToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      style={{
        padding: "6px 10px",
        borderRadius: 10,
        border: "1px solid rgba(0,0,0,0.15)",
        background: "rgba(255,255,255,0.6)",
        cursor: "pointer",
      }}
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}