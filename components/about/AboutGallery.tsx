"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type LookbookItem = {
  id: string;
  imageUrl: string;
};

type LookbookResponse =
  | LookbookItem[]
  | {
      data?: LookbookItem[];
    };

export default function AboutGallery() {
  const [items, setItems] = useState<LookbookItem[]>([]);

  // ✅ hydration safe
  const [mounted, setMounted] = useState(false);

  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    fetch("/api/lookbook")
      .then((res) => res.json())
      .then((payload: LookbookResponse) => {
        const nextItems = Array.isArray(payload)
          ? payload
          : payload.data;

        setItems(
          Array.isArray(nextItems)
            ? nextItems
            : []
        );
      })
      .catch(() => setItems([]));
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <section
      style={{
        ...styles.wrapper,

        // ✅ DARK BACKGROUND
        background: isDark
          ? "linear-gradient(to bottom, #020617, #0f172a)"
          : "transparent",

        borderRadius: isDark ? 40 : 0,

        padding: isDark
          ? "60px 24px"
          : "0 16px",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{
          ...styles.title,
          color: isDark ? "#fff" : "#111",
        }}
      >
        LOOKBOOK
      </motion.h2>

      <div style={styles.grid}>
        {items.map((item) => (
          <GalleryItem
            key={item.id}
            src={item.imageUrl}
            isDark={isDark}
          />
        ))}
      </div>
    </section>
  );
}

function GalleryItem({
  src,
  isDark,
}: {
  src: string;
  isDark: boolean;
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -4,
      }}
      transition={{
        duration: 0.3,
      }}
      style={{
        ...styles.item,

        background: isDark
          ? "rgba(15,23,42,0.7)"
          : "#eee",

        border: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "none",

        boxShadow: isDark
          ? "0 10px 40px rgba(0,0,0,0.35)"
          : "none",
      }}
    >
      <Image
        src={src}
        alt="lookbook"
        fill
        style={styles.image}
      />
    </motion.div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    marginTop: 100,
    textAlign: "center",
  },

  title: {
    fontSize: 20,
    letterSpacing: 4,
    fontWeight: 600,
    marginBottom: 30,
  },

  // ✅ EDITORIAL GRID
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 12,

    maxWidth: 900,
    margin: "0 auto",
  },

  item: {
    position: "relative",

    width: "100%",
    paddingTop: "140%",

    borderRadius: 18,
    overflow: "hidden",

    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
  },

  image: {
    objectFit: "cover",
  },
};
