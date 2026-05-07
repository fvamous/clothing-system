import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const productService = {
  findAll: () => {
    return prisma.product.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  findById: (id: string) => {
    return prisma.product.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
  },

  create: (data: Prisma.ProductCreateInput) => {
    return prisma.product.create({
      data,
    });
  },

  update: (id: string, data: Prisma.ProductUpdateInput) => {
    return prisma.product.update({
      where: { id },
      data,
    });
  },

  delete: (id: string) => {
    return prisma.product.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  },
};