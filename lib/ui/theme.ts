export type AppTheme = "light" | "dark";

export function resolveTheme(
  theme?: string
): AppTheme {
  if (theme === "light") {
    return "light";
  }

  return "dark";
}

export function isDarkTheme(
  theme?: string
) {
  return resolveTheme(theme) === "dark";
}