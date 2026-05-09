import { z } from "zod";

export const orderItemSchema =
  z.object({
    productId: z
      .number({
        message:
          "Product ID required",
      })
      .positive(),

    quantity: z
      .number({
        message:
          "Quantity required",
      })
      .min(1),
  });

export const checkoutSchema =
  z.object({
    items: z
      .array(orderItemSchema)
      .min(1),
  });

export type CheckoutInput =
  z.infer<typeof checkoutSchema>;