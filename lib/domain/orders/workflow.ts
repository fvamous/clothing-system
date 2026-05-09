import { OrderStatus } from "@prisma/client";

const transitions: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["PAID", "CANCELLED"],
  PAID: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
};

export const orderWorkflow = {
  canTransition(from: OrderStatus, to: OrderStatus) {
    return transitions[from].includes(to);
  },

  getAllowedNext(status: OrderStatus): OrderStatus[] {
    return transitions[status];
  },
};