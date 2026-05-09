"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/infra/prisma/client";
import { ProductSchema } from "@/lib/validations/product";
import { randomUUID } from "crypto";

// =========================
// INPUT TYPE (UI LAYER)
// =========================
type ProductInput = {
  name: string;
  price: number;
  stock: number;

  categoryId?: string | null;

  color?: string;
  material?: string;
  description?: string;
  imageUrl?: string;
};

// =========================
// CREATE
// =========================
export async function createProduct(data: ProductInput) {
  const validated = ProductSchema.parse(data);

  const slug =
    validated.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") +
    "-" +
    randomUUID().slice(0, 6);

  await prisma.product.create({
    data: {
      name: validated.name,
      price: validated.price,
      stock: validated.stock,

      // RELATION FIX (Prisma safe)
      categoryId: validated.categoryId ?? null,

      color: validated.color ?? null,
      material: validated.material ?? null,
      description: validated.description ?? null,
      imageUrl: validated.imageUrl ?? null,

      slug,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
}

// =========================
// UPDATE
// =========================
export async function updateProduct(id: string, data: ProductInput) {
  const validated = ProductSchema.parse(data);

  await prisma.product.update({
    where: { id },
    data: {
      name: validated.name,
      price: validated.price,
      stock: validated.stock,

      categoryId: validated.categoryId ?? null,

      color: validated.color ?? null,
      material: validated.material ?? null,
      description: validated.description ?? null,
      imageUrl: validated.imageUrl ?? null,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath(`/product/${id}`);
}

// =========================
// DELETE
// =========================
export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
}