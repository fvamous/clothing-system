import { openrouter } from "@/lib/ai/openrouter";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message =
      body?.data?.message?.conversation || "";

    const reply = await openrouter.call([
      {
        role: "system",
        content: "Kamu customer service toko fashion profesional.",
      },
      {
        role: "user",
        content: message,
      },
    ]);

    // TODO: kirim ke WhatsApp API

    return Response.json({
      success: true,
      reply,
    });
  } catch (err: any) {
    return Response.json(
      {
        success: false,
        error: err?.message || "Webhook error",
      },
      { status: 500 }
    );
  }
}