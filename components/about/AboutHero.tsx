"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section style={styles.hero}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={styles.logoBox}
      >
        <Image
          src="/logo.jpeg"
          alt="Brand Logo"
          width={140}
          height={140}
          style={styles.logo}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.title}
      >
        EV STORE
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={styles.subtitle}
      >
        Modern fashion for the new generation.
      </motion.p>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    textAlign: "center",
    paddingTop: 80,
  },

  logoBox: {
    width: 180,
    height: 180,
    borderRadius: "50%",
    margin: "0 auto",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(18px)",

    border: "1px solid rgba(255,154,158,0.25)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
  },

  logo: {
    borderRadius: "50%",
  },

  title: {
    marginTop: 24,
    fontSize: 42,
    fontWeight: 700,
    letterSpacing: 2,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
};