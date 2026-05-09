"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";

type LookbookItem = {
  id: string;
  imageUrl: string;
};

type Styles = {
  wrapper: React.CSSProperties;
  title: React.CSSProperties;
  button: React.CSSProperties;
  grid: React.CSSProperties;
  card: React.CSSProperties;
  image: React.CSSProperties;
};

export default function AdminLookbook() {
  const [items, setItems] = useState<LookbookItem[]>([]);

  useEffect(() => {
    fetch("/api/lookbook")
      .then((res) => res.json())
      .then(setItems);
  }, []);

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Lookbook CMS</h1>

      <button style={styles.button}>+ Upload Image</button>

      <div style={styles.grid}>
        {items.map((item) => (
          <div key={item.id} style={styles.card}>
            <Image
              src={item.imageUrl}
              alt="lookbook image"
              fill
              style={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Styles = {
  wrapper: {
    padding: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 16,
  },

  button: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "#111",
    color: "#fff",
    marginBottom: 20,
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 14,
  },

  card: {
    position: "relative",
    height: 220,
    borderRadius: 16,
    overflow: "hidden",
    background: "#f5f5f5",
  },

  image: {
    objectFit: "cover",
  },
};