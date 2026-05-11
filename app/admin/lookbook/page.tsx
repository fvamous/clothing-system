"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import {
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type LookbookItem = {
  id: string;
  imageUrl: string;
};

export default function AdminLookbook() {
  const [items, setItems] = useState<LookbookItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [mounted, setMounted] = useState(false);

  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme =
    theme === "system"
      ? systemTheme
      : theme;

  const isDark = currentTheme === "dark";

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    fetch("/api/lookbook")
      .then((res) => res.json())
      .then(setItems);
  }, []);

  // =========================
  // FILE HANDLER
  // =========================
  function handleFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected = e.target.files?.[0];

    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Only image allowed");
      return;
    }

    setFile(selected);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(selected);
  }

  // =========================
  // UPLOAD LOOKBOOK
  // =========================
  async function handleUpload() {
    if (!file) {
      setError("Please select image");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch("/api/lookbook", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error || "Upload failed"
        );
      }

      setItems((prev) => [data, ...prev]);

      setSuccess(true);
      setFile(null);
      setPreview("");

      setTimeout(
        () => setSuccess(false),
        1500
      );
    } catch (err: any) {
      setError(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  }

  if (!mounted) return null;

  // =========================
  // UI
  // =========================
  return (
    <main
      className="min-h-screen p-6"
      style={{
        background: isDark
          ? "linear-gradient(180deg,#020617 0%,#0f172a 100%)"
          : undefined,
      }}
    >
      <div className="mx-auto max-w-5xl space-y-6">

        {/* HEADER */}
        <Card
          className="border shadow-xl"
          style={{
            background: isDark
              ? "rgba(15,23,42,0.72)"
              : undefined,

            borderColor: isDark
              ? "rgba(255,255,255,0.08)"
              : undefined,

            backdropFilter: isDark
              ? "blur(24px)"
              : undefined,

            color: isDark
              ? "#fff"
              : undefined,
          }}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Lookbook CMS
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* ERROR */}
            {error && (
              <div
                className="flex items-center gap-2 rounded-2xl p-3 text-sm"
                style={{
                  background: isDark
                    ? "rgba(127,29,29,0.35)"
                    : "#fef2f2",

                  border: isDark
                    ? "1px solid rgba(248,113,113,0.25)"
                    : "1px solid #fecaca",

                  color: isDark
                    ? "#fca5a5"
                    : "#dc2626",
                }}
              >
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            {/* UPLOAD AREA */}
            <label
              className="block cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed transition"
              style={{
                borderColor: isDark
                  ? "rgba(255,255,255,0.12)"
                  : undefined,

                background: isDark
                  ? "rgba(255,255,255,0.03)"
                  : undefined,
              }}
            >
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFile}
              />

              {preview ? (
                <Image
                  src={preview}
                  alt="preview"
                  width={1200}
                  height={700}
                  className="h-[320px] w-full object-cover"
                />
              ) : (
                <div
                  className="flex h-[320px] flex-col items-center justify-center gap-3"
                  style={{
                    color: isDark
                      ? "#94a3b8"
                      : undefined,
                  }}
                >
                  <Upload className="h-10 w-10" />
                  <p>Upload Lookbook Image</p>
                </div>
              )}
            </label>

            {/* BUTTON */}
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="h-12 w-full"
              style={{
                background: isDark
                  ? "linear-gradient(135deg,#1e293b,#0f172a)"
                  : undefined,

                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : undefined,

                color: "#fff",
              }}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload Image"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative h-[220px] overflow-hidden rounded-2xl shadow"
              style={{
                background: isDark
                  ? "rgba(15,23,42,0.65)"
                  : "#f3f4f6",

                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : undefined,
              }}
            >
              <Image
                src={item.imageUrl}
                alt="lookbook"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* SUCCESS MODAL */}
        {success && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: isDark
                ? "rgba(0,0,0,0.65)"
                : "rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="rounded-3xl p-8 text-center shadow-xl"
              style={{
                background: isDark
                  ? "rgba(15,23,42,0.92)"
                  : "#fff",

                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : undefined,

                color: isDark
                  ? "#fff"
                  : "#111",

                backdropFilter: isDark
                  ? "blur(24px)"
                  : undefined,
              }}
            >
              <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-500" />

              <h3 className="text-lg font-bold">
                Uploaded
              </h3>

              <p
                className="text-sm"
                style={{
                  color: isDark
                    ? "#94a3b8"
                    : undefined,
                }}
              >
                Lookbook image added
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}