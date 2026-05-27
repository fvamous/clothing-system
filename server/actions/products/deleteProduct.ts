"use server";

import { revalidatePath } from "next/cache";

import { productService } from "@/lib/domain/products/service";

export async function deleteProductAction(
  id: string
) {
  await productService.delete(id);

  revalidatePath("/admin/products");

  revalidatePath("/");
}