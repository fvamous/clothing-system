import { prisma } from "@/lib/infra/prisma/client";

export async function getStats() {
  const [products, orders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
  ]);

  return { products, orders };
}