import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Vision AI sementara dimatikan
    // Supaya admin panel tetap stabil
    // dan tidak menyebabkan runtime error

    return NextResponse.json({
      success: true,

      result: {
        description: "",
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,

        error:
          "Vision AI disabled temporarily",
      },
      {
        status: 500,
      }
    );
  }
}