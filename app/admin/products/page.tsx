import Link from "next/link";

import { prisma } from "@/lib/prisma/client";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";

import { redirect } from "next/navigation";

import {
  Package2,
  Plus,
} from "lucide-react";

import DeleteProductButton from "@/components/admin/products/DeleteProductButton";

import ProductCard from "@/components/admin/products/ProductCard";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default async function ProductsAdminPage() {
  const session =
    await getServerSession(
      authOptions
    );

  if (
    !session?.user ||
    session.user.role !== "ADMIN"
  ) {
    redirect("/");
  }

  const products =
    await prisma.product.findMany({
      where: {
        isDeleted: false,
      },

      include: {
        category: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Products
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your product
              catalog
            </p>
          </div>

          <Link
            href="/admin/products/new"
          >
            <Button className="h-11 rounded-xl px-5">
              <Plus className="mr-2 h-4 w-4" />

              Add Product
            </Button>
          </Link>
        </div>

        {/* EMPTY */}
        {!products.length && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <Package2 className="h-8 w-8 text-muted-foreground" />
              </div>

              <h2 className="text-xl font-semibold">
                No products yet
              </h2>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Start building your
                store by adding your
                first product.
              </p>

              <Link
                href="/admin/products/new"
                className="mt-6"
              >
                <Button className="rounded-xl">
                  <Plus className="mr-2 h-4 w-4" />

                  Create Product
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* GRID */}
        {!!products.length && (
          <div
            className="
              grid
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {products.map(
              (product) => (
                <div
                  key={product.id}
                  className="relative"
                >
                  <ProductCard
                    product={{
                      id: product.id,

                      name:
                        product.name,

                      price:
                        Number(
                          product.price
                        ),

                      stock:
                        product.stock,

                      category:
                        product.category
                          ?.name ||
                        "Uncategorized",

                      imageUrl:
                        product.imageUrl ||
                        undefined,
                    }}
                  />

                  {/* DELETE */}
                  <div className="mt-3">
                    <DeleteProductButton
                      productId={
                        product.id
                      }
                    />
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}