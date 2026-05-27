import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    message:
      "Upload endpoint ready for Cloudinary integration",
  });
}