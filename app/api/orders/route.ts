import { NextRequest, NextResponse } from "next/server";

import { orderService } from "@/lib/domain/orders/service";

import { handleApiError } from "@/lib/errors/ApiError";

import { requireAdminApi } from "@/lib/infra/auth/api";

export async function GET() {
  try {
    await requireAdminApi();

    const orders =
      await orderService.getAll();

    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    await requireAdminApi();

    const body = await request.json();

    const order =
      await orderService.create(body);

    return NextResponse.json(
      {
        success: true,
        data: order,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
