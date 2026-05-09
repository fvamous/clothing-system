"use client";

import ProductCard from "@/components/admin/modules/products/ProductCard";
import { Product } from "@/types/product";

type Props = {
  products?: Product[];
};

export default function ProductGrid({ products }: Props) {
  if (!products || products.length === 0) {
    return (
      <div
        style={{
          padding: 20,
          textAlign: "center",
          color: "#666",
        }}
      >
        No products available
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}