import type { Product } from "@prisma/client";

import ProductGrid from "@/components/product/ProductGrid";

type CatalogGridProps = {
  products: Product[];
};

export default function CatalogGrid({
  products,
}: CatalogGridProps) {
  return (
    <div className="space-y-8">
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            text-zinc-900
            dark:text-white
          "
        >
          Catalog
        </h2>

        <p
          className="
            text-sm
            text-zinc-500
            dark:text-zinc-400
          "
        >
          {products.length} products
        </p>
      </div>

      <ProductGrid
        products={products}
      />
    </div>
  );
}
