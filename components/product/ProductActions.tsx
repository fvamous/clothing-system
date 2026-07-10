"use client";

import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";
import { useCartDrawer } from "@/hooks/cart/useCartDrawer";

type ProductActionsProps = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    imageUrl?: string | null;
  };
};

export default function ProductActions({
  product,
}: ProductActionsProps) {
  const router = useRouter();

  const { addToCart } = useCart();

  const { onOpen } = useCartDrawer();

  function addProductToCart() {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  }

  function handleAddToCart() {
    addProductToCart();
    onOpen();
  }

  function handleBuyNow() {
    addProductToCart();
    router.push("/checkout");
  }

  return (
    <div
      className="
        mt-10
        flex
        flex-wrap
        gap-4
      "
    >
      <button
        type="button"
        onClick={handleAddToCart}
        className="
          inline-flex
          h-14
          items-center
          justify-center
          rounded-full
          bg-zinc-950
          px-8
          text-sm
          font-bold
          text-white
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:shadow-2xl
          dark:bg-white
          dark:text-black
        "
      >
        Add to Cart
      </button>

      <button
        type="button"
        onClick={handleBuyNow}
        className="
          inline-flex
          h-14
          items-center
          justify-center
          rounded-full
          border
          border-zinc-300
          bg-white/50
          px-8
          text-sm
          font-bold
          text-zinc-900
          backdrop-blur-xl
          transition-all
          duration-300
          hover:bg-white
          dark:border-white/10
          dark:bg-white/[0.03]
          dark:text-white
          dark:hover:bg-white/[0.06]
        "
      >
        Buy Now
      </button>
    </div>
  );
}
