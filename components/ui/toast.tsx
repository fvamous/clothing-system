// components/ui/toast.tsx

"use client";

import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
};

export default function Toast({
  message,
  type = "success",
}: ToastProps) {
  return (
    <div
      className={`
        fixed bottom-5 right-5 z-50
        flex items-center gap-3
        rounded-2xl
        border px-5 py-4
        shadow-2xl
        backdrop-blur-xl
        animate-in fade-in slide-in-from-bottom-4
        ${
          type === "success"
            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
            : "border-red-500/20 bg-red-500/10 text-red-400"
        }
      `}
    >
      {type === "success" ? (
        <CheckCircle2 className="h-5 w-5" />
      ) : (
        <XCircle className="h-5 w-5" />
      )}

      <p className="text-sm font-medium">
        {message}
      </p>
    </div>
  );
}