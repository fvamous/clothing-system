import { NextResponse } from "next/server";
import { prisma } from "@/lib/infra/prisma/client";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  const data = await prisma.lookbook.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const upload = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "lookbook" }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
      .end(buffer);
  });

  const imageUrl = (upload as any).secure_url;

  const created = await prisma.lookbook.create({
    data: { imageUrl },
  });

  return NextResponse.json(created);
}