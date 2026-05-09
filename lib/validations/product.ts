import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  stock: z.number(),

  // ❌ HAPUS INI:
  // category: z.string().optional(),

  // ✅ GANTI INI:
  categoryId: z.string().optional(),

  color: z.string().optional(),
  material: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});