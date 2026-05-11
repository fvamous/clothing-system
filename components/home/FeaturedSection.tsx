"use client";

import { motion } from "framer-motion";

export default function FeaturedSection({
  isDark,
}: {
  isDark: boolean;
}) {
  const products = [
    "Hoodie Premium",
    "T-Shirt Basic",
    "Jacket Streetwear",
    "Cargo Pants",
  ];

  return (
    <section style={{ marginTop: 80 }}>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          textAlign: "center",
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 20,
          color: isDark ? "#fff" : "#111",
        }}
      >
        Featured Products
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(200px,1fr))",
          gap: 16,
        }}
      >
        {products.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            style={{
              padding: 18,
              borderRadius: 18,
              backdropFilter: "blur(16px)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.06)",
              background: isDark
                ? "rgba(15,23,42,0.5)"
                : "rgba(255,255,255,0.7)",
              color: isDark ? "#fff" : "#111",
            }}
          >
            👕 {item}
          </motion.div>
        ))}
      </div>
    </section>
  );
}