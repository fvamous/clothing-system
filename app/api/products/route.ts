import { NextResponse } from "next/server";
import { prisma } from "@/lib/infra/prisma/client";
import { randomUUID } from "crypto";

// =========================
// GET ALL PRODUCTS
// =========================
export async function GET() {
  const products = await prisma.product.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(products);
}

// =========================
// CREATE PRODUCT
// =========================
export async function POST(req: Request) {
  const body = await req.json();

  if (!body.name || !body.price) {
    return NextResponse.json(
      { error: "name & price required" },
      { status: 400 }
    );
  }

  const slug =
    body.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") +
    "-" +
    randomUUID().slice(0, 6);

  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: Number(body.price),
      stock: Number(body.stock ?? 0),

      imageUrl: body.imageUrl ?? null,
      description: body.description ?? null,

      // NEW FIELDS (sesuai schema kamu)
      categoryId: body.categoryId ?? null,
      color: body.color ?? null,
      material: body.material ?? null,

      slug,
    },
  });

  return NextResponse.json(product);
}