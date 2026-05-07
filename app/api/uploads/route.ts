import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// disable caching
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    // ✅ HARD VALIDATION
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Invalid file upload" },
        { status: 400 }
      );
    }

    // ✅ ENV CHECK (INI YANG SERING BIKIN 500)
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary env missing" },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "products",

          // 🔥 PRO OPTIMIZATION
          quality: "auto",
          fetch_format: "auto",
          resource_type: "image",
        },
        (err, res) => {
          if (err) {
            console.error("Cloudinary error:", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err: any) {
    console.error("UPLOAD ERROR:", err);

    return NextResponse.json(
      {
        error: "Upload failed",
        detail: err?.message || "unknown error",
      },
      { status: 500 }
    );
  }
}