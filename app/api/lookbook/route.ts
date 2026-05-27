import { NextResponse } from "next/server";

import { lookbookService } from "@/lib/domain/lookbook/service";

import { handleApiError } from "@/lib/errors/ApiError";

export async function GET() {
  try {
    const items =
      await lookbookService.getAll();

    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error) {
    return handleApiError(error);
  }
}