"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "next-themes";

import CartDrawer from "@/components/cart/CartDrawer";
import { useCartDrawer } from "@/hooks/useCartDrawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { open, close } = useCartDrawer();

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange
      >
        <CartProvider>
          <ToastProvider>
            
            {children}

            {/* 🔥 GLOBAL CART DRAWER (INI PENTING) */}
            <CartDrawer open={open} onClose={close} />

          </ToastProvider>
        </CartProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}