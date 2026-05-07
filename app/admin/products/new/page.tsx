"use client";

import React, { useState } from "react";
import useProtected from "@/lib/useProtected";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  useProtected();

  const router = useRouter();

  // =========================
  // FORM STATE
  // =========================
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // AI IMAGE ANALYZE
  // =========================
  async function handleAnalyzeImage(imageBase64: string) {
    try {
      setGenerating(true);
      setError("");

      const res = await fetch("/api/ai/vision-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      });

      if (!res.ok) throw new Error("AI image analyze failed");

      const data = await res.json();

      let parsed: any = null;

      try {
        parsed =
          typeof data.result === "string"
            ? JSON.parse(data.result)
            : data.result;
      } catch {
        return;
      }

      if (parsed?.name) setName(parsed.name);
      if (parsed?.category) setCategory(parsed.category);
      if (parsed?.color) setColor(parsed.color);
      if (parsed?.material) setMaterial(parsed.material);

      if (!description && parsed?.description) {
        setDescription(parsed.description);
      }
    } catch (err: any) {
      setError(err.message || "AI error");
    } finally {
      setGenerating(false);
    }
  }

  // =========================
  // FILE HANDLER
  // =========================
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      setError("Only image allowed");
      return;
    }

    setFile(f);

    const reader = new FileReader();

    reader.onload = async () => {
      const result = reader.result as string;
      setPreview(result);
      await handleAnalyzeImage(result);
    };

    reader.readAsDataURL(f);
  }

  // =========================
  // GENERATE DESCRIPTION
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

      if (!res.ok) throw new Error("Failed generate description");

      const data = await res.json();

      setDescription(
        typeof data.result === "string"
          ? data.result
          : JSON.stringify(data.result)
      );
    } catch (err: any) {
      setError(err.message || "AI error");
    } finally {
      setGenerating(false);
    }
  }

  // =========================
  // SUBMIT PRODUCT
  // =========================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !price) {
      setError("Name and price required");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          stock: Number(stock),
          category,
          color,
          material,
          description,
          imageUrl: preview,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Failed save product");

      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "Failed save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Product</h1>

        {error && <div style={styles.error}>{error}</div>}

        {/* IMAGE */}
        <label style={styles.uploadBox}>
          <input type="file" hidden onChange={handleFile} />

          {preview ? (
            <img src={preview} style={styles.preview} />
          ) : (
            <div style={styles.placeholder}>Upload image</div>
          )}
        </label>

        {generating && <p style={styles.info}>AI processing...</p>}

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={styles.input} />
            <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" style={styles.input} />
            <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" style={styles.input} />
            <input value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="Material" style={styles.input} />
            <input value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" type="number" style={styles.input} />
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" style={styles.input} />
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            style={styles.textarea}
          />

          <button type="button" onClick={handleGenerateAI} style={styles.aiBtn}>
            Generate Description
          </button>

          <button disabled={saving || generating} style={styles.button}>
            {saving ? "Saving..." : "Save Product"}
          </button>
        </form>
      </div>
    </main>
  );
}

/* =========================
   SHOPIFY-STYLE MODAL UI
========================= */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    background: "#f4f6f8",
  },

  card: {
    width: "100%",
    maxWidth: 680,
    background: "#fff",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: 700,
  },

  error: {
    background: "#ffe5e5",
    padding: 10,
    borderRadius: 10,
  },

  uploadBox: {
    border: "2px dashed #ddd",
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer",
  },

  preview: {
    width: "100%",
    height: 260,
    objectFit: "cover",
  },

  placeholder: {
    padding: 50,
    textAlign: "center",
    color: "#888",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },

  input: {
    padding: 12,
    borderRadius: 12,
    border: "1px solid #ddd",
  },

  textarea: {
    minHeight: 120,
    padding: 12,
    borderRadius: 12,
    border: "1px solid #ddd",
  },

  aiBtn: {
    padding: 10,
    borderRadius: 12,
    border: "1px solid #ccc",
    background: "#f8f8f8",
    cursor: "pointer",
  },

  button: {
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },

  info: {
    fontSize: 13,
    color: "#666",
  },
};