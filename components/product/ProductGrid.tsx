import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

export default function ProductGrid({
  products,
}: {
  products?: Product[];
}) {
  if (!Array.isArray(products)) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
      }}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}