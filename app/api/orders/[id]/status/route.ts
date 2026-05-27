import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/infra/prisma/client";

import { handleApiError } from "@/lib/errors/ApiError";

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(
  request: NextRequest,
  { params }: Params
) {
  try {
    const body = await request.json();

    const order =
      await prisma.order.update({
        where: {
          id: params.id,
        },

        data: {
          status: body.status,
        },
      });

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    return handleApiError(error);
  }
}