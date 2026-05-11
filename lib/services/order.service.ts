import { prisma } from "@/lib/infra/prisma/client";

export async function getOrders() {
  return prisma.order.findMany();
}