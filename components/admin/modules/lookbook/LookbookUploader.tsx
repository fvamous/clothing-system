"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function LookbookUploader() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
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

  async function handleUpload() {
    if (!image) return alert("Image required");

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("caption", caption);
      formData.append("file", image);

      const res = await fetch("/api/lookbook", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      setTitle("");
      setCaption("");
      setImage(null);

      alert("Upload success");
    } catch (err) {
      console.error(err);
      alert("Upload error");
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        maxWidth: 400,

        padding: 18,
        borderRadius: 20,

        background: isDark
          ? "rgba(15,23,42,0.72)"
          : "#fff",

        border: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid #e5e7eb",

        boxShadow: isDark
          ? "0 20px 50px rgba(0,0,0,0.35)"
          : "0 10px 30px rgba(0,0,0,0.06)",

        backdropFilter: isDark
          ? "blur(20px)"
          : undefined,
      }}
    >
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: 12,
          borderRadius: 10,

          background: isDark
            ? "rgba(255,255,255,0.04)"
            : "#fff",

          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid #d1d5db",

          color: isDark ? "#fff" : "#111",

          outline: "none",
        }}
      />

      <input
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        style={{
          padding: 12,
          borderRadius: 10,

          background: isDark
            ? "rgba(255,255,255,0.04)"
            : "#fff",

          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid #d1d5db",

          color: isDark ? "#fff" : "#111",

          outline: "none",
        }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImage(e.target.files?.[0] || null)
        }
        style={{
          padding: 10,
          borderRadius: 10,

          background: isDark
            ? "rgba(255,255,255,0.03)"
            : "#fff",

          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid #d1d5db",

          color: isDark ? "#cbd5e1" : "#111",
        }}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          padding: 12,
          borderRadius: 12,
          border: "none",

          background: isDark
            ? "linear-gradient(135deg,#1e293b,#0f172a)"
            : "black",

          color: "white",

          fontWeight: 600,
          cursor: "pointer",

          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading
          ? "Uploading..."
          : "Upload Lookbook"}
      </button>
    </div>
  );
}