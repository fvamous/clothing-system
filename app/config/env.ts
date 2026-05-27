import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),

  NEXTAUTH_SECRET: z.string().min(1),

  NEXTAUTH_URL: z.string().url(),

  OPENAI_API_KEY: z
    .string()
    .optional(),

  CLOUDINARY_CLOUD_NAME:
    z.string().optional(),

  CLOUDINARY_API_KEY:
    z.string().optional(),

  CLOUDINARY_API_SECRET:
    z.string().optional(),
});

const parsed =
  envSchema.safeParse(
    process.env
  );

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables"
  );

  console.error(
    parsed.error.flatten()
      .fieldErrors
  );

  throw new Error(
    "Invalid environment variables"
  );
}

export const env =
  parsed.data;