import type { Product } from "@prisma/client";

import ProductGrid from "@/components/product/ProductGrid";

type FeaturedSectionProps = {
  products: Product[];
};

export default function FeaturedSection({
  products,
}: FeaturedSectionProps) {
  return (
    <section className="space-y-10">
      <div
        className="
          flex
          items-end
          justify-between
        "
      >
        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-[0.24em]
              text-zinc-500
              dark:text-zinc-400
            "
          >
            Featured
          </p>

          <h2
            className="
              mt-3
              text-3xl
              font-bold
              tracking-tight
              text-zinc-900
              dark:text-white
            "
          >
            Selected Products
          </h2>
        </div>
      </div>

      <ProductGrid
        products={products}
      />
    </section>
  );
}
