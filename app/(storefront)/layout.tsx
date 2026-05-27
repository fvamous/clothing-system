import type { ReactNode } from "react";

import StorefrontShell from "@/components/layout/StorefrontShell";

export default function StorefrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <StorefrontShell>
      {children}
    </StorefrontShell>
  );
}