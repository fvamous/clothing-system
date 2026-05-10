"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "next-themes";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <CartProvider>
          <ToastProvider>{children}</ToastProvider>
        </CartProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}