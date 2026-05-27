import { prisma } from "@/lib/infra/prisma/client";

import CatalogClient from "@/components/catalog/CatalogClient";

export default async function CatalogPage() {
  const [products, categories] =
    await Promise.all([
      prisma.product.findMany({
        where: {
          isDeleted: false,
        },

        include: {
          category: true,
        },
      }),

      prisma.category.findMany(),
    ]);

  return (
    <CatalogClient
      products={products}
      categories={categories}
    />
  );
}