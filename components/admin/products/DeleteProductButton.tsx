"use client";

import { useState } from "react";

export default function DeleteProductButton({
  productId,
}: {
  productId: string;
}) {
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    type: "info" as "info" | "confirm",
    message: "",
  });

  // =========================
  // DELETE ACTION
  // =========================
  async function deleteProduct() {
    setLoading(true);

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      let data: any = null;

      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        setModal({
          open: true,
          type: "info",
          message: data?.error || "Delete failed",
        });
        return;
      }

      setModal({
        open: true,
        type: "info",
        message: "Deleted successfully",
      });
    } catch {
      setModal({
        open: true,
        type: "info",
        message: "Network error",
      });
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // HANDLE CLICK DELETE
  // =========================
  function handleDelete() {
    if (typeof productId !== "number") {
      setModal({
        open: true,
        type: "info",
        message: "Invalid product ID",
      });
      return;
    }

    // 🔥 OPEN CONFIRM MODAL
    setModal({
      open: true,
      type: "confirm",
      message: "Yakin mau hapus product ini?",
    });
  }

  // =========================
  // CONFIRM ACTION
  // =========================
  function handleConfirm() {
    setModal((prev) => ({ ...prev, open: false }));
    deleteProduct();
  }

  return (
    <>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "..." : "Delete"}
      </button>

      {modal.open && (
        <div style={styles.overlay}>
          <div
            style={{
              ...styles.modal,
              borderTop:
                modal.type === "confirm"
                  ? "4px solid #2563eb" // 🔵 blue confirm
                  : "4px solid #111",
            }}
          >
            <p>{modal.message}</p>

            {/* =========================
                CONFIRM MODAL
            ========================= */}
            {modal.type === "confirm" ? (
              <div style={styles.row}>
                <button
                  onClick={() =>
                    setModal({ open: false, type: "info", message: "" })
                  }
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirm}
                  style={styles.confirmBtn}
                >
                  Delete
                </button>
              </div>
            ) : (
              <button
                onClick={() =>
                  setModal({ open: false, type: "info", message: "" })
                }
                style={styles.closeBtn}
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// =========================
// STYLES
// =========================
const styles: Record<string, React.CSSProperties> = {
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
    width: 320,
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 10,
  },

  cancelBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },

  confirmBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },

  closeBtn: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },
};