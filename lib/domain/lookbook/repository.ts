import { prisma } from "@/lib/infra/prisma/client";

export const lookbookRepository = {
  findAll() {
    return prisma.lookbook.findMany({
      where: {
        isActive: true,
      },

      orderBy: {
        sortOrder: "asc",
      },
    });
  },
};