import { NextResponse } from "next/server";

import { prisma } from "@/lib/infra/prisma/client";

import { handleApiError } from "@/lib/errors/ApiError";

export async function GET() {
  try {
    const count =
      await prisma.order.count({
        where: {
          status: "PENDING",
        },
      });

    return NextResponse.json({
      success: true,
      data: {
        unread: count,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}