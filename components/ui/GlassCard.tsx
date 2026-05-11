"use client";

import { ReactNode } from "react";
import { useThemeTokens } from "@/lib/ui/useThemeTokens";

export default function GlassCard({
  children,
}: {
  children: ReactNode;
}) {
  const { c, tokens } = useThemeTokens();

  return (
    <div
      style={{
        background: c.surface,
        border: `1px solid ${c.border}`,
        borderRadius: tokens.radius.lg,
        backdropFilter: tokens.blur.glass,
        boxShadow: tokens.shadow.sm,
        padding: 18,
      }}
    >
      {children}
    </div>
  );
}