export interface OrderItemEntity {
  id: string;

  productId: string;

  quantity: number;
  price: number;

  subtotal?: number | null;
}

export interface OrderEntity {
  id: string;

  userId: string;

  total: number;

  status:
    | "PENDING"
    | "PAID"
    | "PROCESSING"
    | "SHIPPED"
    | "COMPLETED"
    | "CANCELLED";

  items: OrderItemEntity[];

  createdAt: Date;
}