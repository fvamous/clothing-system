"use client";

type Props = {
  open: boolean;

  title: string;

  description?: string;

  confirmText?: string;

  cancelText?: string;

  onClose: () => void;

  onConfirm?: () => void;
};

export default function BlurModal({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Close",
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background:
            "rgba(0,0,0,0.45)",
          backdropFilter:
            "blur(8px)",
          zIndex: 999,
        }}
      />

      {/* MODAL */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform:
            "translate(-50%, -50%)",

          width: 380,

          background:
            "rgba(255,255,255,0.95)",

          backdropFilter:
            "blur(12px)",

          borderRadius: 20,

          padding: 24,

          zIndex: 1000,

          boxShadow:
            "0 10px 40px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
          }}
        >
          {title}
        </h2>

        {description && (
          <p
            style={{
              color: "#666",
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent:
              "flex-end",

            gap: 10,

            marginTop: 24,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding:
                "10px 14px",
              borderRadius: 10,
              border:
                "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            {cancelText}
          </button>

          {onConfirm && (
            <button
              onClick={onConfirm}
              style={{
                padding:
                  "10px 14px",

                borderRadius: 10,

                border: "none",

                background: "#111",

                color: "#fff",

                cursor: "pointer",
              }}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </>
  );
}