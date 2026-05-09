"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
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
        throw new Error(data?.error || "Upload failed");
      }

      setItems((prev) => [data, ...prev]);

      setSuccess(true);
      setFile(null);
      setPreview("");

      setTimeout(() => setSuccess(false), 1500);
    } catch (err: any) {
      setError(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  }

  // =========================
  // UI
  // =========================
  return (
    <main className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* HEADER */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Lookbook CMS
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* ERROR */}
            {error && (
              <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            {/* UPLOAD AREA */}
            <label className="block cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed border-border bg-background transition hover:border-black">
              <input type="file" hidden accept="image/*" onChange={handleFile} />

              {preview ? (
                <Image
                  src={preview}
                  alt="preview"
                  width={1200}
                  height={700}
                  className="h-[320px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[320px] flex-col items-center justify-center gap-3 text-muted-foreground">
                  <Upload className="h-10 w-10" />
                  <p>Upload Lookbook Image</p>
                </div>
              )}
            </label>

            {/* BUTTON */}
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full h-12"
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative h-[220px] overflow-hidden rounded-2xl bg-gray-100 shadow"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
              <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-600" />
              <h3 className="text-lg font-bold">Uploaded</h3>
              <p className="text-sm text-muted-foreground">
                Lookbook image added
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}