"use client";

import { useMemo, useState } from "react";

import type {
  Product,
  Category,
} from "@prisma/client";

import CatalogGrid from "./CatalogGrid";

import CatalogSidebar from "./CatalogSidebar";

type CatalogClientProps = {
  products: Product[];
  categories: Category[];
};

export default function CatalogClient({
  products,
  categories,
}: CatalogClientProps) {
  const [search, setSearch] =
    useState("");

  const filtered = useMemo(() => {
    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );
  }, [products, search]);

  return (
    <div
      className="
        grid
        gap-10
        lg:grid-cols-[280px_1fr]
      "
    >
      <div className="space-y-6">
        <input
          placeholder="Search product..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-4
            outline-none
            backdrop-blur-xl
          "
        />

        <CatalogSidebar
          categories={categories}
        />
      </div>

      <CatalogGrid
        products={filtered}
      />
    </div>
  );
}