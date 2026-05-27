import { prisma } from "@/lib/infra/prisma/client";

export async function getStats() {
  const [
    totalProducts,
    totalOrders,
    totalUsers,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  return {
    totalProducts,
    totalOrders,
    totalUsers,
  };
}