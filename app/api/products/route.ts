import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

// =========================
// GET PRODUCTS
// =========================
export async function GET() {
  try {
    const items = await prisma.product.findMany({
      where: {
        isDeleted: false,
      },

      include: {
        category: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(items);
  } catch (err: any) {
    return NextResponse.json(
      {
        error:
          err?.message ||
          "Failed to fetch products",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================
// CREATE PRODUCT
// =========================
export async function POST(req: Request) {
  try {
    // ADMIN GUARD
    await requireAdmin();

    const body = await req.json();

    // =========================
    // SANITIZE
    // =========================
    const name =
      body?.name?.trim() || "";

    const description =
      body?.description?.trim() ||
      null;

    const imageUrl =
      body?.imageUrl?.trim() || null;

    const price = Number(body?.price);

    const stock =
      Number(body?.stock) || 0;

    const categoryId = body?.categoryId
      ? Number(body.categoryId)
      : null;

    // =========================
    // VALIDATION
    // =========================
    if (!name) {
      return NextResponse.json(
        {
          error:
            "Product name required",
        },
        {
          status: 400,
        }
      );
    }

    if (!Number.isFinite(price)) {
      return NextResponse.json(
        {
          error: "Invalid price",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // CREATE
    // =========================
    const created =
      await prisma.product.create({
        data: {
          name,
          price,
          imageUrl,
          description,
          stock,
          categoryId,
          isDeleted: false,
        },

        include: {
          category: true,
        },
      });

    return NextResponse.json(created);
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        error:
          err?.message ||
          "Failed to create product",
      },
      {
        status: 500,
      }
    );
  }
}