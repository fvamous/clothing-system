"use client";

import { useEffect, useState } from "react";
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

  if (loading) {
    return <p>Loading lookbook...</p>;
  }

  if (!items.length) {
    return <p>No lookbook found</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #eee",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <SmartImage
            src={item.imageUrl}
            alt={item.alt || item.title || "lookbook"}
            className="w-full h-[220px] object-cover"
          />

          <div style={{ padding: 12 }}>
            <h4 style={{ margin: 0 }}>{item.title || "Untitled"}</h4>
            {item.caption && (
              <p style={{ fontSize: 12, color: "#666" }}>
                {item.caption}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}