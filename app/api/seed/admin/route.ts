import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const seedKey = process.env.SEED_KEY;
    const provided = req.headers.get("x-seed-key");

    if (!seedKey || provided !== seedKey) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const email = body.email?.toLowerCase().trim();
    const password = body.password;
    const name = body.name?.trim() || null;

    if (!email || !password) {
      return NextResponse.json(
        { error: "email and password required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "password too weak" },
        { status: 400 }
      );
    }

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      return NextResponse.json(
        { error: "User exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword, // pastikan sesuai schema kamu
        role: Role.ADMIN, // kalau ini memang seed admin
      },
    });

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("SEED ERROR:", err);

    return NextResponse.json(
      {
        error: "Server error",
        detail: err?.message,
      },
      { status: 500 }
    );
  }
}