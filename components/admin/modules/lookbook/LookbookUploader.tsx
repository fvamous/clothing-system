"use client";

import { useState } from "react";

export default function LookbookUploader() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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

      if (!res.ok) throw new Error("Upload failed");

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        maxWidth: 400,
      }}
    >
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImage(e.target.files?.[0] || null)
        }
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          padding: 10,
          background: "black",
          color: "white",
          borderRadius: 8,
        }}
      >
        {loading ? "Uploading..." : "Upload Lookbook"}
      </button>
    </div>
  );
}