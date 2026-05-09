import { prisma } from "@/lib/infra/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const customers = await prisma.user.count();
  const products = await prisma.product.count();

  return NextResponse.json({
    customers,
    products,
    countries: 12, // sementara static (kalau belum ada geo data)
  });
}