export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export const ORDER_FLOW: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["PAID", "CANCELLED"],
  PAID: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

export function getAllowedActions(status: OrderStatus) {
  return ORDER_FLOW[status] || [];
}

export function isFinalStatus(status: OrderStatus) {
  return status === "DELIVERED" || status === "CANCELLED";
}