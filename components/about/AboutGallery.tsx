"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutGallery() {
  return (
    <section style={styles.wrapper}>
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={styles.title}
      >
        LOOKBOOK
      </motion.h2>

      <div style={styles.grid}>
        <GalleryItem src="/look1.jpg" />
        <GalleryItem src="/look2.jpg" />
        <GalleryItem src="/look3.jpg" />
        <GalleryItem src="/look4.jpg" />
        <GalleryItem src="/look5.jpg" />
        <GalleryItem src="/look6.jpg" />
      </div>
    </section>
  );
}

/* =========================
   GALLERY ITEM
========================= */

function GalleryItem({ src }: { src: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      style={styles.item}
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

/* =========================
   STYLES (EDITORIAL FASHION GRID)
========================= */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    marginTop: 120,
    padding: "0 20px",
    textAlign: "center",
  },

  title: {
    fontSize: 26,
    letterSpacing: 3,
    fontWeight: 600,
    marginBottom: 40,
    color: "#111",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
    maxWidth: 1000,
    margin: "0 auto",
  },

  item: {
    position: "relative",
    width: "100%",
    paddingTop: "130%", // portrait fashion ratio

    borderRadius: 18,
    overflow: "hidden",

    background: "rgba(255,255,255,0.4)",
    backdropFilter: "blur(16px)",

    border: "1px solid rgba(255,154,158,0.15)",

    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    cursor: "pointer",
  },

  image: {
    objectFit: "cover",
  },
};