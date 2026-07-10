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
            border-zinc-200/70
            bg-white/70
            px-4
            text-zinc-950
            outline-none
            placeholder:text-zinc-400
            backdrop-blur-xl
            dark:border-white/10
            dark:bg-white/5
            dark:text-white
            dark:placeholder:text-zinc-500
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
