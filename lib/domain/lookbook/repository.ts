import { prisma } from "@/lib/infra/prisma/client";
import { Prisma } from "@prisma/client";

export const lookbookRepository = {
  findAll: () => {
    return prisma.lookbook.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  create: (data: Prisma.LookbookCreateInput) => {
    return prisma.lookbook.create({
      data,
    });
  },

  delete: (id: string) => {
    return prisma.lookbook.delete({
      where: { id },
    });
  },
};