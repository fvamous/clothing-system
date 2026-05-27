import { NextRequest, NextResponse } from "next/server";

import { orderService } from "@/lib/domain/orders/service";

import { handleApiError } from "@/lib/errors/ApiError";

export async function GET() {
  try {
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