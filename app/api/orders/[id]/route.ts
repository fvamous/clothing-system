import { NextResponse } from "next/server";
import { prisma } from "@/lib/infra/prisma/client";
import { requireAdminApi } from "@/lib/infra/auth/api";
import { handleApiError } from "@/lib/errors/ApiError";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminApi();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    const order =
      await prisma.order.findUnique({
        where: { id },
        include: {
          items: true,
        },
      });

    if (!order) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    return handleApiError(error);
  }
}
