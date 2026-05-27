import { NextRequest, NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/infra/auth/api";

import { handleApiError } from "@/lib/errors/ApiError";

export async function POST(
  request: NextRequest
) {
  try {
    await requireAdminApi();

    const body = await request.json();

    return NextResponse.json({
      success: true,
      data: {
        description: `AI generated description for ${body.name}`,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
