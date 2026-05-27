import { NextRequest, NextResponse } from "next/server";

import { productService } from "@/lib/domain/products/service";

import { handleApiError } from "@/lib/errors/ApiError";

import { createProductSchema } from "@/lib/validations/product";

import { requireAdminApi } from "@/lib/infra/auth/api";

export async function GET() {
  try {
    const products =
      await productService.getAll();

    return NextResponse.json({
      success: true,
      data: products,
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

    const validated =
      createProductSchema.parse(body);

    const product =
      await productService.create(validated);

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
