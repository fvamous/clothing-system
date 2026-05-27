// dto/create-order.dto.ts

export type CreateOrderItemDTO = {
  productId: string;

  quantity: number;
};

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELLED";

export type CreateOrderDTO = {
  userId?: string;

  items: CreateOrderItemDTO[];

  total: number;

  status?: OrderStatus;
};