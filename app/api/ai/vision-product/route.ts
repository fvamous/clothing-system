import { NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/infra/auth/api";

import { handleApiError } from "@/lib/errors/ApiError";

export async function POST() {
  try {
    await requireAdminApi();

    return NextResponse.json({
      success: true,
      message: "Vision AI endpoint ready",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
