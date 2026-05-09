"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type LookbookItem = {
  id: string;
  imageUrl: string;
};

export default function AboutGallery() {
  const [items, setItems] = useState<LookbookItem[]>([]);

  useEffect(() => {
    fetch("/api/lookbook")
      .then((res) => res.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  return (
    <section style={styles.wrapper}>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={styles.title}
      >
        LOOKBOOK
      </motion.h2>

      <div style={styles.grid}>
        {items.map((item) => (
          <GalleryItem key={item.id} src={item.imageUrl} />
        ))}
      </div>
    </section>
  );
}

function GalleryItem({ src }: { src: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      style={styles.item}
    >
      <Image src={src} alt="lookbook" fill style={styles.image} />
    </motion.div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    marginTop: 100,
    padding: "0 16px",
    textAlign: "center",
  },

  title: {
    fontSize: 20,
    letterSpacing: 4,
    fontWeight: 600,
    marginBottom: 30,
  },

  // 🔥 FIX GRID: lebih kecil, rapi, aesthetic editorial
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 10,
    maxWidth: 900,
    margin: "0 auto",
  },

  item: {
    position: "relative",
    width: "100%",
    paddingTop: "140%", // portrait ratio lebih slim
    borderRadius: 14,
    overflow: "hidden",
    background: "#eee",
  },

  image: {
    objectFit: "cover",
  },
};