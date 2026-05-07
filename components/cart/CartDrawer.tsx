"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();
  const router = useRouter();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // =========================
  // RESTORE LOCK
  // =========================
  useEffect(() => {
    const raw = sessionStorage.getItem("checkout-lock");

    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);

      const expired = Date.now() - parsed.time > 1000 * 60 * 5;

      if (!expired) {
        setIsCheckingOut(true);
      } else {
        sessionStorage.removeItem("checkout-lock");
      }
    } catch {
      sessionStorage.removeItem("checkout-lock");
    }
  }, []);

  // =========================
  // BODY LOCK
  // =========================
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // =========================
  // TOTAL
  // =========================
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  // =========================
  // CHECKOUT
  // =========================
  async function checkout() {
    if (isCheckingOut) return;

    if (cart.length === 0) {
      alert("Cart kosong");
      return;
    }

    setIsCheckingOut(true);

    sessionStorage.setItem(
      "checkout-lock",
      JSON.stringify({ time: Date.now() })
    );

    try {
      const safeItems = cart.map((i) => ({
        productId: String(i.id),
        quantity: Number(i.qty) || 0,
      }));

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: safeItems }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || "Checkout failed");
        sessionStorage.removeItem("checkout-lock");
        return;
      }

      clearCart();
      sessionStorage.removeItem("checkout-lock");
      onClose();

      router.replace(`/success/${data.orderId}`);
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
      sessionStorage.removeItem("checkout-lock");
    } finally {
      setIsCheckingOut(false);
    }
  }

  // =========================
  // RENDER
  // =========================
  if (!open) return null;

  return (
    <>
      {/* BACKDROP */}
      <div onClick={onClose} style={styles.backdrop} />

      {/* CENTER MODAL */}
      <div style={styles.wrapper}>
        <div style={styles.modal}>
          {/* HEADER */}
          <div style={styles.header}>
            <h3 style={{ margin: 0 }}>Your Cart</h3>
            <button onClick={onClose} style={styles.closeBtn}>
              ✕
            </button>
          </div>

          {/* EMPTY */}
          {cart.length === 0 ? (
            <div style={styles.empty}>
              <div style={{ fontSize: 40 }}>🛒</div>
              <p>Cart kosong</p>
            </div>
          ) : (
            <>
              {/* ITEMS */}
              <div style={styles.items}>
                {cart.map((item) => (
                  <div key={item.id} style={styles.item}>
                    <div style={styles.thumb}>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} style={styles.img} />
                      ) : (
                        "👕"
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <p style={styles.name}>{item.name}</p>
                      <p style={styles.price}>
                        Rp {formatPrice(item.price)}
                      </p>

                      <div style={styles.qtyBox}>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={styles.qtyBtn}
                        >
                          -
                        </button>

                        <span>{item.qty}</span>

                        <button
                          onClick={() =>
                            addToCart({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              imageUrl: item.imageUrl,
                            })
                          }
                          style={styles.qtyBtn}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div style={styles.footer}>
                <div style={styles.total}>
                  Total: <b>Rp {formatPrice(total)}</b>
                </div>

                <button
                  onClick={checkout}
                  disabled={isCheckingOut}
                  style={{
                    ...styles.checkout,
                    opacity: isCheckingOut ? 0.7 : 1,
                    cursor: isCheckingOut ? "not-allowed" : "pointer",
                  }}
                >
                  {isCheckingOut ? "Processing..." : "Checkout"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(6px)",
    zIndex: 999,
  },

  wrapper: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },

  modal: {
    width: "100%",
    maxWidth: 420,
    background: "#fff",
    borderRadius: 18,
    boxShadow: "0 25px 80px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    maxHeight: "80vh",
    overflow: "hidden",
    transform: "scale(1)",
    animation: "pop 0.18s ease-out",
  },

  header: {
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #eee",
  },

  closeBtn: {
    border: "none",
    background: "none",
    fontSize: 18,
    cursor: "pointer",
  },

  items: {
    flex: 1,
    overflowY: "auto",
    padding: 16,
  },

  item: {
    display: "flex",
    gap: 12,
    padding: "10px 0",
    borderBottom: "1px solid #f1f1f1",
  },

  thumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
    background: "#f3f3f3",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  name: {
    margin: 0,
    fontWeight: 600,
  },

  price: {
    fontSize: 12,
    color: "#666",
    margin: 0,
  },

  qtyBox: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    marginTop: 6,
  },

  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },

  footer: {
    padding: 16,
    borderTop: "1px solid #eee",
  },

  total: {
    marginBottom: 10,
  },

  checkout: {
    width: "100%",
    padding: 12,
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 10,
  },

  empty: {
    padding: 40,
    textAlign: "center",
    color: "#777",
  },
};