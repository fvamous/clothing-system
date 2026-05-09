"use client";

import Link from "next/link";
import Image from "next/image";

import {
  useSession,
  signIn,
  signOut,
} from "next-auth/react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useCart } from "@/context/CartContext";

import CartDrawer from "@/components/cart/CartDrawer";

import DarkToggle from "@/components/layout/DarkToggle";

export default function Navbar() {
  const { data: session } =
    useSession();

  const { cart } = useCart();

  const [openCart, setOpenCart] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  // =========================
  // ADMIN CHECK
  // =========================
  const isAdmin =
    session?.user?.role === "ADMIN";

  // =========================
  // CART COUNT
  // =========================
  const cartCount = useMemo(() => {
    return cart.reduce(
      (acc, item) =>
        acc + item.quantity,
      0
    );
  }, [cart]);

  // =========================
  // SCROLL EFFECT
  // =========================
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(
            window.scrollY > 10
          );

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );
    };
  }, []);

  // =========================
  // BODY LOCK
  // =========================
  useEffect(() => {
    document.body.style.overflow =
      openCart ? "hidden" : "auto";

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [openCart]);

  return (
    <>
      <header
        style={{
          ...styles.header,

          background: scrolled
            ? "rgba(255,255,255,0.7)"
            : "rgba(255,255,255,0.85)",

          backdropFilter:
            "blur(14px)",

          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid rgba(0,0,0,0.12)",

          boxShadow: scrolled
            ? "0 4px 20px rgba(0,0,0,0.04)"
            : "none",
        }}
      >
        {/* LEFT */}
        <div style={styles.left}>
          <Link
            href="/"
            style={styles.logoWrap}
          >
            <div style={styles.logoFrame}>
              <Image
                src="/logo.jpeg"
                alt="EV Logo"
                width={32}
                height={32}
                priority
                style={styles.logoImg}
              />
            </div>

            <span style={styles.brand}>
              EV Store
            </span>
          </Link>
        </div>

        {/* CENTER */}
        <nav style={styles.nav}>
          <Link
            href="/catalog"
            style={styles.link}
          >
            Catalog
          </Link>

          <button
            onClick={() =>
              setOpenCart(true)
            }
            style={styles.cartBtn}
            aria-label="Open cart"
            type="button"
          >
            Cart

            {cartCount > 0 && (
              <span style={styles.badge}>
                {cartCount}
              </span>
            )}
          </button>

          {isAdmin && (
            <Link
              href="/admin"
              style={styles.adminLink}
            >
              Admin
            </Link>
          )}
        </nav>

        {/* RIGHT */}
        <div style={styles.right}>
          <DarkToggle />

          {!session ? (
            <button
              type="button"
              onClick={() =>
                signIn("google")
              }
              style={styles.button}
            >
              Login
            </button>
          ) : (
            <div style={styles.userBox}>
              <span style={styles.email}>
                {session.user?.email}
              </span>

              <button
                type="button"
                onClick={() =>
                  signOut()
                }
                style={styles.button}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* CART DRAWER */}
      <CartDrawer
        open={openCart}
        onClose={() =>
          setOpenCart(false)
        }
      />
    </>
  );
}

/* =========================
   STYLES
========================= */

const styles: Record<
  string,
  React.CSSProperties
> = {
  header: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    padding: "14px 24px",

    position: "sticky",

    top: 0,

    zIndex: 50,

    transition:
      "all .25s ease",
  },

  left: {
    display: "flex",

    alignItems: "center",
  },

  logoWrap: {
    display: "flex",

    alignItems: "center",

    gap: 10,

    textDecoration: "none",

    color: "#111",

    fontWeight: 700,

    padding: "6px 10px",

    borderRadius: 12,

    border:
      "1px solid rgba(0,0,0,0.08)",

    background:
      "rgba(255,255,255,0.6)",

    backdropFilter: "blur(6px)",

    boxShadow:
      "0 2px 10px rgba(0,0,0,0.04)",
  },

  logoFrame: {
    border:
      "1px solid rgba(0,0,0,0.12)",

    borderRadius: 10,

    padding: 2,

    background: "#fff",
  },

  logoImg: {
    borderRadius: 8,
  },

  brand: {
    fontSize: 16,

    letterSpacing: 0.3,

    whiteSpace: "nowrap",
  },

  nav: {
    display: "flex",

    gap: 18,

    alignItems: "center",
  },

  link: {
    textDecoration: "none",

    color: "#333",

    fontSize: 14,

    transition:
      "opacity .2s ease",
  },

  cartBtn: {
    background: "transparent",

    border: "none",

    cursor: "pointer",

    fontSize: 14,

    color: "#333",

    position: "relative",

    display: "flex",

    alignItems: "center",
  },

  adminLink: {
    color: "#d11a2a",

    textDecoration: "none",

    fontSize: 14,

    fontWeight: 600,
  },

  right: {
    display: "flex",

    alignItems: "center",

    gap: 10,
  },

  userBox: {
    display: "flex",

    alignItems: "center",

    gap: 10,
  },

  email: {
    fontSize: 13,

    maxWidth: 180,

    overflow: "hidden",

    textOverflow: "ellipsis",

    whiteSpace: "nowrap",
  },

  button: {
    padding: "6px 12px",

    border: "1px solid #070707",

    borderRadius: 6,

    background: "#ffffff50",

    cursor: "pointer",

    transition:
      "all .2s ease",

    whiteSpace: "nowrap",
  },

  badge: {
    marginLeft: 6,

    background: "#111",

    color: "white",

    fontSize: 11,

    borderRadius: 999,

    padding: "2px 6px",

    minWidth: 20,

    textAlign:
      "center" as const,
  },
};