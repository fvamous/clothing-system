import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL:
    process.env.LM_STUDIO_URL ||
    "http://127.0.0.1:1234/v1",

  apiKey: "lm-studio",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        {
          error: "Nama produk wajib",
        },
        {
          status: 400,
        }
      );
    }

    const completion =
      await client.chat.completions.create({
        model:
          "qwen2.5-coder-1.5b-instruct",

        messages: [
          {
            role: "system",
            content:
              "Kamu adalah copywriter ecommerce fashion Indonesia.",
          },

          {
            role: "user",
            content: `
Buat deskripsi ecommerce fashion.

Nama produk:
${body.name}

Aturan:
- jangan mengarang warna
- jangan mengarang material
- maksimal 40 kata
- bahasa Indonesia
- profesional
- singkat dan jelas
`,
          },
        ],

        temperature: 0.5,
        max_tokens: 80,
      });

    const result =
      completion.choices?.[0]
        ?.message?.content
        ?.replace(/^"|"$/g, "") ||
      "Deskripsi gagal dibuat";

    return NextResponse.json({
      result,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "AI generation failed",
      },
      {
        status: 500,
      }
    );
  }
}