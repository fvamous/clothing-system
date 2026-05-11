"use client";

import { useTheme } from "next-themes";
import { tokens } from "./tokens";

export function useThemeTokens() {
  const { theme, systemTheme } = useTheme();

  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  return {
    mode: isDark ? "dark" : "light",
    c: isDark ? tokens.colors.dark : tokens.colors.light,
    tokens,
  };
}