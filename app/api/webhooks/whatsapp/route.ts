import { openrouter } from "@/lib/ai/openrouter";

export async function POST(req: Request) {
  const body = await req.json();

  const message =
    body?.data?.message?.conversation || "";

  const ai = await openrouter.chat.completions.create({
    model: "openai/gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "Kamu customer service toko fashion.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  const reply = ai.choices[0].message.content;

  // kirim balik ke whatsapp

  return Response.json({
    success: true,
  });
}