"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

type CartItemProps = {
  item: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    quantity: number;
  };
};

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();

  const subtotal = item.price * item.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={styles.card}
    >
      <div style={styles.inner}>
        {/* IMAGE */}
        <Link href={`/product/${item.id}`} style={styles.imageWrap}>
          <Image
            src={item.imageUrl || "/file.svg"}
            alt={item.name}
            fill
            style={styles.image}
          />
        </Link>

        {/* CONTENT */}
        <div style={styles.content}>
          {/* TOP */}
          <div style={styles.top}>
            <div>
              <Link href={`/product/${item.id}`} style={styles.name}>
                {item.name}
              </Link>

              <p style={styles.price}>
                Rp {item.price.toLocaleString("id-ID")}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              style={styles.deleteBtn}
              type="button"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* BOTTOM */}
          <div style={styles.bottom}>
            {/* QTY */}
            <div style={styles.qtyBox}>
              <button onClick={() => decreaseQty(item.id)} style={styles.qtyBtn}>
                <Minus size={14} />
              </button>

              <span style={styles.qty}>{item.quantity}</span>

              <button onClick={() => increaseQty(item.id)} style={styles.qtyBtn}>
                <Plus size={14} />
              </button>
            </div>

            {/* SUBTOTAL */}
            <div style={styles.subtotal}>
              <span style={styles.subLabel}>Subtotal</span>
              <span style={styles.subValue}>
                Rp {subtotal.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* glow hover */}
      <div style={styles.glow} />
    </motion.div>
  );
}

/* =========================
   STYLE SYSTEM (CONSISTENT UI)
========================= */

const styles: Record<string, React.CSSProperties> = {
  card: {
    position: "relative",
    overflow: "hidden",

    borderRadius: 28,

    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",

    border: "1px solid rgba(255,255,255,0.4)",

    boxShadow: "0 14px 40px rgba(15,23,42,0.06)",

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

    background: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(0,0,0,0.05)",
  },

  image: {
    objectFit: "cover",
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
    color: "#0f172a",
    textDecoration: "none",
  },

  price: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
  },

  deleteBtn: {
    width: 42,
    height: 42,

    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.5)",

    background: "rgba(255,255,255,0.6)",
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

    background: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(0,0,0,0.06)",
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
    color: "#94a3b8",
  },

  subValue: {
    fontSize: 16,
    fontWeight: 800,
    color: "#0f172a",
  },

  glow: {
    position: "absolute",
    right: -40,
    top: -40,
    width: 120,
    height: 120,
    borderRadius: "50%",

    background: "rgba(255,154,158,0.25)",
    filter: "blur(40px)",
    opacity: 0,
    transition: "opacity .3s ease",
    pointerEvents: "none",
  },
};