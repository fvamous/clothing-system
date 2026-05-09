"use client";

import Image from "next/image";

import {
  useRouter,
} from "next/navigation";

import {
  ShoppingBag,
  CreditCard,
  ArrowLeft,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CheckoutPage() {
  const { cart, totalPrice } =
    useCart();

  const router = useRouter();

  async function handleCheckout() {
    try {
      const res = await fetch(
        "/api/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            items: cart.map((i) => ({
              productId: i.id,
              quantity:
                i.quantity,
            })),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(
          "FULL ERROR:",
          data
        );

        alert(
          data.error ||
            "Checkout failed"
        );

        return;
      }

      if (!data.orderId) {
        console.error(
          "No orderId returned:",
          data
        );

        alert(
          "Order ID not returned"
        );

        return;
      }

      router.push(
        `/success/${data.orderId}`
      );
    } catch (error) {
      console.error(error);

      alert("Checkout failed");
    }
  }

  // =========================
  // EMPTY CART
  // =========================
  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-10">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag className="h-10 w-10 text-gray-400" />
            </div>

            <h1 className="text-2xl font-bold">
              Cart Empty
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Add products before
              checkout
            </p>

            <Button
              className="mt-6 w-full"
              onClick={() =>
                router.push(
                  "/catalog"
                )
              }
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Checkout
            </h1>

            <p className="text-sm text-gray-500">
              Complete your order
            </p>
          </div>

          <Button
            className="bg-gray-200 text-black hover:bg-gray-300"
            onClick={() =>
              router.back()
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* PRODUCT LIST */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="border-b">
                <CardTitle>
                  Order Items
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 p-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl border p-4"
                  >
                    <div className="overflow-hidden rounded-2xl bg-gray-100">
                      <Image
                        src={
                          item.imageUrl ||
                          "/placeholder.png"
                        }
                        alt={item.name}
                        width={100}
                        height={100}
                        className="h-24 w-24 object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Qty:{" "}
                        {
                          item.quantity
                        }
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        Rp{" "}
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* SUMMARY */}
          <div>
            <Card className="sticky top-6">
              <CardHeader className="border-b">
                <CardTitle>
                  Summary
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Items
                    </span>

                    <span>
                      {cart.reduce(
                        (
                          acc,
                          item
                        ) =>
                          acc +
                          item.quantity,
                        0
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Shipping
                    </span>

                    <span>
                      Free
                    </span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>
                        Total
                      </span>

                      <span>
                        Rp{" "}
                        {totalPrice.toLocaleString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={
                    handleCheckout
                  }
                  className="h-12 w-full"
                >
                  <CreditCard className="mr-2 h-4 w-4" />

                  Checkout Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}