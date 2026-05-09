"use client";

import { motion } from "framer-motion";

export default function AboutStory() {
  return (
    <section style={styles.wrapper}>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={styles.text}
      >
        Inspired by global fashion houses, EV Store focuses on clean aesthetics,
        minimal design, and premium digital shopping experience.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        style={styles.text}
      >
        Built to compete with modern brands like Zara, COS, and Acne Studios,
        we bring fashion closer to digital-first generation.
      </motion.p>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    maxWidth: 700,
    margin: "80px auto",
    textAlign: "center",
  },

  text: {
    fontSize: 16,
    lineHeight: 1.8,
    color: "#444",
    marginBottom: 20,
  },
};