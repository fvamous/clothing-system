export const ORDER_STATUS = {
  PENDING: "PENDING",

  PAID: "PAID",

  PROCESSING: "PROCESSING",

  SHIPPED: "SHIPPED",

  COMPLETED: "COMPLETED",

  CANCELLED: "CANCELLED",
} as const;

export type OrderStatus =
  (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];