import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3),

  slug: z.string().min(3),

  price: z.number().min(1),

  stock: z.number().min(0),

  imageUrl: z.string().optional(),

  description: z.string().optional(),
});