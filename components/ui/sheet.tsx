// components/ui/sheet.tsx

"use client";

type SheetProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Sheet({
  open,
  onClose,
  children,
}: SheetProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40
          bg-black/50
          backdrop-blur-sm
          transition-all duration-300
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      <div
        className={`
          fixed right-0 top-0 z-50
          h-screen w-full max-w-md
          border-l border-white/10
          bg-zinc-950
          p-5
          transition-transform duration-300
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {children}
      </div>
    </>
  );
}