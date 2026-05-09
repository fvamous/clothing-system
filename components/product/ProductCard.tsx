"use client";

import { useCart } from "@/context/CartContext";

import type { Product } from "@/types/product";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart({
      id: String(product.id),

      name: product.name,

      price: Number(product.price),

      quantity: 1,

      imageUrl:
        product.imageUrl ??
        undefined,

      stock:
        typeof product.stock ===
        "number"
          ? product.stock
          : 0,
    });
  }

  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        padding: 16,
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <h3 style={{ margin: 0 }}>
        {product.name}
      </h3>

      <p style={{ margin: 0 }}>
        Rp{" "}
        {Number(
          product.price
        ).toLocaleString("id-ID")}
      </p>

      <button
        type="button"
        onClick={handleAddToCart}
        style={{
          marginTop: 8,
          padding: "8px 12px",
          borderRadius: 8,
          border: "none",
          background: "black",
          color: "white",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}