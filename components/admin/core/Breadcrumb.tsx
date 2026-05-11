"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export default function Breadcrumb() {
  const pathname = usePathname();

  const { theme, systemTheme } =
    useTheme();

  const currentTheme =
    theme === "system"
      ? systemTheme
      : theme;

  const isDark =
    currentTheme === "dark";

  const parts = pathname
    .split("/")
    .filter(Boolean);

  return (
    <div
      style={{
        ...styles.wrap,
        color: isDark
          ? "#94a3b8"
          : "#64748b",
      }}
    >
      {parts.map((p, i) => (
        <span key={i}>
          <span
            style={{
              color:
                i ===
                parts.length - 1
                  ? isDark
                    ? "#fff"
                    : "#0f172a"
                  : undefined,

              fontWeight:
                i ===
                parts.length - 1
                  ? 600
                  : 400,

              textTransform:
                "capitalize",
            }}
          >
            {p}
          </span>

          {i <
            parts.length - 1 && (
            <span
              style={{
                margin:
                  "0 8px",
                opacity: 0.5,
              }}
            >
              /
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

const styles: Record<
  string,
  React.CSSProperties
> = {
  wrap: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",

    fontSize: 13,

    marginBottom: 12,

    transition:
      "color .25s ease",
  },
};