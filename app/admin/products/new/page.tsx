"use client";

import { useState } from "react";

import Image from "next/image";

import { useRouter } from "next/navigation";

import {
  Loader2,
  Sparkles,
  Save,
  Upload,
  AlertCircle,
  CheckCircle2,
  Wand2,
  Package2,
  Shirt,
  Palette,
  Boxes,
} from "lucide-react";

import { useProtected } from "@/hooks/auth/useProtected";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import Input from "@/components/ui/input";

import Textarea from "@/components/ui/textarea";

type AIAnalyzeResult = {
  name?: string;
  category?: string;
  color?: string;
  material?: string;
  description?: string;
};

export default function NewProductPage() {
  useProtected();

  const router = useRouter();

  // =========================
  // FORM
  // =========================

  const [name, setName] =
    useState<string>("");

  const [price, setPrice] =
    useState<string>("");

  const [category, setCategory] =
    useState<string>("");

  const [color, setColor] =
    useState<string>("");

  const [material, setMaterial] =
    useState<string>("");

  const [stock, setStock] =
    useState<string>("");

  const [description, setDescription] =
    useState<string>("");

  const [preview, setPreview] =
    useState<string>("");

  // =========================
  // UI STATE
  // =========================

  const [saving, setSaving] =
    useState<boolean>(false);

  const [generating, setGenerating] =
    useState<boolean>(false);

  const [error, setError] =
    useState<string>("");

  const [success, setSuccess] =
    useState<boolean>(false);

  // =========================
  // AI ANALYZE
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
          "AI analyze failed"
        );
      }

      const data = await res.json();

      let parsed: AIAnalyzeResult | null =
        null;

      try {
        parsed =
          typeof data.result ===
          "string"
            ? JSON.parse(
                data.result
              )
            : data.result;
      } catch {
        parsed = null;
      }

      if (!parsed) return;

      if (parsed.name) {
        setName(parsed.name);
      }

      if (parsed.category) {
        setCategory(
          parsed.category
        );
      }

      if (parsed.color) {
        setColor(parsed.color);
      }

      if (parsed.material) {
        setMaterial(
          parsed.material
        );
      }

      if (
        !description &&
        parsed.description
      ) {
        setDescription(
          parsed.description
        );
      }
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "AI error"
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
  // AI DESCRIPTION
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
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "AI error"
      );
    } finally {
      setGenerating(false);
    }
  }

  // =========================
  // SUBMIT
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
              Number(price) || 0,

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
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed save"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            left-[-140px]
            top-[-140px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-fuchsia-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-180px]
            right-[-120px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Card
          className="
            overflow-hidden
            rounded-[40px]
            border
            border-slate-200/70
            bg-white/72
            shadow-[0_30px_120px_rgba(15,23,42,0.10)]
            backdrop-blur-3xl

            dark:border-white/10
            dark:bg-[#020617]/72
            dark:shadow-[0_30px_120px_rgba(0,0,0,0.55)]
          "
        >
          {/* HEADER */}
          <CardHeader
            className="
              border-b
              border-slate-200/70
              px-8
              py-7

              dark:border-white/10
            "
          >
            <div
              className="
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-[24px]
                    bg-black
                    text-white
                    shadow-xl

                    dark:bg-white
                    dark:text-black
                  "
                >
                  <Sparkles className="h-6 w-6" />
                </div>

                <div>
                  <CardTitle
                    className="
                      text-3xl
                      font-black
                      tracking-tight
                      text-zinc-900

                      dark:text-white
                    "
                  >
                    Create Product
                  </CardTitle>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-zinc-500

                      dark:text-zinc-400
                    "
                  >
                    AI assisted premium catalog management
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white/80
                    px-4
                    py-2
                    text-sm
                    text-zinc-700
                    backdrop-blur-xl

                    dark:border-white/10
                    dark:bg-white/[0.04]
                    dark:text-zinc-300
                  "
                >
                  <Package2 className="h-4 w-4" />
                  Smart Inventory
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white/80
                    px-4
                    py-2
                    text-sm
                    text-zinc-700
                    backdrop-blur-xl

                    dark:border-white/10
                    dark:bg-white/[0.04]
                    dark:text-zinc-300
                  "
                >
                  <Wand2 className="h-4 w-4" />
                  AI Generated
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {/* ERROR */}
            {error && (
              <div
                className="
                  mb-8
                  flex
                  items-center
                  gap-3
                  rounded-[28px]
                  border
                  border-red-500/20
                  bg-red-500/10
                  p-4
                  text-sm
                  text-red-500
                "
              >
                <AlertCircle className="h-5 w-5 shrink-0" />

                <span>{error}</span>
              </div>
            )}

            <div
              className="
                grid
                gap-8
                xl:grid-cols-[520px_1fr]
              "
            >
              {/* LEFT */}
              <div className="space-y-6">
                {/* IMAGE */}
                <label
                  className="
                    group
                    block
                    cursor-pointer
                    overflow-hidden
                    rounded-[36px]
                    border
                    border-dashed
                    border-zinc-300
                    bg-zinc-50
                    transition-all
                    duration-300
                    hover:border-black

                    dark:border-white/10
                    dark:bg-white/[0.03]
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
                    <div className="relative">
                      <Image
                        src={preview}
                        alt="preview"
                        width={1600}
                        height={900}
                        className="
                          h-[500px]
                          w-full
                          object-cover
                        "
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/50
                          via-black/10
                          to-transparent
                        "
                      />

                      <div
                        className="
                          absolute
                          bottom-5
                          left-5
                          rounded-2xl
                          border
                          border-white/10
                          bg-black/40
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-white
                          backdrop-blur-xl
                        "
                      >
                        AI Ready Image
                      </div>
                    </div>
                  ) : (
                    <div
                      className="
                        flex
                        h-[500px]
                        flex-col
                        items-center
                        justify-center
                        gap-5
                        px-10
                        text-center
                      "
                    >
                      <div
                        className="
                          flex
                          h-24
                          w-24
                          items-center
                          justify-center
                          rounded-[32px]
                          bg-black
                          text-white
                          shadow-2xl

                          dark:bg-white
                          dark:text-black
                        "
                      >
                        <Upload className="h-10 w-10" />
                      </div>

                      <div className="space-y-2">
                        <h3
                          className="
                            text-2xl
                            font-black
                            text-zinc-900

                            dark:text-white
                          "
                        >
                          Upload Product Image
                        </h3>

                        <p
                          className="
                            mx-auto
                            max-w-sm
                            text-sm
                            leading-relaxed
                            text-zinc-500

                            dark:text-zinc-400
                          "
                        >
                          AI automatically detects category,
                          color, material, and generates
                          product descriptions.
                        </p>
                      </div>
                    </div>
                  )}
                </label>

                {/* AI STATUS */}
                {generating && (
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-[28px]
                      border
                      border-slate-200/70
                      bg-white/80
                      px-5
                      py-4
                      backdrop-blur-xl

                      dark:border-white/10
                      dark:bg-white/[0.03]
                    "
                  >
                    <Loader2 className="h-5 w-5 animate-spin" />

                    <div>
                      <p
                        className="
                          text-sm
                          font-semibold
                          text-zinc-900

                          dark:text-white
                        "
                      >
                        AI Processing Product
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-zinc-500

                          dark:text-zinc-400
                        "
                      >
                        Analyzing fashion attributes...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT */}
              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* GRID */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-zinc-700

                        dark:text-zinc-300
                      "
                    >
                      <Shirt className="h-4 w-4" />
                      Product Name
                    </label>

                    <Input
                      value={name}
                      onChange={(e) =>
                        setName(
                          e.target.value
                        )
                      }
                      placeholder="Oversized Hoodie"
                      className="
                        h-14
                        rounded-2xl
                        border-slate-200/70
                        bg-white/80

                        dark:border-white/10
                        dark:bg-white/[0.03]
                      "
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-zinc-700

                        dark:text-zinc-300
                      "
                    >
                      <Boxes className="h-4 w-4" />
                      Category
                    </label>

                    <Input
                      value={category}
                      onChange={(e) =>
                        setCategory(
                          e.target.value
                        )
                      }
                      placeholder="Streetwear"
                      className="
                        h-14
                        rounded-2xl
                        border-slate-200/70
                        bg-white/80

                        dark:border-white/10
                        dark:bg-white/[0.03]
                      "
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-zinc-700

                        dark:text-zinc-300
                      "
                    >
                      <Palette className="h-4 w-4" />
                      Color
                    </label>

                    <Input
                      value={color}
                      onChange={(e) =>
                        setColor(
                          e.target.value
                        )
                      }
                      placeholder="Black"
                      className="
                        h-14
                        rounded-2xl
                        border-slate-200/70
                        bg-white/80

                        dark:border-white/10
                        dark:bg-white/[0.03]
                      "
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="
                        text-sm
                        font-semibold
                        text-zinc-700

                        dark:text-zinc-300
                      "
                    >
                      Material
                    </label>

                    <Input
                      value={material}
                      onChange={(e) =>
                        setMaterial(
                          e.target.value
                        )
                      }
                      placeholder="Cotton Fleece"
                      className="
                        h-14
                        rounded-2xl
                        border-slate-200/70
                        bg-white/80

                        dark:border-white/10
                        dark:bg-white/[0.03]
                      "
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="
                        text-sm
                        font-semibold
                        text-zinc-700

                        dark:text-zinc-300
                      "
                    >
                      Stock
                    </label>

                    <Input
                      type="number"
                      value={stock}
                      onChange={(e) =>
                        setStock(
                          e.target.value
                        )
                      }
                      placeholder="100"
                      className="
                        h-14
                        rounded-2xl
                        border-slate-200/70
                        bg-white/80

                        dark:border-white/10
                        dark:bg-white/[0.03]
                      "
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="
                        text-sm
                        font-semibold
                        text-zinc-700

                        dark:text-zinc-300
                      "
                    >
                      Price
                    </label>

                    <Input
                      type="number"
                      value={price}
                      onChange={(e) =>
                        setPrice(
                          e.target.value
                        )
                      }
                      placeholder="250000"
                      className="
                        h-14
                        rounded-2xl
                        border-slate-200/70
                        bg-white/80

                        dark:border-white/10
                        dark:bg-white/[0.03]
                      "
                    />
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-3">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <label
                      className="
                        text-sm
                        font-semibold
                        text-zinc-700

                        dark:text-zinc-300
                      "
                    >
                      Description
                    </label>

                    <button
                      type="button"
                      onClick={
                        handleGenerateAI
                      }
                      disabled={generating}
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white/80
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-zinc-700
                        transition-all
                        hover:scale-[1.02]

                        dark:border-white/10
                        dark:bg-white/[0.03]
                        dark:text-zinc-300
                      "
                    >
                      {generating ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Generating
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-3.5 w-3.5" />
                          AI Generate
                        </>
                      )}
                    </button>
                  </div>

                  <Textarea
                    value={description}
                    onChange={(e) =>
                      setDescription(
                        e.target.value
                      )
                    }
                    placeholder="Premium streetwear hoodie..."
                    className="
                      min-h-[220px]
                      rounded-[28px]
                      border-slate-200/70
                      bg-white/80
                      p-5

                      dark:border-white/10
                      dark:bg-white/[0.03]
                    "
                  />
                </div>

                {/* ACTION */}
                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    pt-2
                    sm:flex-row
                    sm:justify-end
                  "
                >
                  <Button
                    type="submit"
                    disabled={
                      saving ||
                      generating
                    }
                    className="
                      h-14
                      rounded-2xl
                      px-8
                      text-sm
                      font-bold
                    "
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                        Saving Product...
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SUCCESS */}
      {success && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            p-4
            backdrop-blur-md
          "
        >
          <div
            className="
              w-full
              max-w-sm
              rounded-[36px]
              border
              border-white/10
              bg-white/92
              p-8
              text-center
              shadow-2xl
              backdrop-blur-3xl

              dark:bg-[#020617]/92
            "
          >
            <div
              className="
                mx-auto
                mb-5
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-green-500/10
              "
            >
              <CheckCircle2
                className="
                  h-10
                  w-10
                  text-green-500
                "
              />
            </div>

            <h3
              className="
                text-2xl
                font-black
                text-zinc-900

                dark:text-white
              "
            >
              Product Saved
            </h3>

            <p
              className="
                mt-2
                text-sm
                text-zinc-500

                dark:text-zinc-400
              "
            >
              Product successfully created
            </p>
          </div>
        </div>
      )}
    </section>
  );
}