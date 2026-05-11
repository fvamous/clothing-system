import { NextResponse } from "next/server";
import {
  getProducts,
  createProduct,
} from "@/lib/services/product.service";

// =========================
// GET ALL PRODUCTS
// =========================
export async function GET() {
  const products = await getProducts();
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

  const product = await createProduct({
    name: body.name,
    price: body.price,
    stock: body.stock,
    imageUrl: body.imageUrl,
    description: body.description,
    categoryId: body.categoryId,
    color: body.color,
    material: body.material,
  });

  return NextResponse.json(product);
}