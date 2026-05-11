"use client";

import { motion } from "framer-motion";

import AdminSidebar from "@/components/admin/core/AdminSidebar";
import AdminTopNav from "@/components/admin/core/AdminTopNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={styles.page}>
      {/* BACKGROUND GLOW */}
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />

      {/* SIDEBAR */}
      <motion.div
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.45,
        }}
        style={styles.sidebarWrap}
      >
        <AdminSidebar />
      </motion.div>

      {/* RIGHT */}
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          delay: 0.1,
        }}
        style={styles.right}
      >
        {/* TOP NAV */}
        <AdminTopNav />

        {/* MAIN */}
        <main style={styles.main}>
          <div style={styles.contentCard}>
            {children}
          </div>
        </main>
      </motion.div>
    </div>
  );
}

const styles: Record<
  string,
  React.CSSProperties
> = {
  page: {
    position: "relative",

    minHeight: "100vh",

    display: "flex",

    background:
      "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",

    overflow: "hidden",

    color: "var(--foreground)",
  },

  bgGlow1: {
    position: "fixed",

    top: -120,
    right: -120,

    width: 300,
    height: 300,

    borderRadius: "50%",

    background:
      "rgba(59,130,246,0.14)",

    filter: "blur(90px)",

    pointerEvents: "none",
  },

  bgGlow2: {
    position: "fixed",

    bottom: -140,
    left: -120,

    width: 320,
    height: 320,

    borderRadius: "50%",

    background:
      "rgba(168,85,247,0.14)",

    filter: "blur(90px)",

    pointerEvents: "none",
  },

  sidebarWrap: {
    position: "relative",

    zIndex: 20,

    padding: 16,

    display: "flex",
  },

  right: {
    flex: 1,

    display: "flex",
    flexDirection: "column",

    minWidth: 0,

    padding: "16px 16px 16px 0",
  },

  main: {
    flex: 1,

    paddingTop: 16,

    display: "flex",
    flexDirection: "column",
  },

  contentCard: {
    flex: 1,

    borderRadius: 32,

    padding: 24,

    background:
      "rgba(255,255,255,0.72)",

    border:
      "1px solid rgba(255,255,255,0.7)",

    backdropFilter: "blur(20px)",

    boxShadow:
      "0 20px 60px rgba(15,23,42,0.06)",

    overflow: "hidden",
  },
};

/* =========================
   DARK MODE
========================= */

if (typeof document !== "undefined") {
  const dark =
    document.documentElement.classList.contains(
      "dark"
    );

  if (dark) {
    styles.page.background =
      "linear-gradient(180deg, #020617 0%, #0f172a 100%)";

    styles.bgGlow1.background =
      "rgba(59,130,246,0.18)";

    styles.bgGlow2.background =
      "rgba(168,85,247,0.18)";

    styles.contentCard.background =
      "rgba(15,23,42,0.72)";

    styles.contentCard.border =
      "1px solid rgba(255,255,255,0.08)";

    styles.contentCard.boxShadow =
      "0 20px 60px rgba(0,0,0,0.45)";
  }
}