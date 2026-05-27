import { NextRequest, NextResponse } from "next/server";

import { productService } from "@/lib/domain/products/service";

import { handleApiError } from "@/lib/errors/ApiError";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const product =
      await productService.getById(params.id);

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: Params
) {
  try {
    const body = await request.json();

    const updated =
      await productService.update(
        params.id,
        body
      );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    await productService.delete(params.id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return handleApiError(error);
  }
}