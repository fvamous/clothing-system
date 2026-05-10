"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
};

/* =========================
   ANIMATION VARIANTS
========================= */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const card = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const modal = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, scale: 0.92 },
};

export default function CatalogClient({ products }: Props) {
  const { addToCart } = useCart();
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Catalog</h1>
        <p style={styles.subtitle}>Curated modern fashion collection</p>
      </div>

      {/* GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={styles.grid}
      >
        {products.map((item) => (
          <motion.div
            key={item.id}
            variants={card}
            whileHover={{ y: -6, scale: 1.02 }}
            style={styles.card}
          >
            {/* IMAGE */}
            <div style={styles.imageWrap}>
              <Image
                src={item.imageUrl || "/placeholder.png"}
                alt={item.name}
                width={600}
                height={600}
                style={styles.image}
              />
              <div style={styles.imageOverlay} />
            </div>

            {/* INFO */}
            <div style={styles.info}>
              <h3 style={styles.name}>{item.name}</h3>
              <p style={styles.price}>
                Rp {Number(item.price).toLocaleString("id-ID")}
              </p>
            </div>

            {/* ACTION (VIEW + ADD PREMIUM SPLIT BUTTON) */}
            <div style={styles.actions}>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelected(item)}
                style={styles.viewBtn}
              >
                View
              </motion.button>

              <div style={styles.divider} />

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  addToCart({
                    id: String(item.id),
                    name: item.name,
                    price: Number(item.price),
                    quantity: 1,
                    imageUrl: item.imageUrl ?? undefined,
                    stock: item.stock ?? 0,
                  })
                }
                style={styles.cartBtn}
              >
                Add
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            style={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              variants={modal}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={styles.modal}
            >
              <Image
                src={selected.imageUrl || "/placeholder.png"}
                alt={selected.name}
                width={600}
                height={600}
                style={styles.modalImage}
              />

              <h2 style={styles.modalTitle}>{selected.name}</h2>

              <p style={styles.modalPrice}>
                Rp {Number(selected.price).toLocaleString("id-ID")}
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                style={styles.closeBtn}
                onClick={() => setSelected(null)}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================
   STYLES (FIXED + PREMIUM SYSTEM)
========================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "32px",
    background: "linear-gradient(135deg,#fafafa,#f5f7ff)",
    minHeight: "100vh",
  },

  header: {
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: 800,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 18,
  },

  card: {
    background: "rgba(255,255,255,0.75)",
    borderRadius: 22,
    overflow: "hidden",
    boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
    border: "1px solid rgba(255,255,255,0.4)",
    backdropFilter: "blur(18px)",
  },

  imageWrap: {
    position: "relative",
    height: 200,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.15), transparent)",
  },

  info: {
    padding: 14,
  },

  name: {
    fontSize: 15,
    fontWeight: 700,
  },

  price: {
    fontSize: 14,
    color: "#444",
    fontWeight: 600,
  },

  actions: {
    display: "flex",
    alignItems: "center",
    borderRadius: 999,
    overflow: "hidden",
    background: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(0,0,0,0.08)",
    margin: "0 14px 14px",
    backdropFilter: "blur(16px)",
  },

  viewBtn: {
    flex: 1,
    padding: "10px 12px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
  },

  cartBtn: {
    flex: 1,
    padding: "10px 12px",
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
  },

  divider: {
    width: 1,
    height: "60%",
    background: "rgba(0,0,0,0.1)",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    backdropFilter: "blur(14px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  modal: {
    width: 380,
    background: "rgba(255,255,255,0.9)",
    borderRadius: 24,
    padding: 16,
    textAlign: "center",
    backdropFilter: "blur(20px)",
  },

  modalImage: {
    width: "100%",
    height: 280,
    objectFit: "cover",
    borderRadius: 16,
  },

  modalTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 800,
  },

  modalPrice: {
    marginTop: 4,
    color: "#555",
    fontWeight: 600,
  },

  closeBtn: {
    marginTop: 14,
    padding: "10px 14px",
    borderRadius: 999,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },
};