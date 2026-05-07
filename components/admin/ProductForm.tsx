"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  initial?: {
    id?: string;
    name?: string;
    price?: number;
    stock?: number;
    category?: string;
    color?: string;
    material?: string;
    description?: string;
    imageUrl?: string;
  };
  mode: "create" | "edit";
};

export default function ProductForm({ initial, mode }: Props) {
  const router = useRouter();

  // BASIC
  const [name, setName] = useState(initial?.name || "");
  const [price, setPrice] = useState(String(initial?.price || ""));
  const [stock, setStock] = useState(String(initial?.stock || 0));

  // AI FIELDS
  const [category, setCategory] = useState(initial?.category || "");
  const [color, setColor] = useState(initial?.color || "");
  const [material, setMaterial] = useState(initial?.material || "");
  const [description, setDescription] = useState(initial?.description || "");

  // IMAGE
  const [preview, setPreview] = useState(initial?.imageUrl || "");
  const [file, setFile] = useState<File | null>(null);

  // STATE
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // FILE HANDLER
  // =========================
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(f);
  }

  // =========================
  // AI DESCRIPTION
  // =========================
  async function handleGenerateAI() {
    try {
      setGenerating(true);

      const res = await fetch("/api/ai/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, color, material }),
      });

      const data = await res.json();

      setDescription(data.result || "");
    } finally {
      setGenerating(false);
    }
  }

  // =========================
  // SUBMIT
  // =========================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      setSaving(true);

      const url =
        mode === "create"
          ? "/api/products"
          : `/api/products/${initial?.id}`;

      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
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

      if (!res.ok) throw new Error("Failed");

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
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

      {/* INPUT GRID */}
      <div style={styles.grid}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={styles.input} />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" style={styles.input} />
        <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" style={styles.input} />
        <input value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="Material" style={styles.input} />
        <input value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" type="number" style={styles.input} />
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" style={styles.input} />
      </div>

      {/* AI */}
      <button type="button" onClick={handleGenerateAI} disabled={generating} style={styles.aiBtn}>
        ✨ Generate Description
      </button>

      <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={styles.textarea} />

      <button disabled={saving} style={styles.saveBtn}>
        {saving ? "Saving..." : mode === "create" ? "Save Product" : "Update Product"}
      </button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: { display: "flex", flexDirection: "column", gap: 12 },
  uploadBox: { border: "2px dashed #ddd", padding: 10, cursor: "pointer" },
  preview: { width: "100%", height: 200, objectFit: "cover" },
  placeholder: { padding: 30, textAlign: "center" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  input: { padding: 10, border: "1px solid #ddd" },
  textarea: { minHeight: 120, padding: 10 },
  aiBtn: { padding: 10, border: "1px solid #ddd" },
  saveBtn: { padding: 12, background: "#111", color: "#fff" },
  error: { color: "red" },
};