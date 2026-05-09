import { prisma } from "@/lib/prisma/client";

type CheckoutItem = {
  productId: string;
  quantity: number;
};

export async function createOrder(params: {
  userId: string;
  items: CheckoutItem[];
  idempotencyKey: string;
}) {
  const { userId, items, idempotencyKey } = params;

  const existing = await prisma.order.findUnique({
    where: { idempotencyKey },
    include: { items: true },
  });

  if (existing) {
    return {
      ...existing,
      items: existing.items ?? [],
    };
  }

  return prisma.$transaction(async (tx) => {
    const products = await tx.product.findMany({
      where: {
        id: { in: items.map(i => i.productId) },
      },
    });

    type ProductType = (typeof products)[number];
    const productMap = new Map<string, ProductType>();

    for (const p of products) {
      productMap.set(p.id, p);
    }

    let total = 0;

    for (const item of items) {
      const product = productMap.get(item.productId);

      if (!product) throw new Error("Product not found");

      if (product.stock < item.quantity) {
        throw new Error(`Stock not enough for ${product.name}`);
      }

      total += product.price * item.quantity;
    }

    const updateResults = await Promise.all(
      items.map(item =>
        tx.product.updateMany({
          where: {
            id: item.productId,
            stock: { gte: item.quantity },
          },
          data: {
            stock: { decrement: item.quantity },
          },
        })
      )
    );

    if (updateResults.some(r => r.count === 0)) {
      throw new Error("Stock changed during checkout");
    }

    const order = await tx.order.create({
      data: {
        userId,
        total,
        status: "PENDING",
        idempotencyKey,
        items: {
          create: items.map(item => {
            const product = productMap.get(item.productId)!;

            return {
              productId: product.id,
              quantity: item.quantity,
              price: product.price,
              productName: product.name,
              subtotal: product.price * item.quantity,
            };
          }),
        },
      },
      include: { items: true },
    });

    return order;
  });
}