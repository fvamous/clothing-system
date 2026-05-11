"use client";

import { ReactNode } from "react";
import { useThemeTokens } from "@/lib/ui/useThemeTokens";

export function Text({
  children,
  muted,
  size = "md",
}: {
  children: ReactNode;
  muted?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const { c } = useThemeTokens();

  const sizes = {
    sm: 12,
    md: 14,
    lg: 18,
  };

  return (
    <p
      style={{
        fontSize: sizes[size],
        color: muted ? c.muted : c.text,
        lineHeight: 1.6,
      }}
    >
      {children}
    </p>
  );
}