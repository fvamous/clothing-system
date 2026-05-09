import { NextResponse } from "next/server";
import { prisma } from "@/lib/infra/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/infra/auth/authOptions";

type CheckoutItem = {
  productId: string;
  quantity: number;
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized (no session)" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => null);

    // 🔥 DEBUG FRIENDLY VALIDATION
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Empty request body" },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.items)) {
      return NextResponse.json(
        {
          success: false,
          error: "items must be an array",
          received: body,
        },
        { status: 400 }
      );
    }

    if (body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty" },
        { status: 400 }
      );
    }

    const items: CheckoutItem[] = body.items.map((i: any) => ({
      productId: String(i.productId || ""),
      quantity: Number(i.quantity || 0),
    }));

    // 🔥 HARD VALIDATION
    const invalidItem = items.find(
      (i) => !i.productId || i.quantity <= 0
    );

    if (invalidItem) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid cart item detected",
          item: invalidItem,
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found in DB" },
        { status: 404 }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        id: { in: items.map((i) => i.productId) },
      },
    });

    if (products.length === 0) {
      return NextResponse.json(
        { success: false, error: "Products not found" },
        { status: 400 }
      );
    }

    const productMap = new Map(products.map((p) => [p.id, p]));

    let total = 0;

    // =========================
    // VALIDATION PHASE
    // =========================
    for (const item of items) {
      const product = productMap.get(item.productId);

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            error: `Product not found: ${item.productId}`,
          },
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

    // =========================
    // TRANSACTION PHASE
    // =========================
    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          userId: user.id,
          total,
          status: "PENDING",
          items: {
            create: items.map((item) => {
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

      for (const item of items) {
        const updated = await tx.product.updateMany({
          where: {
            id: item.productId,
            stock: { gte: item.quantity },
          },
          data: {
            stock: { decrement: item.quantity },
          },
        });

        if (updated.count === 0) {
          throw new Error(
            "Stock conflict detected during checkout"
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