import { NextRequest, NextResponse } from "next/server";

import { handleApiError } from "@/lib/errors/ApiError";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    return NextResponse.json({
      success: true,
      message: "Checkout initialized",
      data: body,
    });
  } catch (error) {
    return handleApiError(error);
  }
}