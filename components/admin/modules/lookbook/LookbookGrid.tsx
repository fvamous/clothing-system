"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import SmartImage from "@/components/ui/SmartImage";

type Lookbook = {
  id: string;
  title?: string;
  imageUrl: string;
  caption?: string;
  alt?: string;
  category?: string;
  isActive: boolean;
};

export default function LookbookGrid() {
  const [items, setItems] = useState<Lookbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme =
    theme === "system"
      ? systemTheme
      : theme;

  const isDark = currentTheme === "dark";

  async function fetchLookbook() {
    try {
      const res = await fetch("/api/lookbook");
      const data = await res.json();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLookbook();
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <p
        style={{
          color: isDark ? "#cbd5e1" : "#666",
        }}
      >
        Loading lookbook...
      </p>
    );
  }

  if (!items.length) {
    return (
      <p
        style={{
          color: isDark ? "#cbd5e1" : "#666",
        }}
      >
        No lookbook found
      </p>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            borderRadius: 12,
            overflow: "hidden",

            background: isDark
              ? "rgba(15,23,42,0.72)"
              : "#fff",

            border: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid #eee",

            boxShadow: isDark
              ? "0 10px 30px rgba(0,0,0,0.35)"
              : "0 4px 12px rgba(0,0,0,0.05)",

            backdropFilter: isDark
              ? "blur(18px)"
              : undefined,
          }}
        >
          <SmartImage
            src={item.imageUrl}
            alt={
              item.alt ||
              item.title ||
              "lookbook"
            }
            className="w-full h-[220px] object-cover"
          />

          <div style={{ padding: 12 }}>
            <h4
              style={{
                margin: 0,
                color: isDark
                  ? "#fff"
                  : "#111",
              }}
            >
              {item.title || "Untitled"}
            </h4>

            {item.caption && (
              <p
                style={{
                  fontSize: 12,
                  color: isDark
                    ? "#94a3b8"
                    : "#666",
                }}
              >
                {item.caption}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}