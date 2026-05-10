"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";

export default function CartPage() {
  const { cart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* =========================
     EMPTY STATE
  ========================= */
  if (cart.length === 0) {
    return (
      <main style={styles.page}>
        <div style={styles.emptyCard}>
          <h1 style={styles.emptyTitle}>Your Cart is Empty</h1>

          <p style={styles.emptyText}>
            Discover curated pieces and build your style
          </p>

          <Link href="/catalog" style={styles.emptyBtn}>
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      {/* CAPSULE CONTAINER */}
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>Shopping Cart</h1>
          <p style={styles.subtitle}>
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
          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>

            <div style={styles.summaryBox}>
              <div style={styles.row}>
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div style={styles.row}>
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div style={styles.divider} />

              <div style={styles.totalRow}>
                <span>Total</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <Link href="/checkout" style={styles.checkoutBtn}>
              Checkout
            </Link>

            <p style={styles.footerText}>
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

    background:
      "radial-gradient(circle at top, #ffffff 0%, #f6f7ff 45%, #fff1f5 100%)",
  },

  /* OUTER CAPSULE */
  container: {
    width: "100%",
    maxWidth: 1140,
    padding: 36,

    borderRadius: 48,

    background: "rgba(255,255,255,0.5)",
    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",

    border: "1px solid rgba(255,255,255,0.7)",

    boxShadow: "0 45px 140px rgba(0,0,0,0.08)",
  },

  header: {
    marginBottom: 30,
  },

  title: {
    fontSize: 38,
    fontWeight: 850,
    letterSpacing: -0.8,
    color: "#0f172a",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6b7280",
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

    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",

    border: "1px solid rgba(255,255,255,0.65)",

    boxShadow: "0 35px 90px rgba(0,0,0,0.08)",
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: 850,
    marginBottom: 16,
    color: "#0f172a",
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
    color: "#475569",
  },

  divider: {
    height: 1,
    background: "rgba(15,23,42,0.08)",
    margin: "12px 0",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 18,
    fontWeight: 800,
    color: "#0f172a",
  },

  checkoutBtn: {
    marginTop: 20,
    height: 50,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,

    background: "linear-gradient(135deg,#0f172a,#111827)",
    color: "#fff",

    fontWeight: 700,
    textDecoration: "none",

    boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
  },

  footerText: {
    marginTop: 14,
    fontSize: 11,
    textAlign: "center",
    color: "#94a3b8",
  },

  /* EMPTY STATE */
  emptyCard: {
    maxWidth: 460,
    padding: 44,

    borderRadius: 44,

    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",

    border: "1px solid rgba(255,255,255,0.7)",

    boxShadow: "0 45px 120px rgba(0,0,0,0.08)",

    textAlign: "center",
  },

  emptyTitle: {
    fontSize: 30,
    fontWeight: 850,
    color: "#0f172a",
  },

  emptyText: {
    marginTop: 10,
    fontSize: 14,
    color: "#64748b",
  },

  emptyBtn: {
    marginTop: 20,
    display: "inline-block",

    padding: "11px 20px",
    borderRadius: 999,

    background: "#0f172a",
    color: "#fff",

    fontWeight: 600,
    textDecoration: "none",
  },
};