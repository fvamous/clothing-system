import { NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/infra/auth/api";

import { handleApiError } from "@/lib/errors/ApiError";

export async function POST() {
  try {
    await requireAdminApi();

    return NextResponse.json({
      success: true,
      message:
        "Upload endpoint ready for Cloudinary integration",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
