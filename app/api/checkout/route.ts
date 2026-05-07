import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type CheckoutItem = {
  productId: number;
  quantity: number;
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => null);

    if (!body?.items || !Array.isArray(body.items)) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const items: CheckoutItem[] = body.items.map((i: any) => ({
      productId: Number(i.productId),
      quantity: Number(i.quantity),
    }));

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        id: { in: items.map((i) => i.productId) },
      },
    });

    let total = 0;

    for (const item of items) {
      const product = products.find(
        (p) => p.id === item.productId
      );

      if (!product) {
        return NextResponse.json(
          { success: false, error: "Product not found" },
          { status: 400 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            error: `Stock not enough for ${product.name}`,
          },
          { status: 400 }
        );
      }

      total += product.price * item.quantity;
    }

    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          userId: user.id,
          total,
          status: "PENDING",
          items: {
            create: items.map((item) => {
              const product = products.find(
                (p) => p.id === item.productId
              );

              if (!product) {
                throw new Error("Product mapping failed");
              }

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

          for (const item of items) {
      const updated =
        await tx.product.updateMany({
          where: {
            id: item.productId,
            stock: {
              gte: item.quantity,
            },
          },

          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

  // ===================================
  // STOCK FAILED / RACE CONDITION
  // ===================================
  if (updated.count === 0) {
    throw new Error(
      "Stock changed, checkout failed"
    );
  }
}

      return createdOrder;
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      total: order.total,
    });
  } catch (err: any) {
    console.error("CHECKOUT ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Checkout failed",
      },
      { status: 500 }
    );
  }
}