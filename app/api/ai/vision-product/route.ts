import { NextResponse } from "next/server";

export async function POST() {
  try {
    // 🔥 STAGE 1: Vision AI dimatikan sementara
    // Fokus: UI + form system + stabilisasi

    return NextResponse.json({
      result: {
        description: "",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Vision AI disabled temporarily",
      },
      { status: 200 }
    );
  }
}