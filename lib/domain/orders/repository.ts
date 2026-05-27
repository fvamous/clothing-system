import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/infra/prisma/client";

export const orderRepository = {
  findAll() {
    return prisma.order.findMany({
      include: {
        items: true,
        user: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  },

  create(
    data: Prisma.OrderCreateInput
  ) {
    return prisma.order.create({
      data,
    });
  },
};