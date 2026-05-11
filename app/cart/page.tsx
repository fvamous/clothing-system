"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";

export default function CartPage() {
  const { cart } = useCart();
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* =========================
     EMPTY STATE
  ========================= */
  if (cart.length === 0) {
    return (
      <main
        style={{
          ...styles.page,
          background: isDark
            ? "radial-gradient(circle at top, #020617 0%, #0f172a 45%, #111827 100%)"
            : "radial-gradient(circle at top, #ffffff 0%, #f6f7ff 45%, #fff1f5 100%)",
        }}
      >
        <div
          style={{
            ...styles.emptyCard,
            background: isDark
              ? "rgba(15,23,42,0.72)"
              : "rgba(255,255,255,0.55)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(255,255,255,0.7)",
            boxShadow: isDark
              ? "0 45px 120px rgba(0,0,0,0.45)"
              : "0 45px 120px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              ...styles.emptyTitle,
              color: isDark ? "#f8fafc" : "#0f172a",
            }}
          >
            Your Cart is Empty
          </h1>

          <p
            style={{
              ...styles.emptyText,
              color: isDark ? "#94a3b8" : "#64748b",
            }}
          >
            Discover curated pieces and build your style
          </p>

          <Link
            href="/catalog"
            style={{
              ...styles.emptyBtn,
              background: isDark ? "#f8fafc" : "#0f172a",
              color: isDark ? "#0f172a" : "#fff",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        ...styles.page,
        background: isDark
          ? "radial-gradient(circle at top, #020617 0%, #0f172a 45%, #111827 100%)"
          : "radial-gradient(circle at top, #ffffff 0%, #f6f7ff 45%, #fff1f5 100%)",
      }}
    >
      {/* CAPSULE CONTAINER */}
      <div
        style={{
          ...styles.container,
          background: isDark
            ? "rgba(15,23,42,0.65)"
            : "rgba(255,255,255,0.5)",
          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.7)",
          boxShadow: isDark
            ? "0 45px 140px rgba(0,0,0,0.45)"
            : "0 45px 140px rgba(0,0,0,0.08)",
        }}
      >
        {/* HEADER */}
        <div style={styles.header}>
          <h1
            style={{
              ...styles.title,
              color: isDark ? "#f8fafc" : "#0f172a",
            }}
          >
            Shopping Cart
          </h1>

          <p
            style={{
              ...styles.subtitle,
              color: isDark ? "#94a3b8" : "#6b7280",
            }}
          >
            Review your items before checkout
          </p>
        </div>

        {/* GRID */}
        <div style={styles.grid}>
          {/* ITEMS */}
          <div style={styles.items}>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* SUMMARY CAPSULE */}
          <div
            style={{
              ...styles.summary,
              background: isDark
                ? "rgba(15,23,42,0.78)"
                : "rgba(255,255,255,0.6)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(255,255,255,0.65)",
              boxShadow: isDark
                ? "0 35px 90px rgba(0,0,0,0.45)"
                : "0 35px 90px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                ...styles.summaryTitle,
                color: isDark ? "#f8fafc" : "#0f172a",
              }}
            >
              Order Summary
            </h2>

            <div style={styles.summaryBox}>
              <div
                style={{
                  ...styles.row,
                  color: isDark ? "#cbd5e1" : "#475569",
                }}
              >
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div
                style={{
                  ...styles.row,
                  color: isDark ? "#cbd5e1" : "#475569",
                }}
              >
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div
                style={{
                  ...styles.divider,
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(15,23,42,0.08)",
                }}
              />

              <div
                style={{
                  ...styles.totalRow,
                  color: isDark ? "#f8fafc" : "#0f172a",
                }}
              >
                <span>Total</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              style={{
                ...styles.checkoutBtn,
                background: isDark
                  ? "linear-gradient(135deg,#f8fafc,#cbd5e1)"
                  : "linear-gradient(135deg,#0f172a,#111827)",
                color: isDark ? "#0f172a" : "#fff",
                boxShadow: isDark
                  ? "0 16px 40px rgba(255,255,255,0.08)"
                  : "0 16px 40px rgba(0,0,0,0.12)",
              }}
            >
              Checkout
            </Link>

            <p
              style={{
                ...styles.footerText,
                color: isDark ? "#64748b" : "#94a3b8",
              }}
            >
              Secure checkout • encrypted payment
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================
   CAPSULE DESIGN SYSTEM
========================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "64px 24px",

    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  /* OUTER CAPSULE */
  container: {
    width: "100%",
    maxWidth: 1140,
    padding: 36,

    borderRadius: 48,

    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",
  },

  header: {
    marginBottom: 30,
  },

  title: {
    fontSize: 38,
    fontWeight: 850,
    letterSpacing: -0.8,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: 32,
    alignItems: "start",
  },

  items: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  /* SUMMARY CAPSULE */
  summary: {
    position: "sticky",
    top: 32,

    padding: 28,
    borderRadius: 36,

    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: 850,
    marginBottom: 16,
  },

  summaryBox: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
  },

  divider: {
    height: 1,
    margin: "12px 0",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 18,
    fontWeight: 800,
  },

  checkoutBtn: {
    marginTop: 20,
    height: 50,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,

    fontWeight: 700,
    textDecoration: "none",
  },

  footerText: {
    marginTop: 14,
    fontSize: 11,
    textAlign: "center",
  },

  /* EMPTY STATE */
  emptyCard: {
    maxWidth: 460,
    padding: 44,

    borderRadius: 44,

    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",

    textAlign: "center",
  },

  emptyTitle: {
    fontSize: 30,
    fontWeight: 850,
  },

  emptyText: {
    marginTop: 10,
    fontSize: 14,
  },

  emptyBtn: {
    marginTop: 20,
    display: "inline-block",

    padding: "11px 20px",
    borderRadius: 999,

    fontWeight: 600,
    textDecoration: "none",
  },
};