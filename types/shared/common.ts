// shared/common.ts

export function formatPrice(
  value: number
) {
  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }
  ).format(value);
}

export function formatNumber(
  value: number
) {
  return new Intl.NumberFormat(
    "id-ID"
  ).format(value);
}

export function sleep(ms: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

export function clamp(
  value: number,
  min: number,
  max: number
) {
  return Math.min(
    Math.max(value, min),
    max
  );
}

export function generateSlug(
  value: string
) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function truncateText(
  value: string,
  length = 120
) {
  if (value.length <= length) {
    return value;
  }

  return `${value.slice(0, length)}...`;
}

export function getInitials(
  value: string
) {
  return value
    .split(" ")
    .map((v) => v[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function randomId(
  length = 10
) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(
      Math.floor(
        Math.random() * chars.length
      )
    );
  }

  return result;
}

export function isImageUrl(
  url: string
) {
  return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(
    url
  );
}

export function safeJsonParse<T>(
  value: string
): T | null {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export const APP_NAME =
  "Clothing System";

export const APP_DESCRIPTION =
  "Premium fashion commerce platform";

export const DEFAULT_CURRENCY =
  "IDR";

export const DEFAULT_LOCALE =
  "id-ID";

export const PAGINATION_LIMIT = 12;

export const MAX_FILE_SIZE =
  5 * 1024 * 1024;