import { productService } from "@/lib/domain/products/service";

export async function getProducts() {
  return productService.getAll();
}