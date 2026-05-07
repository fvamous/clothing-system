"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CatalogClient({ products }: any) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [selected, setSelected] = useState<any>(null);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Catalog</h1>

      {/* GRID */}
      <div style={styles.grid}>
        {products.map((item: any) => (
          <div key={item.id} style={styles.card}>
            {/* IMAGE */}
            <div style={styles.imageWrap}>
              <img
                src={item.imageUrl || "/placeholder.png"}
                style={styles.image}
              />
            </div>

            {/* INFO */}
            <div style={styles.info}>
              <h3 style={styles.name}>{item.name}</h3>
              <p style={styles.price}>
                Rp {Number(item.price).toLocaleString("id-ID")}
              </p>
            </div>

            {/* ACTION */}
            <div style={styles.actions}>
              <button
                style={styles.viewBtn}
                onClick={() => setSelected(item)}
              >
                View
              </button>

              <button
                style={styles.cartBtn}
                onClick={() =>
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    imageUrl: item.imageUrl ?? "",
                  })
                }
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div style={styles.modalOverlay} onClick={() => setSelected(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <img
              src={selected.imageUrl || "/placeholder.png"}
              style={styles.modalImage}
            />

            <h2 style={{ marginTop: 12 }}>{selected.name}</h2>

            <p style={{ color: "#666" }}>
              Rp {Number(selected.price).toLocaleString("id-ID")}
            </p>

            <button
              style={styles.closeBtn}
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   STYLES (UNCHANGED + MODAL)
========================= */
const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "2rem",
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 16,
  },

  card: {
    background: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },

  imageWrap: {
    height: 180,
    background: "#f5f5f5",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  info: {
    padding: 12,
  },

  name: {
    fontSize: 14,
    fontWeight: 600,
  },

  price: {
    fontSize: 13,
    color: "#666",
  },

  actions: {
    display: "flex",
    gap: 8,
    padding: 12,
  },

  viewBtn: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },

  cartBtn: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },

  /* =========================
     MODAL (GLASS EFFECT)
  ========================= */

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  modal: {
    width: 360,
    background: "#fff",
    borderRadius: 14,
    padding: 16,
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },

  modalImage: {
    width: "100%",
    height: 260,
    objectFit: "cover",
    borderRadius: 10,
  },

  closeBtn: {
    marginTop: 12,
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },
};