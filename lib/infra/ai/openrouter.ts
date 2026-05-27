type ProductInput = {
  name: string;
};

type OpenRouterMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OpenRouterResponse = {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
};

export const openrouter = {
  async call(
    messages: OpenRouterMessage[]
  ) {
    const res = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          model: "openai/gpt-4o-mini",

          messages,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();

      throw new Error(
        `OpenRouter error: ${err}`
      );
    }

    const json: OpenRouterResponse =
      await res.json();

    return (
      json.choices?.[0]?.message
        ?.content || ""
    );
  },

  async generateDescription(
    product: ProductInput
  ) {
    return this.call([
      {
        role: "system",

        content:
          "Kamu adalah copywriter ecommerce fashion kelas premium seperti Shopify brand store.",
      },

      {
        role: "user",

        content: `Buat deskripsi produk fashion profesional, menarik, dan SEO-friendly untuk: ${product.name}`,
      },
    ]);
  },
};