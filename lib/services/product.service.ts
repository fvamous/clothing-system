import { prisma } from "@/lib/infra/prisma/client";
import { randomUUID } from "crypto";

export async function getProducts() {
  return prisma.product.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: "desc" },
  });
}

type CreateProductInput = {
  name: string;
  price: number;
  stock?: number;
  imageUrl?: string | null;
  description?: string | null;
  categoryId?: string | null;
  color?: string | null;
  material?: string | null;
};

export async function createProduct(data: CreateProductInput) {
  const slug =
    data.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") +
    "-" +
    randomUUID().slice(0, 6);

  return prisma.product.create({
    data: {
      name: data.name,
      price: Number(data.price),
      stock: Number(data.stock ?? 0),

      imageUrl: data.imageUrl ?? null,
      description: data.description ?? null,

      categoryId: data.categoryId ?? null,
      color: data.color ?? null,
      material: data.material ?? null,

      slug,
    },
  });
}