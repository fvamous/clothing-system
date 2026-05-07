"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

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
      <h3 style={{ margin: 0 }}>{product.name}</h3>

      <p style={{ margin: 0 }}>
        Rp {product.price.toLocaleString()}
      </p>

      <button
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl ?? null, // 🔥 FIX penting
          })
        }
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