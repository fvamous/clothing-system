"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Home, ShoppingBag, ShoppingCart } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";

import { useNavActive } from "@/hooks/useNavActive";
import { useCart } from "@/context/CartContext";
import { tokens } from "@/lib/ui/tokens";
import DarkToggle from "@/components/ui/DarkToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const active = useNavActive();
  const { cart } = useCart();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";
  const t = isDark ? tokens.colors.dark : tokens.colors.light;

  const isAdmin = session?.user?.role === "ADMIN";
  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

  const items = [
    { id: "home", href: "/", icon: Home },
    { id: "catalog", href: "/catalog", icon: ShoppingBag },
  ];

  const handleCartClick = () => {
    window.dispatchEvent(new Event("open-cart"));
  };

  const activeIndexMap = ["home", "catalog", "cart", "admin"];
  const activeIndex = activeIndexMap.indexOf(active);

  if (!mounted) {
    return (
      <div className="w-full flex justify-center mt-4">
        <div className="h-16 w-[95%] max-w-6xl rounded-full bg-black/5" />
      </div>
    );
  }

  return (
    <header className="fixed top-4 left-0 w-full z-50 flex justify-center px-4">
      {/* OUTER SHELL (FIX CENTER ISSUE) */}
      <div
        style={{
          width: "100%",
          maxWidth: 2000,
          height: 100,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          padding: "0 16px",

          borderRadius: 999,

          background: t.surface,
          backdropFilter: tokens.blur.glass,
          WebkitBackdropFilter: tokens.blur.glass,

          border: `1px solid ${t.border}`,
          boxShadow: tokens.shadow.md,
        }}
      >
        {/* ================= LOGO ================= */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
          }}
        >
          <Image
            src="/logo.jpeg"
            alt="logo"
            width={42}
            height={42}
            style={{ borderRadius: 12 }}
          />

          <span
            style={{
              fontWeight: 800,
              fontSize: 15,
              color: t.text,
            }}
          >
            EV STORE
          </span>
        </Link>

        {/* ================= CENTER NAV ================= */}
        <nav style={{ display: "flex", gap: 6, position: "relative" }}>
          {/* indicator */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            style={{
              position: "absolute",
              top: 0,
              left: activeIndex * 50,
              width: 44,
              height: 44,
              borderRadius: 999,
              background: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.06)",
            }}
          />

          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 999,
                  zIndex: 2,
                  color: isActive ? t.text : t.muted,
                }}
              >
                <Icon size={20} />
              </Link>
            );
          })}

          {/* CART */}
          <button
            onClick={handleCartClick}
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: "none",
              background:
                active === "cart"
                  ? isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)"
                  : "transparent",

              color: active === "cart" ? t.text : t.muted,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              position: "relative",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            <ShoppingCart size={20} />

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
                  color: "#fff",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* ================= RIGHT ================= */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <DarkToggle />

          {isAdmin && (
            <Link
              href="/admin"
              style={{
                padding: "8px 12px",
                borderRadius: 999,
                background: "#3b82f6",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Admin
            </Link>
          )}

          {!session ? (
            <button onClick={() => signIn("google")}>
              Login
            </button>
          ) : (
            <button onClick={() => signOut()}>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}