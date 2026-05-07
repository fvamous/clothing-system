"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
} from "react";

type ToastType = "success" | "error";

type Toast = {
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (msg: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string, type: ToastType = "success") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToast({ message: msg, type });

    timeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div style={styles.overlay}>
          <div
            style={{
              ...styles.toast,
              ...(toast.type === "error"
                ? styles.error
                : styles.success),
            }}
          >
            <div style={styles.icon}>
              {toast.type === "success" ? "✓" : "!"}
            </div>

            <div style={styles.message}>{toast.message}</div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return ctx;
}
const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
    background: "rgba(0,0,0,0.25)",
    backdropFilter: "blur(8px)",
  },

  toast: {
    display: "flex",
    alignItems: "center",
    gap: 12,

    padding: "14px 18px",
    borderRadius: 16,

    minWidth: 240,
    maxWidth: "90vw",

    color: "#fff",

    background: "rgba(17,17,17,0.65)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.12)",

    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",

    animation: "toastPop 0.25s ease",
  },

  success: {
    borderLeft: "4px solid #22c55e",
  },

  error: {
    borderLeft: "4px solid #ef4444",
  },

  icon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    background: "rgba(255,255,255,0.1)",
  },

  message: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.3,
  },
};