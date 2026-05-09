import { prisma } from "@/lib/prisma/client";
import { OrderStatus, Prisma } from "@prisma/client";

export const orderRepository = {
  create: (data: Prisma.OrderCreateInput) => {
    return prisma.order.create({
      data,
      include: {
        items: true,
      },
    });
  },

  findById: (id: string) => {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  },

  updateStatus: (id: string, status: OrderStatus) => {
    return prisma.order.update({
      where: { id },
      data: {
        status,
      },
    });
  },
};