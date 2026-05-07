"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

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

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // =========================
  // MODALS
  // =========================
  const [modal, setModal] = useState({
    open: false,
    message: "",
  });

  const [successModal, setSuccessModal] = useState(false);

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

        if (!res.ok) {
          throw new Error(data?.error || "Failed load product");
        }

        setName(data?.name || "");
        setPrice(String(data?.price || ""));
        setCategory(data?.categoryId || "");
        setColor(data?.color || "");
        setMaterial(data?.material || "");
        setStock(String(data?.stock || 0));
        setDescription(data?.description || "");
        setPreview(data?.imageUrl || "");
      } catch (err: any) {
        if (!ignore) {
          setModal({
            open: true,
            message: err.message || "Failed to load product",
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

    setPreview(URL.createObjectURL(f));
  }

  // =========================
  // UPLOAD IMAGE
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
  // SUBMIT UPDATE
  // =========================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (submitting) return;
    setSubmitting(true);

    try {
      let imageUrl = preview;

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
          stock: Number(stock) || 0,
          category,
          color,
          material,
          description,
          imageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Update failed");
      }

      // =========================
      // SUCCESS POPUP
      // =========================
      setSuccessModal(true);

      setTimeout(() => {
        setSuccessModal(false);
        router.push("/admin/products");
        router.refresh();
      }, 1200);

    } catch (err: any) {
      setModal({
        open: true,
        message: err.message || "Unexpected error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.modal}>
        <h1 style={styles.title}>Edit Product</h1>

        {preview && <img src={preview} style={styles.preview} />}

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
          <div style={styles.grid}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" style={styles.input} />
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

          <input type="file" accept="image/*" onChange={handleFile} />

          <button disabled={uploading || submitting} style={styles.button}>
            {submitting ? "Saving..." : uploading ? "Uploading..." : "Save Product"}
          </button>
        </form>
      </div>

      {/* ERROR MODAL */}
      {modal.open && (
        <div style={styles.overlay}>
          <div style={styles.modalBox}>
            <p>{modal.message}</p>
            <button onClick={() => setModal({ open: false, message: "" })} style={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {successModal && (
        <div style={styles.successOverlay}>
          <div style={styles.successBox}>
            <div style={{ fontSize: 40 }}>✅</div>
            <p style={{ fontWeight: 600 }}>Produk berhasil disimpan</p>
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================
   STYLES
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

  modal: {
    width: "100%",
    maxWidth: 640,
    background: "#fff",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: 700,
  },

  preview: {
    width: "100%",
    height: 260,
    objectFit: "cover",
    borderRadius: 16,
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

  button: {
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },

  progressWrap: {
    height: 6,
    background: "#eee",
    borderRadius: 999,
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
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 320,
  },

  closeBtn: {
    marginTop: 12,
    padding: 10,
    border: "none",
    borderRadius: 8,
    background: "#111",
    color: "#fff",
  },

  // ✅ FIXED HERE (INI YANG SEBELUMNYA ERROR)
  successOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  successBox: {
    background: "#fff",
    padding: 24,
    borderRadius: 16,
    textAlign: "center",
    width: 260,
  },
};