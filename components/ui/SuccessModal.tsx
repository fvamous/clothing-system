"use client";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
};

export default function SuccessModal({
  open,
  title,
  description,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background:
            "rgba(0,0,0,0.4)",
          backdropFilter:
            "blur(8px)",
          zIndex: 999,
        }}
      />

      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform:
            "translate(-50%, -50%)",
          background: "white",
          padding: 24,
          borderRadius: 16,
          width: 340,
          zIndex: 1000,
        }}
      >
        <h2>{title}</h2>

        {description && (
          <p>{description}</p>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: 16,
          }}
        >
          OK
        </button>
      </div>
    </>
  );
}