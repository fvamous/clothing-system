"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useCart } from "@/context/CartContext";

import { useRouter } from "next/navigation";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    cart,
    removeFromCart,
    clearCart,
    addToCart,
  } = useCart();

  const router = useRouter();

  // ===================================
  // CLIENT CHECKOUT LOCK
  // ===================================
  const [
    isCheckingOut,
    setIsCheckingOut,
  ] = useState(false);

  // ===================================
  // RESTORE LOCK (SAFE)
  // ===================================
  useEffect(() => {
    const raw =
      sessionStorage.getItem(
        "checkout-lock"
      );

    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);

      const expired =
        Date.now() - parsed.time >
        1000 * 60 * 5;

      if (!expired) {
        setIsCheckingOut(true);
      } else {
        sessionStorage.removeItem(
          "checkout-lock"
        );
      }
    } catch {
      sessionStorage.removeItem(
        "checkout-lock"
      );
    }
  }, []);

  // ===================================
  // BODY SCROLL LOCK
  // ===================================
  useEffect(() => {
    document.body.style.overflow =
      open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [open]);

  // ===================================
  // PRICE FORMATTER
  // ===================================
  const formatPrice = (
    value: number
  ) =>
    new Intl.NumberFormat(
      "id-ID"
    ).format(value);

  // ===================================
  // TOTAL (OPTIMIZED)
  // ===================================
  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0
    );
  }, [cart]);

  // ===================================
  // CHECKOUT
  // ===================================
  async function checkout() {
    if (isCheckingOut) return;

    setIsCheckingOut(true);

    sessionStorage.setItem(
      "checkout-lock",
      JSON.stringify({
        locked: true,
        time: Date.now(),
      })
    );

    try {
      const safeItems = cart.map(
        (i) => ({
          productId: Number(i.id),
          quantity: Number(i.qty),
        })
      );

      const res = await fetch(
        "/api/checkout",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            items: safeItems,
          }),
        }
      );

      const data = await res.json();

      // ===================================
      // FAILED
      // ===================================
      if (!res.ok) {
        alert(
          data?.error ||
            "Checkout failed"
        );

        sessionStorage.removeItem(
          "checkout-lock"
        );

        return;
      }

      // ===================================
      // SUCCESS
      // ===================================
      clearCart();

      sessionStorage.removeItem(
        "checkout-lock"
      );

      onClose();

      if (data?.orderId) {
        router.replace(
          `/success/${data.orderId}`
        );
      }
    } catch (err) {
      console.error(
        "Checkout crash:",
        err
      );

      alert("Checkout failed");

      sessionStorage.removeItem(
        "checkout-lock"
      );
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <>
      {/* BLUR BACKDROP */}
      {open && (
        <div
          onClick={onClose}
          style={styles.backdrop}
        />
      )}

      {/* DRAWER */}
      <div
        style={{
          ...styles.drawer,

          right: open
            ? 0
            : "-420px",
        }}
      >
        {/* HEADER */}
        <div style={styles.header}>
          <h3>Your Cart</h3>

          <button
            onClick={onClose}
            style={styles.closeBtn}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* EMPTY STATE */}
        {cart.length === 0 ? (
          <div style={styles.empty}>
            <div
              style={{
                fontSize: 40,
              }}
            >
              🛒
            </div>

            <p>
              Your cart is empty
            </p>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            <div style={styles.items}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={styles.item}
                >
                  {/* THUMBNAIL */}
                  <div
                    style={styles.thumb}
                  >
                    {item.imageUrl ? (
                      <img
                        src={
                          item.imageUrl
                        }
                        alt={item.name}
                        loading="lazy"
                        style={
                          styles.img
                        }
                      />
                    ) : (
                      "👕"
                    )}
                  </div>

                  {/* INFO */}
                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <p
                      style={
                        styles.name
                      }
                    >
                      {item.name}
                    </p>

                    <p
                      style={
                        styles.price
                      }
                    >
                      Rp{" "}
                      {formatPrice(
                        item.price
                      )}
                    </p>

                    {/* QTY CONTROL */}
                    <div
                      style={
                        styles.qtyBox
                      }
                    >
                      <button
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }
                        style={
                          styles.qtyBtn
                        }
                        disabled={
                          isCheckingOut
                        }
                      >
                        -
                      </button>

                      <span>
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          addToCart({
                            id: item.id,
                            name:
                              item.name,
                            price:
                              item.price,
                            imageUrl:
                              item.imageUrl,
                          })
                        }
                        style={
                          styles.qtyBtn
                        }
                        disabled={
                          isCheckingOut
                        }
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
                Total:{" "}
                <b>
                  Rp{" "}
                  {formatPrice(
                    total
                  )}
                </b>
              </div>

              <button
                onClick={checkout}
                disabled={
                  isCheckingOut
                }
                style={{
                  ...styles.checkout,

                  opacity:
                    isCheckingOut
                      ? 0.7
                      : 1,

                  cursor:
                    isCheckingOut
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {isCheckingOut
                  ? "Processing..."
                  : "Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

const styles: Record<
  string,
  React.CSSProperties
> = {
  backdrop: {
    position: "fixed",

    inset: 0,

    background:
      "rgba(0,0,0,0.4)",

    backdropFilter:
      "blur(6px)",

    zIndex: 999,
  },

  drawer: {
    position: "fixed",

    top: 0,

    right: 0,

    width: "100%",

    maxWidth: 400,

    height: "100vh",

    background:
      "rgba(255,255,255,0.95)",

    backdropFilter:
      "blur(10px)",

    boxShadow:
      "-10px 0 30px rgba(0,0,0,0.1)",

    transition:
      "all 0.35s cubic-bezier(0.4,0,0.2,1)",

    zIndex: 1000,

    display: "flex",

    flexDirection: "column",
  },

  header: {
    padding: 16,

    borderBottom:
      "1px solid #eee",

    display: "flex",

    justifyContent:
      "space-between",
  },

  closeBtn: {
    background: "none",

    border: "none",

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

    padding: "12px 0",

    borderBottom:
      "1px solid #f1f1f1",
  },

  thumb: {
    width: 50,

    height: 50,

    borderRadius: 8,

    background: "#f5f5f5",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    overflow: "hidden",

    flexShrink: 0,
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
    margin: 0,

    fontSize: 12,

    color: "#666",
  },

  qtyBox: {
    display: "flex",

    alignItems: "center",

    gap: 8,

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

    borderTop:
      "1px solid #eee",

    position: "sticky",

    bottom: 0,

    background:
      "rgba(255,255,255,0.95)",
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

    borderRadius: 8,
  },

  empty: {
    flex: 1,

    display: "flex",

    flexDirection: "column",

    justifyContent:
      "center",

    alignItems: "center",

    color: "#777",
  },
};