import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/infra/prisma/client";

import { handleApiError } from "@/lib/errors/ApiError";

export async function GET(
  request: NextRequest
) {
  try {
    const search =
      request.nextUrl.searchParams.get("q");

    if (!search) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const products =
      await prisma.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],

          isDeleted: false,
        },

        take: 20,
      });

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    return handleApiError(error);
  }
}