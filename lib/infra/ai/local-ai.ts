import OpenAI from "openai";

/* =========================
   LOCAL AI CLIENT
========================= */
export const localAI = new OpenAI({
  baseURL:
    process.env.LM_STUDIO_URL ||
    "http://127.0.0.1:1234/v1",

  apiKey:
    process.env.LM_STUDIO_API_KEY ||
    "lm-studio",
});