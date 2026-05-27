import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/infra/prisma/client";

export const productRepository = {
  findAll() {
    return prisma.product.findMany({
      where: {
        isDeleted: false,
      },

      include: {
        category: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findById(id: string) {
    return prisma.product.findUnique({
      where: {
        id,
      },

      include: {
        category: true,
      },
    });
  },

  findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: {
        slug,
      },

      include: {
        category: true,
      },
    });
  },

  create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
      data,
    });
  },

  update(
    id: string,
    data: Prisma.ProductUpdateInput
  ) {
    return prisma.product.update({
      where: {
        id,
      },

      data,
    });
  },

  remove(id: string) {
    return prisma.product.update({
      where: {
        id,
      },

      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  },
};