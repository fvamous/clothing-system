"use client";

import Link from "next/link";
import { Home, ShoppingBag, ShoppingCart } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { tokens } from "@/lib/ui/tokens";
import { useCart } from "@/context/CartContext";

export default function MobileDock() {
  const { theme } = useTheme();
  const { cart } = useCart();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";
  const t = isDark ? tokens.colors.dark : tokens.colors.light;

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

  // 🔥 SAME LOGIC AS NAVBAR (CONSISTENT SOURCE OF TRUTH)
  const active =
    pathname === "/"
      ? "home"
      : pathname.startsWith("/catalog")
      ? "catalog"
      : pathname.startsWith("/cart")
      ? "cart"
      : pathname.startsWith("/admin")
      ? "admin"
      : "home";

  const items = [
    { id: "home", href: "/", icon: Home },
    { id: "catalog", href: "/catalog", icon: ShoppingBag },
  ];

  const handleCartClick = () => {
    window.dispatchEvent(new Event("open-cart"));
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 18,
        left: "50%",
        transform: "translateX(-50%)",

        display: "flex",
        gap: 10,
        padding: "10px 14px",

        borderRadius: 999,

        background: t.surface,
        backdropFilter: tokens.blur.glass,
        border: `1px solid ${t.border}`,
        boxShadow: tokens.shadow.md,

        zIndex: 999,
      }}
    >
      {/* ================= HOME + CATALOG ================= */}
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;

        return (
          <Link
            key={item.id}
            href={item.href}
            style={{
              width: 46,
              height: 46,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              borderRadius: 999,

              color: isActive ? t.text : t.muted,

              background: isActive
                ? isDark
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(0,0,0,0.06)"
                : "transparent",

              transition: "all 0.25s ease",
            }}
          >
            <Icon size={20} />
          </Link>
        );
      })}

      {/* ================= CART ================= */}
      <button
        onClick={handleCartClick}
        style={{
          position: "relative",
          width: 46,
          height: 46,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: 999,
          border: "none",

          background:
            active === "cart"
              ? isDark
                ? "rgba(255,255,255,0.12)"
                : "rgba(0,0,0,0.06)"
              : "transparent",

          color: active === "cart" ? t.text : t.muted,

          cursor: "pointer",
          transition: "all 0.25s ease",
        }}
      >
        <ShoppingCart size={20} />

        {/* BADGE */}
        {cartCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,

              minWidth: 16,
              height: 16,

              fontSize: 10,
              fontWeight: 700,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              borderRadius: 999,

              background: "#ef4444",
              color: "white",
            }}
          >
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
}