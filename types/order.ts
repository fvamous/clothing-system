import { OrderStatus } from "@prisma/client";

export type OrderItem = {
  id: string;
  productId: string;
  productName: string;
  imageUrl?: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  userId?: string;
  customerName?: string;
  customerEmail?: string;
  total: number;
  status: OrderStatus;
  createdAt: Date | string;
  items: OrderItem[];
};