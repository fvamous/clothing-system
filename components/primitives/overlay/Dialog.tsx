"use client";

import Modal from "./Modal";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Dialog({
  open,
  onClose,
  title,
  children,
}: DialogProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4">
        {title && (
          <h3 className="text-lg font-semibold">
            {title}
          </h3>
        )}

        {children}
      </div>
    </Modal>
  );
}