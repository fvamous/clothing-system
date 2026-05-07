"use client";

import React, { useState } from "react";
import useProtected from "@/lib/useProtected";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  useProtected();

  const router = useRouter();

  // BASIC
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // AI FIELDS
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  // IMAGE
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // STATES
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // AI IMAGE ANALYZE (FIXED SAFE VERSION)
  // =========================
  async function handleAnalyzeImage(imageBase64: string) {
    try {
      setGenerating(true);
      setError("");

      if (!imageBase64) return;

      const res = await fetch("/api/ai/vision-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      });

      if (!res.ok) {
        throw new Error("AI image analyze failed");
      }

      const data = await res.json();

      // ✅ SAFE PARSE (anti crash JSON / markdown)
      let parsed: any = null;

      try {
        parsed =
          typeof data.result === "string"
            ? JSON.parse(data.result)
            : data.result;
      } catch (e) {
        console.warn("AI returned invalid JSON:", data.result);
        return;
      }

      // optional safe assign (tidak overwrite kalau kosong)
      if (parsed?.name) setName(parsed.name);
      if (parsed?.category) setCategory(parsed.category);
      if (parsed?.color) setColor(parsed.color);
      if (parsed?.material) setMaterial(parsed.material);

      // description hanya isi kalau masih kosong
      if (!description && parsed?.description) {
        setDescription(parsed.description);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "AI error");
    } finally {
      setGenerating(false);
    }
  }

  // =========================
  // HANDLE FILE (TIDAK DIUBAH LOGIC UI)
  // =========================
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      setError("Only image files allowed");
      return;
    }

    setFile(f);

    const reader = new FileReader();

    reader.onload = async () => {
      const result = reader.result as string;
      setPreview(result);

      // AI analyze tetap jalan tapi sekarang sudah safe
      await handleAnalyzeImage(result);
    };

    reader.readAsDataURL(f);
  }

  // =========================
  // AI DESCRIPTION (SAFE VERSION)
  // =========================
  async function handleGenerateAI() {
    try {
      setGenerating(true);
      setError("");

      if (!name) {
        setError("Product name required");
        return;
      }

      const res = await fetch("/api/ai/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          color,
          material,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate description");
      }

      const data = await res.json();

      // safe set (anti undefined / object crash)
      if (typeof data.result === "string") {
        setDescription(data.result);
      } else {
        setDescription(JSON.stringify(data.result));
      }
    } catch (err: any) {
      setError(err.message || "AI error");
    } finally {
      setGenerating(false);
    }
  }

  // =========================
  // SUBMIT (TIDAK DIUBAH)
  // =========================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name || !price) {
      setError("Name and price required");
      return;
    }

    try {
      setSaving(true);

      // TODO: API save product
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h1 style={styles.title}>Create Product</h1>
          <p style={styles.subtitle}>
            Add product details or generate from AI image analysis
          </p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* IMAGE UPLOAD */}
          <label style={styles.uploadBox}>
            <input type="file" hidden onChange={handleFile} />

            {preview ? (
              <img src={preview} style={styles.preview} />
            ) : (
              <div style={styles.placeholder}>📷 Upload product image</div>
            )}
          </label>

          {generating && (
            <div style={styles.info}>🤖 AI analyzing image...</div>
          )}

          {/* INPUT GRID */}
          <div style={styles.grid}>
            <input
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />

            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.input}
            />

            <input
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={styles.input}
            />

            <input
              placeholder="Material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              style={styles.input}
            />

            <input
              placeholder="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              style={styles.input}
            />

            <input
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* AI BUTTON */}
          <div style={styles.aiRow}>
            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={generating}
              style={styles.aiButton}
            >
              ✨ Generate Description
            </button>
          </div>

          <textarea
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />

          <button
            type="submit"
            disabled={saving || generating}
            style={styles.button}
          >
            {saving ? "Saving..." : "Save Product"}
          </button>
        </form>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    background: "#f4f6f8",
  },
  modal: {
    width: "100%",
    maxWidth: 640,
    background: "#fff",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
  },
  header: { marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 700 },
  subtitle: { fontSize: 13, color: "#666" },

  form: { display: "flex", flexDirection: "column", gap: 14 },

  uploadBox: {
    border: "2px dashed #ddd",
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer",
  },

  preview: { width: "100%", height: 260, objectFit: "cover" },

  placeholder: { padding: 40, textAlign: "center", color: "#888" },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },

  input: {
    padding: 12,
    border: "1px solid #e5e5e5",
    borderRadius: 12,
  },

  textarea: {
    minHeight: 140,
    padding: 12,
    border: "1px solid #e5e5e5",
    borderRadius: 12,
  },

  aiRow: { display: "flex", justifyContent: "flex-end" },

  aiButton: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "#f9f9f9",
    cursor: "pointer",
  },

  button: {
    padding: 14,
    borderRadius: 14,
    background: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  error: {
    background: "#ffe5e5",
    color: "#c00",
    padding: 10,
    borderRadius: 10,
  },

  info: { fontSize: 13, color: "#666" },
};