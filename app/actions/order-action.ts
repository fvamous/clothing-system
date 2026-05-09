"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma/client";
import { OrderStatus } from "@prisma/client";
import { ORDER_STATUS } from "@/lib/constants/order-status";

type CreateOrderItem = {
  productId: string;
  quantity: number;
};

type CreateOrderInput = {
  userId: string;
  items: CreateOrderItem[];

  customerName?: string;
  customerEmail?: string;
};

// ======================
// CREATE ORDER
// ======================
export async function createOrder(data: CreateOrderInput) {
  if (!data.items || data.items.length === 0) {
    throw new Error("Order items required");
  }

  const productIds = data.items.map((i) => i.productId);

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      isDeleted: false, // ✅ tambahan safety dari schema baru
    },
  });

  let total = 0;

  const orderItems = data.items.map((item) => {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < item.quantity) {
      throw new Error(`${product.name} stock insufficient`);
    }

    total += product.price * item.quantity;

    return {
      productId: product.id,
      quantity: item.quantity,
      price: product.price,
    };
  });

  const order = await prisma.order.create({
    data: {
      userId: data.userId,
      total,
      status: ORDER_STATUS.PENDING as OrderStatus,

      items: {
        create: orderItems,
      },
    },
    include: {
      items: true,
    },
  });

  // ======================
  // REDUCE STOCK
  // ======================
  await Promise.all(
    data.items.map((item) =>
      prisma.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      })
    )
  );

  revalidatePath("/admin/orders");
  revalidatePath("/admin/products");

  return order;
}

// ======================
// UPDATE STATUS
// ======================
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
) {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/success/${orderId}`);

  return order;
}

// ======================
// DELETE ORDER
// ======================
export async function deleteOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // ======================
  // RESTORE STOCK
  // ======================
  await Promise.all(
    order.items.map((item) =>
      prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            increment: item.quantity,
          },
        },
      })
    )
  );

  // ======================
  // DELETE ORDER
  // ======================
  await prisma.order.delete({
    where: { id: orderId },
  });

  revalidatePath("/admin/orders");
}