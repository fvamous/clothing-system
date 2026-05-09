import { prisma } from "@/lib/prisma/client";


export const productRepository = {
  findAll: () => {
    return prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  findById: (id: string) => {
    return prisma.product.findUnique({
      where: { id },
    });
  },

  create: (data: any) => {
    return prisma.product.create({
      data,
    });
  },

  update: (id: string, data: any) => {
    return prisma.product.update({
      where: { id },
      data,
    });
  },

  delete: (id: string) => {
    return prisma.product.delete({
      where: { id },
    });
  },
};