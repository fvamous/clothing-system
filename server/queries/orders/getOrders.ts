import { orderService } from "@/lib/domain/orders/service";

export async function getOrders() {
  return orderService.getAll();
}