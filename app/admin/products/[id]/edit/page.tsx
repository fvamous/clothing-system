"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [submitting, setSubmitting] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    message: "",
  });

  // =========================
  // FETCH PRODUCT
  // =========================
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (ignore) return;

        setName(data?.name ?? "");
        setPrice(data?.price?.toString() ?? "");

        // 🔥 FIX: always safe string
        setPreview(data?.imageUrl || "");
      } catch {
        if (!ignore) {
          setModal({
            open: true,
            message: "Failed to load product",
          });
        }
      }
    }

    if (id) load();

    return () => {
      ignore = true;
    };
  }, [id]);

  // =========================
  // FILE HANDLER
  // =========================
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(f);
    setPreview(url);
  }

  // =========================
  // UPLOAD
  // =========================
  async function uploadFile(file: File) {
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    const interval = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 10 : p));
    }, 120);

    try {
      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Upload failed");
      }

      return data.url;
    } finally {
      clearInterval(interval);
      setProgress(100);
      setUploading(false);
    }
  }

  // =========================
  // SUBMIT
  // =========================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);

    try {
      let imageUrl = preview || ""; // safe fallback

      if (file) {
        imageUrl = await uploadFile(file);
      }

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price) || 0,
          imageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setModal({
          open: true,
          message: data?.error || "Update failed",
        });
        return;
      }

      router.push("/admin/products");
    } catch {
      setModal({
        open: true,
        message: "Unexpected error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1>Edit Product</h1>

        {/* IMAGE */}
        {preview && (
          <img
            src={preview}
            style={styles.image}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/placeholder.png";
            }}
          />
        )}

        {/* PROGRESS */}
        {uploading && (
          <div style={styles.progressWrap}>
            <div
              style={{
                ...styles.progressBar,
                width: `${progress}%`,
              }}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            style={styles.input}
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
            style={styles.input}
          />

          <input type="file" accept="image/*" onChange={handleFile} />

          <button disabled={uploading || submitting} style={styles.button}>
            {submitting ? "Saving..." : uploading ? "Uploading..." : "Save"}
          </button>
        </form>
      </div>

      {/* MODAL */}
      {modal.open && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <p>{modal.message}</p>
            <button
              onClick={() => setModal({ open: false, message: "" })}
              style={styles.modalBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    maxWidth: 520,
    background: "#fff",
    padding: 20,
    borderRadius: 14,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  image: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    borderRadius: 10,
    marginBottom: 12,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  button: {
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },

  progressWrap: {
    height: 6,
    background: "#eee",
    borderRadius: 999,
    marginBottom: 10,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    background: "#111",
    transition: "width 0.2s ease",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(6px)",
    zIndex: 9999,
  },

  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 320,
  },

  modalBtn: {
    marginTop: 12,
    padding: 10,
    border: "none",
    borderRadius: 8,
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },
};