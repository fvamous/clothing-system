import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/infra/prisma/client";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 403,
      }
    );
  }

  const existing =
    await prisma.user.findFirst({
      where: {
        email: "admin@store.com",
      },
    });

  if (existing) {
    return NextResponse.json({
      success: true,
      message: "Admin already exists",
    });
  }

  const password =
    await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      email: "admin@store.com",
      hashedPassword: password,
      role: "ADMIN",
      name: "Administrator",
    },
  });

  return NextResponse.json({
    success: true,
    message: "Admin seeded",
  });
}