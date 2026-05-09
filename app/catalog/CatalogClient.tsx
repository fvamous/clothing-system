"use client";

import {
  useState,
  type CSSProperties,
} from "react";

import Image from "next/image";

import { useCart } from "@/context/CartContext";

import type { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export default function CatalogClient({
  products,
}: Props) {
  const { addToCart } =
    useCart();

  const [
    selected,
    setSelected,
  ] = useState<Product | null>(
    null
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        Catalog
      </h1>

      {/* GRID */}
      <div style={styles.grid}>
        {products.map(
          (item) => (
            <div
              key={item.id}
              style={styles.card}
            >
              {/* IMAGE */}
              <div
                style={
                  styles.imageWrap
                }
              >
                <Image
                  src={
                    item.imageUrl ||
                    "/placeholder.png"
                  }
                  alt={item.name}
                  width={500}
                  height={500}
                  style={
                    styles.image
                  }
                />
              </div>

              {/* INFO */}
              <div
                style={styles.info}
              >
                <h3
                  style={
                    styles.name
                  }
                >
                  {item.name}
                </h3>

                <p
                  style={
                    styles.price
                  }
                >
                  Rp{" "}
                  {Number(
                    item.price
                  ).toLocaleString(
                    "id-ID"
                  )}
                </p>
              </div>

              {/* ACTION */}
              <div
                style={
                  styles.actions
                }
              >
                <button
                  type="button"
                  style={
                    styles.viewBtn
                  }
                  onClick={() =>
                    setSelected(
                      item
                    )
                  }
                >
                  View
                </button>

                <button
                  type="button"
                  style={
                    styles.cartBtn
                  }
                  onClick={() =>
                    addToCart({
                      id: String(
                        item.id
                      ),

                      name:
                        item.name,

                      price:
                        Number(
                          item.price
                        ),

                      quantity: 1,

                      imageUrl:
                        item.imageUrl ??
                        undefined,

                      stock:
                        item.stock ??
                        0,
                    })
                  }
                >
                  Add
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <div
          style={
            styles.modalOverlay
          }
          onClick={() =>
            setSelected(null)
          }
        >
          <div
            style={
              styles.modal
            }
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <Image
              src={
                selected.imageUrl ||
                "/placeholder.png"
              }
              alt={selected.name}
              width={500}
              height={500}
              style={
                styles.modalImage
              }
            />

            <h2
              style={{
                marginTop: 12,
              }}
            >
              {selected.name}
            </h2>

            <p
              style={{
                color: "#666",
              }}
            >
              Rp{" "}
              {Number(
                selected.price
              ).toLocaleString(
                "id-ID"
              )}
            </p>

            <button
              type="button"
              style={
                styles.closeBtn
              }
              onClick={() =>
                setSelected(null)
              }
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
   STYLES
========================= */

const styles: Record<
  string,
  CSSProperties
> = {
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
    gridTemplateColumns:
      "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 16,
  },

  card: {
    background: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow:
      "0 8px 24px rgba(0,0,0,0.06)",
  },

  imageWrap: {
    height: 180,
    background: "#f5f5f5",
    overflow: "hidden",
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
     MODAL
  ========================= */

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background:
      "rgba(0,0,0,0.4)",
    backdropFilter:
      "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent:
      "center",
    zIndex: 9999,
  },

  modal: {
    width: 360,
    background: "#fff",
    borderRadius: 14,
    padding: 16,
    textAlign: "center",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.2)",
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