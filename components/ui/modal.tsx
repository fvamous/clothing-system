// components/ui/modal.tsx

"use client";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({
  open,
  onClose,
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60
        p-4
        backdrop-blur-md
      "
      onClick={onClose}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          w-full max-w-lg
          rounded-3xl
          border border-white/10
          bg-zinc-900
          p-6
        "
      >
        {children}
      </div>
    </div>
  );
}