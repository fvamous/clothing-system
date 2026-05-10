"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag, CreditCard, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const router = useRouter();

  async function handleCheckout() {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.error || "Checkout failed");
      router.push(`/success/${data.orderId}`);
    } catch {
      alert("Checkout failed");
    }
  }

  if (cart.length === 0) {
    return (
      <main style={styles.page}>
        <div style={styles.emptyCard}>
          <div style={styles.iconBox}>
            <ShoppingBag size={32} />
          </div>

          <h1 style={styles.emptyTitle}>Cart Empty</h1>
          <p style={styles.emptyText}>
            Add products before checkout
          </p>

          <button
            onClick={() => router.push("/catalog")}
            style={styles.primaryBtn}
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Checkout</h1>
            <p style={styles.subtitle}>Complete your order securely</p>
          </div>

          <button onClick={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div style={styles.grid}>
          {/* ITEMS */}
          <div style={styles.items}>
            {cart.map((item) => (
              <div key={item.id} style={styles.itemCard}>
                <Image
                  src={item.imageUrl || "/placeholder.png"}
                  alt={item.name}
                  width={90}
                  height={90}
                  style={styles.img}
                />

                <div style={styles.itemInfo}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemQty}>Qty {item.quantity}</p>
                </div>

                <div style={styles.itemPrice}>
                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <aside style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>

            <div style={styles.line}>
              <span>Items</span>
              <span>
                {cart.reduce((a, i) => a + i.quantity, 0)}
              </span>
            </div>

            <div style={styles.line}>
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div style={styles.divider} />

            <div style={styles.total}>
              <span>Total</span>
              <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>

            <button onClick={handleCheckout} style={styles.checkoutBtn}>
              <CreditCard size={16} />
              Pay Now
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "80px 24px",

    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",

    background:
      "radial-gradient(circle at top, #ffffff 0%, #f6f7ff 45%, #fff1f5 100%)",
  },

  /* =========================
     MAIN CAPSULE
  ========================= */
  container: {
    width: "100%",
    maxWidth: 1140,
    padding: 40,

    borderRadius: 56,

    background: "rgba(255,255,255,0.45)",
    backdropFilter: "blur(34px)",
    WebkitBackdropFilter: "blur(34px)",

    border: "1px solid rgba(255,255,255,0.65)",

    boxShadow: "0 60px 160px rgba(0,0,0,0.10)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 34,
  },

  title: {
    fontSize: 40,
    fontWeight: 900,
    letterSpacing: -1,
  },

  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 6,
  },

  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,

    padding: "10px 16px",
    borderRadius: 999,

    background: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.8)",

    cursor: "pointer",
    backdropFilter: "blur(16px)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: 34,
    alignItems: "start",
  },

  /* =========================
     ITEMS (GLASS CARD UPGRADE)
  ========================= */
  items: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  itemCard: {
    display: "flex",
    alignItems: "center",
    gap: 16,

    padding: 18,
    borderRadius: 32,

    background:
      "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.45))",

    backdropFilter: "blur(26px)",

    border: "1px solid rgba(255,255,255,0.7)",

    boxShadow: "0 18px 50px rgba(0,0,0,0.06)",

    transition: "all .25s ease",
  },

  img: {
    borderRadius: 20,
    objectFit: "cover",
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: -0.2,
  },

  itemQty: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },

  itemPrice: {
    fontWeight: 800,
    fontSize: 14,
  },

  /* =========================
     SUMMARY (PREMIUM PANEL)
  ========================= */
  summary: {
    position: "sticky",
    top: 32,

    padding: 30,
    borderRadius: 44,

    background:
      "linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.55))",

    backdropFilter: "blur(30px)",

    border: "1px solid rgba(255,255,255,0.75)",

    boxShadow: "0 45px 120px rgba(0,0,0,0.10)",
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: 900,
    marginBottom: 18,
  },

  line: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    color: "#475569",
  },

  divider: {
    height: 1,
    background: "rgba(15,23,42,0.08)",
    margin: "16px 0",
  },

  total: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 20,
    fontWeight: 900,
  },

  /* =========================
     CTA BUTTON (LUXURY FEEL)
  ========================= */
  checkoutBtn: {
    marginTop: 22,
    width: "100%",
    height: 52,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    borderRadius: 999,

    background:
      "linear-gradient(135deg,#0f172a,#111827,#000)",

    color: "#fff",
    fontWeight: 800,

    border: "1px solid rgba(255,255,255,0.15)",

    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",

    cursor: "pointer",
  },

  /* =========================
     EMPTY STATE (SOFT LUXURY)
  ========================= */
  emptyCard: {
    maxWidth: 460,
    padding: 48,

    borderRadius: 56,

    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(34px)",

    border: "1px solid rgba(255,255,255,0.75)",

    boxShadow: "0 60px 140px rgba(0,0,0,0.10)",

    textAlign: "center",
  },

  iconBox: {
    width: 70,
    height: 70,

    margin: "0 auto 18px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 24,

    background: "rgba(255,255,255,0.7)",
  },

  emptyTitle: {
    fontSize: 28,
    fontWeight: 900,
  },

  emptyText: {
    marginTop: 10,
    fontSize: 14,
    color: "#64748b",
  },

  primaryBtn: {
    marginTop: 20,
    padding: "12px 20px",

    borderRadius: 999,

    background: "#0f172a",
    color: "#fff",

    fontWeight: 700,
    border: "none",
    cursor: "pointer",
  },
};