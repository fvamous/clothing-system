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
  ArrowLeft,
  ImagePlus,
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

type ProductResponse = {
  id?: string;

  name?: string;

  slug?: string;

  price?: number;

  categoryId?: string;

  color?: string;

  material?: string;

  stock?: number;

  description?: string;

  imageUrl?: string;

  error?: string;
};

export default function EditProductPage() {
  const router = useRouter();

  const params = useParams();

  const id = String(params.id);

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

  /*
  -----------------------------------
  load product
  -----------------------------------
  */

  useEffect(() => {
    let ignore = false;

    async function loadProduct() {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/products/${id}`
        );

        const data: ProductResponse =
          await res.json();

        if (ignore) return;

        if (!res.ok) {
          throw new Error(
            data.error ||
              "Failed load product"
          );
        }

        setName(data.name || "");

        setPrice(
          String(data.price || 0)
        );

        setCategory(
          data.categoryId || ""
        );

        setColor(data.color || "");

        setMaterial(
          data.material || ""
        );

        setStock(
          String(data.stock || 0)
        );

        setDescription(
          data.description || ""
        );

        setPreview(
          data.imageUrl || ""
        );
      } catch (error: unknown) {
        if (!ignore) {
          setErrorModal({
            open: true,

            message:
              error instanceof Error
                ? error.message
                : "Failed load product",
          });
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      ignore = true;
    };
  }, [id]);

  /*
  -----------------------------------
  cleanup preview
  -----------------------------------
  */

  useEffect(() => {
    return () => {
      if (
        preview &&
        preview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /*
  -----------------------------------
  file handler
  -----------------------------------
  */

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
      setErrorModal({
        open: true,

        message:
          "Only image files allowed",
      });

      return;
    }

    setFile(selected);

    if (
      preview &&
      preview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(preview);
    }

    setPreview(
      URL.createObjectURL(selected)
    );
  }

  /*
  -----------------------------------
  upload image
  -----------------------------------
  */

  async function uploadFile(
    image: File
  ): Promise<string> {
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

      const data: {
        url?: string;

        error?: string;
      } = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Upload failed"
        );
      }

      return data.url || "";
    } finally {
      clearInterval(interval);

      setProgress(100);

      setUploading(false);
    }
  }

  /*
  -----------------------------------
  submit
  -----------------------------------
  */

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (submitting) return;

    try {
      setSubmitting(true);

      let imageUrl = preview;

      if (file) {
        imageUrl =
          await uploadFile(file);
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

            categoryId: category,

            color,

            material,

            description,

            imageUrl,
          }),
        }
      );

      const data: {
        error?: string;
      } = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
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
      }, 1500);
    } catch (error: unknown) {
      setErrorModal({
        open: true,

        message:
          error instanceof Error
            ? error.message
            : "Unexpected error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  /*
  -----------------------------------
  loading
  -----------------------------------
  */

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[500px]
          items-center
          justify-center
        "
      >
        <Loader2
          className="
            h-10
            w-10
            animate-spin
            text-slate-700
            dark:text-white
          "
        />
      </div>
    );
  }

  return (
    <section className="pb-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div
          className="
            flex
            flex-col
            gap-4
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <h1
              className="
                text-4xl
                font-black
                tracking-tight
                text-slate-900
                dark:text-white
              "
            >
              Edit Product
            </h1>

            <p
              className="
                mt-2
                text-sm
                text-slate-500
                dark:text-zinc-400
              "
            >
              Update product information
              and media assets
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.back()
            }
            className="
              h-11
              rounded-2xl
            "
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <Card
          className="
            overflow-hidden
            rounded-[36px]
            border
            border-slate-200/70
            bg-white/70
            shadow-[0_20px_80px_rgba(15,23,42,0.08)]
            backdrop-blur-2xl
            dark:border-white/10
            dark:bg-[#0f172a]/70
            dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]
          "
        >
          <CardHeader
            className="
              border-b
              border-slate-200/70
              dark:border-white/10
            "
          >
            <CardTitle
              className="
                text-2xl
                font-black
                text-slate-900
                dark:text-white
              "
            >
              Product Editor
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            <div
              className="
                grid
                gap-8
                lg:grid-cols-[420px_1fr]
              "
            >
              <div className="space-y-5">
                <div
                  className="
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-slate-200/70
                    bg-slate-100/70
                    dark:border-white/10
                    dark:bg-white/5
                  "
                >
                  {preview ? (
                    <Image
                      src={preview}
                      alt={
                        name || "Product"
                      }
                      width={1200}
                      height={900}
                      className="
                        h-[420px]
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-[420px]
                        flex-col
                        items-center
                        justify-center
                        gap-3
                        text-slate-400
                        dark:text-zinc-500
                      "
                    >
                      <ImagePlus className="h-12 w-12" />

                      <span>
                        No Image Selected
                      </span>
                    </div>
                  )}
                </div>

                {uploading && (
                  <div className="space-y-2">
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        text-sm
                        text-slate-600
                        dark:text-zinc-300
                      "
                    >
                      <span>
                        Uploading image...
                      </span>

                      <span>
                        {progress}%
                      </span>
                    </div>

                    <div
                      className="
                        h-2
                        overflow-hidden
                        rounded-full
                        bg-slate-200
                        dark:bg-white/10
                      "
                    >
                      <div
                        className="
                          h-full
                          rounded-full
                          bg-slate-900
                          transition-all
                          dark:bg-white
                        "
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <label
                  className="
                    flex
                    cursor-pointer
                    items-center
                    justify-center
                    gap-3
                    rounded-[28px]
                    border
                    border-dashed
                    border-slate-300
                    p-6
                    transition-all
                    hover:bg-slate-50
                    dark:border-white/10
                    dark:hover:bg-white/5
                  "
                >
                  <Upload className="h-5 w-5" />

                  <span className="font-medium">
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

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div
                  className="
                    grid
                    gap-5
                    md:grid-cols-2
                  "
                >
                  <div className="space-y-2">
                    <label
                      className="
                        text-sm
                        font-semibold
                      "
                    >
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
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="
                        text-sm
                        font-semibold
                      "
                    >
                      Category ID
                    </label>

                    <Input
                      value={category}
                      onChange={(e) =>
                        setCategory(
                          e.target.value
                        )
                      }
                      placeholder="category-id"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="
                        text-sm
                        font-semibold
                      "
                    >
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
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="
                        text-sm
                        font-semibold
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
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="
                        text-sm
                        font-semibold
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
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="
                        text-sm
                        font-semibold
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
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="
                      text-sm
                      font-semibold
                    "
                  >
                    Description
                  </label>

                  <Textarea
                    value={description}
                    onChange={(e) =>
                      setDescription(
                        e.target.value
                      )
                    }
                    placeholder="Premium streetwear hoodie..."
                    className="
                      min-h-[180px]
                    "
                  />
                </div>

                <div
                  className="
                    flex
                    justify-end
                  "
                >
                  <Button
                    type="submit"
                    disabled={
                      uploading ||
                      submitting
                    }
                    className="
                      h-12
                      rounded-2xl
                      px-8
                    "
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          className="
                            mr-2
                            h-4
                            w-4
                            animate-spin
                          "
                        />

                        Saving...
                      </>
                    ) : (
                      <>
                        <Save
                          className="
                            mr-2
                            h-4
                            w-4
                          "
                        />

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

      {errorModal.open && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            p-4
            backdrop-blur-md
          "
        >
          <div
            className="
              w-full
              max-w-sm
              rounded-[32px]
              border
              border-slate-200/70
              bg-white/95
              p-6
              shadow-2xl
              backdrop-blur-xl
              dark:border-white/10
              dark:bg-[#0f172a]/95
            "
          >
            <div
              className="
                mb-4
                flex
                items-center
                gap-3
                text-red-500
              "
            >
              <XCircle className="h-5 w-5" />

              <h3 className="font-bold">
                Error
              </h3>
            </div>

            <p
              className="
                text-sm
                text-slate-600
                dark:text-zinc-300
              "
            >
              {errorModal.message}
            </p>

            <Button
              className="
                mt-5
                w-full
              "
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
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            p-4
            backdrop-blur-md
          "
        >
          <div
            className="
              w-full
              max-w-sm
              rounded-[32px]
              border
              border-slate-200/70
              bg-white/95
              p-8
              text-center
              shadow-2xl
              backdrop-blur-xl
              dark:border-white/10
              dark:bg-[#0f172a]/95
            "
          >
            <CheckCircle2
              className="
                mx-auto
                mb-4
                h-16
                w-16
                text-green-500
              "
            />

            <h3
              className="
                text-2xl
                font-black
                text-slate-900
                dark:text-white
              "
            >
              Success
            </h3>

            <p
              className="
                mt-2
                text-sm
                text-slate-500
                dark:text-zinc-400
              "
            >
              Product updated
              successfully
            </p>
          </div>
        </div>
      )}
    </section>
  );
}