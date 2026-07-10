import type { Product } from "@prisma/client";

import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({
  products,
}: ProductGridProps) {
  if (!products.length) {
    return (
      <div
        className="
          py-24
          text-center
          text-zinc-500
          dark:text-zinc-400
        "
      >
        Produk belum tersedia
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
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
