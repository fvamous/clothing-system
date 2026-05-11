"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag, CreditCard, ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";

import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const router = useRouter();

  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

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
              : "1px solid rgba(255,255,255,0.75)",

            boxShadow: isDark
              ? "0 60px 140px rgba(0,0,0,0.45)"
              : "0 60px 140px rgba(0,0,0,0.10)",
          }}
        >
          <div
            style={{
              ...styles.iconBox,
              background: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(255,255,255,0.7)",

              color: isDark ? "#fff" : "#111",
            }}
          >
            <ShoppingBag size={32} />
          </div>

          <h1
            style={{
              ...styles.emptyTitle,
              color: isDark ? "#fff" : "#111",
            }}
          >
            Cart Empty
          </h1>

          <p
            style={{
              ...styles.emptyText,
              color: isDark ? "#94a3b8" : "#64748b",
            }}
          >
            Add products before checkout
          </p>

          <button
            onClick={() => router.push("/catalog")}
            style={{
              ...styles.primaryBtn,
              background: isDark ? "#fff" : "#0f172a",
              color: isDark ? "#111" : "#fff",
            }}
          >
            Continue Shopping
          </button>
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
      <div
        style={{
          ...styles.container,
          background: isDark
            ? "rgba(15,23,42,0.58)"
            : "rgba(255,255,255,0.45)",

          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.65)",

          boxShadow: isDark
            ? "0 60px 160px rgba(0,0,0,0.45)"
            : "0 60px 160px rgba(0,0,0,0.10)",
        }}
      >
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h1
              style={{
                ...styles.title,
                color: isDark ? "#fff" : "#111",
              }}
            >
              Checkout
            </h1>

            <p
              style={{
                ...styles.subtitle,
                color: isDark ? "#94a3b8" : "#64748b",
              }}
            >
              Complete your order securely
            </p>
          </div>

          <button
            onClick={() => router.back()}
            style={{
              ...styles.backBtn,
              background: isDark
                ? "rgba(255,255,255,0.05)"
                : "rgba(255,255,255,0.7)",

              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(255,255,255,0.8)",

              color: isDark ? "#fff" : "#111",
            }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div style={styles.grid}>
          {/* ITEMS */}
          <div style={styles.items}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  ...styles.itemCard,
                  background: isDark
                    ? "linear-gradient(135deg, rgba(15,23,42,0.82), rgba(15,23,42,0.58))"
                    : "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.45))",

                  border: isDark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(255,255,255,0.7)",

                  boxShadow: isDark
                    ? "0 18px 50px rgba(0,0,0,0.35)"
                    : "0 18px 50px rgba(0,0,0,0.06)",
                }}
              >
                <Image
                  src={item.imageUrl || "/placeholder.png"}
                  alt={item.name}
                  width={90}
                  height={90}
                  style={styles.img}
                />

                <div style={styles.itemInfo}>
                  <h3
                    style={{
                      ...styles.itemName,
                      color: isDark ? "#fff" : "#111",
                    }}
                  >
                    {item.name}
                  </h3>

                  <p
                    style={{
                      ...styles.itemQty,
                      color: isDark ? "#94a3b8" : "#64748b",
                    }}
                  >
                    Qty {item.quantity}
                  </p>
                </div>

                <div
                  style={{
                    ...styles.itemPrice,
                    color: isDark ? "#fff" : "#111",
                  }}
                >
                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <aside
            style={{
              ...styles.summary,
              background: isDark
                ? "linear-gradient(135deg, rgba(15,23,42,0.85), rgba(15,23,42,0.65))"
                : "linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.55))",

              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(255,255,255,0.75)",

              boxShadow: isDark
                ? "0 45px 120px rgba(0,0,0,0.45)"
                : "0 45px 120px rgba(0,0,0,0.10)",
            }}
          >
            <h2
              style={{
                ...styles.summaryTitle,
                color: isDark ? "#fff" : "#111",
              }}
            >
              Order Summary
            </h2>

            <div
              style={{
                ...styles.line,
                color: isDark ? "#cbd5e1" : "#475569",
              }}
            >
              <span>Items</span>

              <span>
                {cart.reduce((a, i) => a + i.quantity, 0)}
              </span>
            </div>

            <div
              style={{
                ...styles.line,
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
                ...styles.total,
                color: isDark ? "#fff" : "#111",
              }}
            >
              <span>Total</span>
              <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>

            <button
              onClick={handleCheckout}
              style={{
                ...styles.checkoutBtn,
                background: isDark
                  ? "linear-gradient(135deg,#ffffff,#e2e8f0)"
                  : "linear-gradient(135deg,#0f172a,#111827,#000)",

                color: isDark ? "#111" : "#fff",
              }}
            >
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
    padding: "180px 24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    transition: "all .3s ease",
  },

  container: {
    width: "100%",
    maxWidth: 1140,
    padding: 40,
    borderRadius: 56,
    backdropFilter: "blur(34px)",
    WebkitBackdropFilter: "blur(34px)",
    transition: "all .3s ease",
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
    marginTop: 6,
  },

  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 16px",
    borderRadius: 999,
    cursor: "pointer",
    backdropFilter: "blur(16px)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: 34,
    alignItems: "start",
  },

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
    backdropFilter: "blur(26px)",
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
    marginTop: 2,
  },

  itemPrice: {
    fontWeight: 800,
    fontSize: 14,
  },

  summary: {
    position: "sticky",
    top: 32,
    padding: 30,
    borderRadius: 44,
    backdropFilter: "blur(30px)",
    transition: "all .3s ease",
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
  },

  divider: {
    height: 1,
    margin: "16px 0",
  },

  total: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 20,
    fontWeight: 900,
  },

  checkoutBtn: {
    marginTop: 22,
    width: "100%",
    height: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 999,
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
  },

  emptyCard: {
    maxWidth: 460,
    padding: 48,
    borderRadius: 56,
    backdropFilter: "blur(34px)",
    textAlign: "center",
    transition: "all .3s ease",
  },

  iconBox: {
    width: 70,
    height: 70,
    margin: "0 auto 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },

  emptyTitle: {
    fontSize: 28,
    fontWeight: 900,
  },

  emptyText: {
    marginTop: 10,
    fontSize: 14,
  },

  primaryBtn: {
    marginTop: 20,
    padding: "12px 20px",
    borderRadius: 999,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
  },
};