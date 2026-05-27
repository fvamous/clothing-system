"use server";

import { revalidatePath } from "next/cache";

import { productService } from "@/lib/domain/products/service";

export async function createProductAction(
  data: any
) {
  const product =
    await productService.create(data);

  revalidatePath("/admin/products");

  revalidatePath("/");

  return product;
}