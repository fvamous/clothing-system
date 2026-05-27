import { NextResponse } from "next/server";

import { getStats } from "@/server/queries/stats/getStats";

import { handleApiError } from "@/lib/errors/ApiError";

export async function GET() {
  try {
    const stats = await getStats();

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return handleApiError(error);
  }
}