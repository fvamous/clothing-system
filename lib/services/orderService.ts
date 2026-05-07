import { prisma } from "@/lib/prisma";

type CheckoutItem = {
  productId: number;
  quantity: number;
};

export async function createOrder(params: {
  userId: string;
  items: CheckoutItem[];
  idempotencyKey: string;
}) {
  const { userId, items, idempotencyKey } = params;

  // 1. ID EMPOTENCY CHECK
  const existing = await prisma.order.findUnique({
    where: { idempotencyKey },
    include: { items: true },
  });

  if (existing) return existing;

  // 2. FETCH PRODUCTS
  const products = await prisma.product.findMany({
    where: {
      id: { in: items.map((i) => i.productId) },
    },
  });

  let total = 0;

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);

    if (!product) throw new Error("Product not found");

    if (product.stock < item.quantity) {
      throw new Error(`Stock not enough for ${product.name}`);
    }

    total += product.price * item.quantity;
  }

  // 3. TRANSACTION
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId,
        total,
        status: "PENDING",
        idempotencyKey,
        items: {
          create: items.map((item) => {
            const product = products.find(
              (p) => p.id === item.productId
            )!;

            return {
              productId: product.id,
              quantity: item.quantity,
              price: product.price,
            };
          }),
        },
      },
      include: { items: true },
    });

    await Promise.all(
      items.map((item) =>
        tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
          },
        })
      )
    );

    return order;
  });
}