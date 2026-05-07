import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL PRODUCTS
export async function GET() {
  const products = await prisma.product.findMany({
    where: { isDeleted: false },
  });

  return NextResponse.json(products);
}

// CREATE PRODUCT (opsional)
export async function POST(req: Request) {
  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: Number(body.price),
      stock: Number(body.stock ?? 0),
      imageUrl: body.imageUrl ?? null,
      description: body.description ?? null,
    },
  });

  return NextResponse.json(product);
}