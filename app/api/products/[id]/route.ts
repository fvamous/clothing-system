import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// =========================
// AUTH
// =========================
async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return { ok: false as const, status: 401, error: "Unauthorized" };
  }

  if (session.user.role !== "ADMIN") {
    return { ok: false as const, status: 403, error: "Forbidden" };
  }

  return { ok: true as const };
}

// =========================
// GET
// =========================
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const productId = Number(id);

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      isDeleted: false,
    },
  });

  return NextResponse.json(product);
}

// =========================
// UPDATE
// =========================
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin();

  if (!guard.ok) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const { id } = await context.params;
  const productId = Number(id);

  const body = await req.json();

  const updated = await prisma.product.update({
    where: { id: productId },
    data: {
      name: body.name,
      price: Number(body.price),
      stock: Number(body.stock ?? 0),
      imageUrl: body.imageUrl ?? null,
      description: body.description ?? null,
    },
  });

  return NextResponse.json(updated);
}

// =========================
// DELETE (SOFT DELETE ONLY)
// =========================
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin();

  if (!guard.ok) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const { id } = await context.params;
  const productId = Number(id);

  await prisma.product.update({
    where: { id: productId },
    data: {
      isDeleted: true,
    },
  });

  return NextResponse.json({ success: true });
}