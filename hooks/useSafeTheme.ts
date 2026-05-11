"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useSafeTheme() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme =
    theme === "system" ? systemTheme : theme;

  return {
    theme: currentTheme,
    isDark: mounted && currentTheme === "dark",
    mounted,
  };
}