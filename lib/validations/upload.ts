// lib/validations/upload.ts

import { z } from "zod";

export const uploadSchema = z.object({
  url: z
    .string()
    .url("Invalid file URL"),

  filename: z
    .string()
    .min(1, "Filename required"),

  size: z
    .number()
    .max(
      5 * 1024 * 1024,
      "Max file size is 5MB"
    ),

  mimeType: z.string(),
});

export type UploadInput = z.infer<
  typeof uploadSchema
>;

// =========================
// FILE VALIDATION
// =========================

export const MAX_FILE_SIZE =
  5 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES =
  [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

export function validateImageFile(
  file: File
) {
  if (!file) {
    return {
      success: false,
      error: "File required",
    };
  }

  if (
    !ACCEPTED_IMAGE_TYPES.includes(
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
    file.size > MAX_FILE_SIZE
  ) {
    return {
      success: false,
      error:
        "Max file size is 5MB",
    };
  }

  return {
    success: true,
  };
}