"use client";

import { createContext, useContext, useState } from "react";

type Toast = {
  message: string;
  type?: "success" | "error";
};

const ToastContext = createContext<any>(null);

export function ToastProvider({ children }: any) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (msg: string, type: Toast["type"] = "success") => {
    setToast({ message: msg, type });

    setTimeout(() => setToast(null), 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div style={styles.toast}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

const styles: Record<string, React.CSSProperties> = {
  toast: {
    position: "fixed",
    bottom: 20,
    right: 20,
    background: "#111",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 10,
    zIndex: 9999,
  },
};