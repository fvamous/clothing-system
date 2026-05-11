"use client";

import React, { useState } from "react";

import Image from "next/image";

import { useRouter } from "next/navigation";

import {
  Loader2,
  Sparkles,
  Save,
  Upload,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import useProtected from "@/hooks/useProtected";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import Input from "@/components/ui/input";

import Textarea from "@/components/ui/textarea";

export default function NewProductPage() {
  useProtected();

  const router = useRouter();

  // =========================
  // FORM STATE
  // =========================
  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [color, setColor] =
    useState("");

  const [material, setMaterial] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [preview, setPreview] =
    useState("");

  // =========================
  // UI STATE
  // =========================
  const [saving, setSaving] =
    useState(false);

  const [generating, setGenerating] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  // =========================
  // AI IMAGE ANALYZE
  // =========================
  async function handleAnalyzeImage(
    imageBase64: string
  ) {
    try {
      setGenerating(true);

      setError("");

      const res = await fetch(
        "/api/ai/vision-product",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            image: imageBase64,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "AI image analyze failed"
        );
      }

      const data = await res.json();

      let parsed: any = null;

      try {
        parsed =
          typeof data.result ===
          "string"
            ? JSON.parse(
                data.result
              )
            : data.result;
      } catch {
        return;
      }

      if (parsed?.name) {
        setName(parsed.name);
      }

      if (parsed?.category) {
        setCategory(
          parsed.category
        );
      }

      if (parsed?.color) {
        setColor(parsed.color);
      }

      if (parsed?.material) {
        setMaterial(
          parsed.material
        );
      }

      if (
        !description &&
        parsed?.description
      ) {
        setDescription(
          parsed.description
        );
      }
    } catch (error: any) {
      setError(
        error.message ||
          "AI error"
      );
    } finally {
      setGenerating(false);
    }
  }

  // =========================
  // FILE HANDLER
  // =========================
  function handleFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected =
      e.target.files?.[0];

    if (!selected) return;

    if (
      !selected.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Only image allowed"
      );

      return;
    }

    const reader =
      new FileReader();

    reader.onload = async () => {
      const result =
        reader.result as string;

      setPreview(result);

      await handleAnalyzeImage(
        result
      );
    };

    reader.readAsDataURL(
      selected
    );
  }

  // =========================
  // GENERATE DESCRIPTION
  // =========================
  async function handleGenerateAI() {
    try {
      setGenerating(true);

      setError("");

      if (!name) {
        setError(
          "Product name required"
        );

        return;
      }

      const res = await fetch(
        "/api/ai/generate-description",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            category,
            color,
            material,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed generate description"
        );
      }

      const data = await res.json();

      setDescription(
        typeof data.result ===
          "string"
          ? data.result
          : JSON.stringify(
              data.result
            )
      );
    } catch (error: any) {
      setError(
        error.message ||
          "AI error"
      );
    } finally {
      setGenerating(false);
    }
  }

  // =========================
  // SUBMIT PRODUCT
  // =========================
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!name || !price) {
      setError(
        "Name and price required"
      );

      return;
    }

    try {
      setSaving(true);

      setError("");

      const res = await fetch(
        "/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            price:
              Number(price),
            stock:
              Number(stock) || 0,
            category,
            color,
            material,
            description,
            imageUrl: preview,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error ||
            "Failed save product"
        );
      }

      setSuccess(true);

      setTimeout(() => {
        router.push(
          "/admin/products"
        );

        router.refresh();
      }, 1400);
    } catch (error: any) {
      setError(
        error.message ||
          "Failed save"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
  <main className="min-h-screen bg-gray-100 p-6 dark:bg-[#020617] transition-colors">
    <div className="mx-auto max-w-5xl">
      <Card
        className="
          overflow-hidden
          border-0
          shadow-2xl
          bg-white
          dark:bg-zinc-900
          dark:border
          dark:border-white/10
        "
      >
        <CardHeader className="border-b dark:border-white/10">
          <CardTitle className="text-2xl font-bold dark:text-white">
            Create Product
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* ERROR */}
          {error && (
            <div
              className="
                flex items-center gap-2 rounded-2xl
                border border-red-200
                bg-red-50
                p-4 text-sm text-red-600

                dark:border-red-500/20
                dark:bg-red-500/10
                dark:text-red-300
              "
            >
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {/* IMAGE */}
          <label
            className="
              block cursor-pointer overflow-hidden
              rounded-3xl border-2 border-dashed
              border-border bg-background
              transition hover:border-black

              dark:border-white/10
              dark:bg-zinc-950
              dark:hover:border-white/30
            "
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
                alt="Product preview"
                width={1200}
                height={700}
                className="h-[320px] w-full object-cover"
              />
            ) : (
              <div
                className="
                  flex h-[320px] flex-col
                  items-center justify-center
                  gap-3 text-muted-foreground

                  dark:text-zinc-400
                "
              >
                <Upload className="h-10 w-10" />
                <p>Upload product image</p>
              </div>
            )}
          </label>

          {/* AI INFO */}
          {generating && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-zinc-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              AI processing...
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-zinc-200">
                  Product Name
                </label>

                <Input
                  value={name}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) =>
                    setName(e.target.value)
                  }
                  placeholder="Oversized Hoodie"
                  className="
                    dark:border-white/10
                    dark:bg-zinc-950
                    dark:text-white
                    dark:placeholder:text-zinc-500
                  "
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-zinc-200">
                  Category
                </label>

                <Input
                  value={category}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) =>
                    setCategory(e.target.value)
                  }
                  placeholder="Hoodie"
                  className="
                    dark:border-white/10
                    dark:bg-zinc-950
                    dark:text-white
                    dark:placeholder:text-zinc-500
                  "
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-zinc-200">
                  Color
                </label>

                <Input
                  value={color}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) =>
                    setColor(e.target.value)
                  }
                  placeholder="Black"
                  className="
                    dark:border-white/10
                    dark:bg-zinc-950
                    dark:text-white
                    dark:placeholder:text-zinc-500
                  "
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-zinc-200">
                  Material
                </label>

                <Input
                  value={material}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) =>
                    setMaterial(e.target.value)
                  }
                  placeholder="Cotton Fleece"
                  className="
                    dark:border-white/10
                    dark:bg-zinc-950
                    dark:text-white
                    dark:placeholder:text-zinc-500
                  "
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-zinc-200">
                  Stock
                </label>

                <Input
                  type="number"
                  value={stock}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) =>
                    setStock(e.target.value)
                  }
                  placeholder="100"
                  className="
                    dark:border-white/10
                    dark:bg-zinc-950
                    dark:text-white
                    dark:placeholder:text-zinc-500
                  "
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-zinc-200">
                  Price
                </label>

                <Input
                  type="number"
                  value={price}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) =>
                    setPrice(e.target.value)
                  }
                  placeholder="250000"
                  className="
                    dark:border-white/10
                    dark:bg-zinc-950
                    dark:text-white
                    dark:placeholder:text-zinc-500
                  "
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-zinc-200">
                Description
              </label>

              <Textarea
                value={description}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement>
                ) =>
                  setDescription(e.target.value)
                }
                placeholder="Premium streetwear hoodie..."
                className="
                  min-h-[140px]

                  dark:border-white/10
                  dark:bg-zinc-950
                  dark:text-white
                  dark:placeholder:text-zinc-500
                "
              />
            </div>

            {/* AI BUTTON */}
            <Button
              type="button"
              onClick={handleGenerateAI}
              disabled={generating}
              variant="outline"
              className="
                w-full

                dark:border-white/10
                dark:bg-zinc-900
                dark:text-white
                dark:hover:bg-zinc-800
              "
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Description
                </>
              )}
            </Button>

            {/* SUBMIT */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={saving || generating}
                className="
                  h-12 px-8

                  dark:bg-white
                  dark:text-black
                  dark:hover:bg-zinc-200
                "
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Product
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>

    {/* SUCCESS */}
    {success && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div
          className="
            w-full max-w-sm rounded-3xl
            bg-background p-8 text-center
            shadow-2xl

            dark:bg-zinc-900
            dark:border
            dark:border-white/10
          "
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>

          <h3 className="text-xl font-bold dark:text-white">
            Product Saved
          </h3>

          <p className="mt-2 text-sm text-muted-foreground dark:text-zinc-400">
            Product successfully created
          </p>
        </div>
      </div>
    )}
  </main>
)}