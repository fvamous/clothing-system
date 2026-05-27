// lib/validations/lookbook.ts

import { z } from "zod";

export const lookbookImageSchema =
  z.object({
    imageUrl: z
      .string({
        required_error:
          "Image URL is required",
      })
      .min(1, "Image URL required")
      .url("Invalid image URL"),
  });

export type LookbookImageInput =
  z.infer<
    typeof lookbookImageSchema
  >;

// =========================
// FILE VALIDATION
// =========================

export const MAX_LOOKBOOK_FILE_SIZE =
  5 * 1024 * 1024;

export const ACCEPTED_LOOKBOOK_TYPES =
  [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

export function validateLookbookFile(
  file: File
) {
  if (!file) {
    return {
      success: false,
      error: "Image required",
    };
  }

  if (
    !ACCEPTED_LOOKBOOK_TYPES.includes(
      file.type
    )
  ) {
    return {
      success: false,
      error:
        "Only JPG, PNG, WEBP allowed",
    };
  }

  if (
    file.size >
    MAX_LOOKBOOK_FILE_SIZE
  ) {
    return {
      success: false,
      error:
        "Max image size is 5MB",
    };
  }

  return {
    success: true,
  };
}