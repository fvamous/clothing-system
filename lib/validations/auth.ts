// lib/validations/auth.ts

import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email required")
    .email("Invalid email"),

  password: z
    .string()
    .min(
      6,
      "Password minimum 6 characters"
    ),
});

export const registerSchema =
  z.object({
    name: z
      .string()
      .min(
        2,
        "Name minimum 2 characters"
      ),

    email: z
      .string()
      .min(1, "Email required")
      .email("Invalid email"),

    password: z
      .string()
      .min(
        6,
        "Password minimum 6 characters"
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      message:
        "Password confirmation mismatch",

      path: ["confirmPassword"],
    }
  );

export type LoginInput = z.infer<
  typeof loginSchema
>;

export type RegisterInput = z.infer<
  typeof registerSchema
>;