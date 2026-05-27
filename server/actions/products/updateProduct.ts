"use server";

import { revalidatePath } from "next/cache";

import { productService } from "@/lib/domain/products/service";

export async function updateProductAction(
  id: string,
  data: any
) {
  const updated =
    await productService.update(id, data);

  revalidatePath("/admin/products");

  revalidatePath(`/product/${id}`);

  return updated;
}