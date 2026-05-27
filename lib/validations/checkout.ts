// lib/validations/checkout.ts

import { z } from "zod";

export const checkoutItemSchema =
  z.object({
    productId: z
      .string()
      .min(1, "Product required"),

    quantity: z
      .number()
      .min(1, "Minimum quantity is 1"),
  });

export const checkoutSchema =
  z.object({
    items: z
      .array(checkoutItemSchema)
      .min(
        1,
        "Cart cannot be empty"
      ),
  });

export type CheckoutInput =
  z.infer<typeof checkoutSchema>;