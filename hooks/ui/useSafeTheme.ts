"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useSafeTheme() {
  const { resolvedTheme, setTheme, theme } =
    useTheme();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark =
    resolvedTheme === "dark";

  return {
    mounted,
    isDark,
    resolvedTheme,
    setTheme,
    theme,
  };
}