import { prisma } from "@/lib/infra/prisma/client";
import { OrderStatus, Prisma } from "@prisma/client";

export const orderRepository = {
  create(data: Prisma.OrderCreateInput) {
    return prisma.order.create({
      data,
      include: {
        items: true,
      },
    });
  },

  findById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  },

  updateStatus(id: string, status: OrderStatus) {
    return prisma.order.update({
      where: { id },
      data: { status },
    });
  },
};