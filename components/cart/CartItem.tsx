"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function CartItem({ item }: any) {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();

  const { theme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const subtotal = item.price * item.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.35 }}
      style={{
        ...styles.card,

        background: isDark
          ? "rgba(15,23,42,0.72)"
          : "rgba(255,255,255,0.72)",

        border: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(255,255,255,0.4)",

        boxShadow: isDark
          ? "0 14px 40px rgba(0,0,0,0.45)"
          : "0 14px 40px rgba(15,23,42,0.06)",
      }}
    >
      <div style={styles.inner}>
        <Link
          href={`/product/${item.id}`}
          style={{
            ...styles.imageWrap,

            background: isDark
              ? "rgba(255,255,255,0.04)"
              : "rgba(255,255,255,0.6)",

            border: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <Image
            src={item.imageUrl || "/file.svg"}
            alt={item.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </Link>

        <div style={styles.content}>
          <div style={styles.top}>
            <div>
              <Link
                href={`/product/${item.id}`}
                style={{
                  ...styles.name,
                  color: isDark ? "#f8fafc" : "#0f172a",
                }}
              >
                {item.name}
              </Link>

              <p
                style={{
                  ...styles.price,
                  color: isDark ? "#94a3b8" : "#64748b",
                }}
              >
                Rp {item.price.toLocaleString("id-ID")}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                ...styles.deleteBtn,

                background: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.6)",

                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(255,255,255,0.5)",

                color: isDark ? "#f8fafc" : "#0f172a",
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div style={styles.bottom}>
            <div
              style={{
                ...styles.qtyBox,

                background: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.6)",

                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <button
                onClick={() => decreaseQty(item.id)}
                style={{
                  ...styles.qtyBtn,
                  color: isDark ? "#f8fafc" : "#0f172a",
                }}
              >
                <Minus size={14} />
              </button>

              <span
                style={{
                  ...styles.qty,
                  color: isDark ? "#f8fafc" : "#0f172a",
                }}
              >
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQty(item.id)}
                style={{
                  ...styles.qtyBtn,
                  color: isDark ? "#f8fafc" : "#0f172a",
                }}
              >
                <Plus size={14} />
              </button>
            </div>

            <div style={styles.subtotal}>
              <span
                style={{
                  ...styles.subLabel,
                  color: isDark ? "#64748b" : "#94a3b8",
                }}
              >
                Subtotal
              </span>

              <span
                style={{
                  ...styles.subValue,
                  color: isDark ? "#f8fafc" : "#0f172a",
                }}
              >
                Rp {subtotal.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================
   STYLE SYSTEM
========================= */

const styles: Record<string, React.CSSProperties> = {
  card: {
    position: "relative",
    overflow: "hidden",

    borderRadius: 28,

    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",

    padding: 18,
  },

  inner: {
    display: "flex",
    gap: 16,
  },

  imageWrap: {
    position: "relative",
    width: 110,
    height: 110,
    flexShrink: 0,

    borderRadius: 22,
    overflow: "hidden",
  },

  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
  },

  name: {
    fontSize: 15,
    fontWeight: 700,
    textDecoration: "none",
  },

  price: {
    fontSize: 13,
    marginTop: 4,
  },

  deleteBtn: {
    width: 42,
    height: 42,

    borderRadius: 14,

    backdropFilter: "blur(14px)",

    cursor: "pointer",
  },

  bottom: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  qtyBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,

    padding: "6px 10px",
    borderRadius: 999,
  },

  qtyBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  qty: {
    minWidth: 24,
    textAlign: "center",
    fontWeight: 600,
  },

  subtotal: {
    textAlign: "right",
  },

  subLabel: {
    fontSize: 11,
  },

  subValue: {
    fontSize: 16,
    fontWeight: 800,
  },
};