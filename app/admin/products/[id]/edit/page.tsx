"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  Loader2,
  Save,
  Upload,
  XCircle,
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import Input from "@/components/ui/input";

import Textarea from "@/components/ui/textarea";

export default function EditProductPage() {
  const router = useRouter();

  const params = useParams();

  const id = params.id as string;

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

  const [file, setFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [submitting, setSubmitting] =
    useState(false);

  const [errorModal, setErrorModal] =
    useState({
      open: false,
      message: "",
    });

  const [successModal, setSuccessModal] =
    useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadProduct() {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/products/${id}`
        );

        const data = await res.json();

        if (ignore) return;

        if (!res.ok) {
          throw new Error(
            data?.error ||
              "Failed load product"
          );
        }

        setName(data?.name || "");

        setPrice(
          String(data?.price || "")
        );

        setCategory(
          data?.categoryId || ""
        );

        setColor(data?.color || "");

        setMaterial(
          data?.material || ""
        );

        setStock(
          String(data?.stock || 0)
        );

        setDescription(
          data?.description || ""
        );

        setPreview(
          data?.imageUrl || ""
        );
      } catch (error: any) {
        if (!ignore) {
          setErrorModal({
            open: true,
            message:
              error.message ||
              "Failed load product",
          });
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    if (id) {
      loadProduct();
    }

    return () => {
      ignore = true;
    };
  }, [id]);

  function handleFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected =
      e.target.files?.[0];

    if (!selected) return;

    setFile(selected);

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPreview(
      URL.createObjectURL(selected)
    );
  }

  async function uploadFile(
    image: File
  ) {
    setUploading(true);

    setProgress(0);

    const formData = new FormData();

    formData.append("file", image);

    const interval = setInterval(() => {
      setProgress((prev) =>
        prev < 90 ? prev + 10 : prev
      );
    }, 120);

    try {
      const res = await fetch(
        "/api/uploads",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error ||
            "Upload failed"
        );
      }

      return data.url;
    } finally {
      clearInterval(interval);

      setProgress(100);

      setUploading(false);
    }
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (submitting) return;

    try {
      setSubmitting(true);

      let imageUrl = preview;

      if (file) {
        imageUrl = await uploadFile(
          file
        );
      }

      const res = await fetch(
        `/api/products/${id}`,
        {
          method: "PUT",
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
            imageUrl,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error ||
            "Update failed"
        );
      }

      setSuccessModal(true);

      setTimeout(() => {
        setSuccessModal(false);

        router.push(
          "/admin/products"
        );

        router.refresh();
      }, 1400);
    } catch (error: any) {
      setErrorModal({
        open: true,
        message:
          error.message ||
          "Unexpected error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-black dark:bg-[#020617] dark:text-white">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-zinc-900 dark:bg-[#020617] dark:text-zinc-100">
      <div className="mx-auto max-w-5xl">
        <Card className="overflow-hidden border border-zinc-200 bg-white dark:border-white/10 dark:bg-[#0f172a]">
          <CardHeader className="border-b border-zinc-200 dark:border-white/10">
            <CardTitle>
              Edit Product
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-gray-100 dark:border-white/10 dark:bg-white/5">
              {preview ? (
                <Image
                  src={preview}
                  alt={name || "Product"}
                  width={1200}
                  height={700}
                  className="h-[320px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[320px] items-center justify-center text-gray-400 dark:text-zinc-500">
                  No Image
                </div>
              )}
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    Uploading image...
                  </span>

                  <span>
                    {progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-black transition-all dark:bg-white"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Product Name
                  </label>

                  <Input
                    value={name}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) =>
                      setName(
                        e.target.value
                      )
                    }
                    placeholder="Oversized Hoodie"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Category
                  </label>

                  <Input
                    value={category}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) =>
                      setCategory(
                        e.target.value
                      )
                    }
                    placeholder="Hoodie"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Color
                  </label>

                  <Input
                    value={color}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) =>
                      setColor(
                        e.target.value
                      )
                    }
                    placeholder="Black"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Material
                  </label>

                  <Input
                    value={material}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) =>
                      setMaterial(
                        e.target.value
                      )
                    }
                    placeholder="Cotton Fleece"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Stock
                  </label>

                  <Input
                    type="number"
                    value={stock}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) =>
                      setStock(
                        e.target.value
                      )
                    }
                    placeholder="100"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Price
                  </label>

                  <Input
                    type="number"
                    value={price}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) =>
                      setPrice(
                        e.target.value
                      )
                    }
                    placeholder="250000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Description
                </label>

                <Textarea
                  value={description}
                  onChange={(
                    e: React.ChangeEvent<HTMLTextAreaElement>
                  ) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  placeholder="Premium streetwear hoodie..."
                  className="min-h-[140px]"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Product Image
                </label>

                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-3xl border border-dashed border-zinc-300 p-6 transition hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5">
                  <Upload className="h-5 w-5" />

                  <span>
                    Upload New Image
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={
                    uploading ||
                    submitting
                  }
                  className="h-12 px-8"
                >
                  {submitting ? (
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

      {errorModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:border dark:border-white/10 dark:bg-[#0f172a]">
            <div className="mb-4 flex items-center gap-2 text-red-500">
              <XCircle className="h-5 w-5" />

              <h3 className="font-semibold">
                Error
              </h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-zinc-300">
              {errorModal.message}
            </p>

            <Button
              className="mt-5 w-full"
              onClick={() =>
                setErrorModal({
                  open: false,
                  message: "",
                })
              }
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl dark:border dark:border-white/10 dark:bg-[#0f172a]">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />

            <h3 className="text-xl font-bold">
              Success
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
              Product updated successfully
            </p>
          </div>
        </div>
      )}
    </main>
  );
}