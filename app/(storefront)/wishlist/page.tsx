import { Heart } from "lucide-react";

import PlaceholderPage from "@/components/layout/PlaceholderPage";

export default function WishlistPage() {
  return (
    <PlaceholderPage
      eyebrow="Wishlist"
      title="Saved looks will live here."
      description="Wishlist routing is ready. The next step is persisting saved products per user or local session."
      icon={Heart}
      primaryAction={{
        href: "/catalog",
        label: "Browse Products",
      }}
      secondaryAction={{
        href: "/cart",
        label: "View Cart",
      }}
    />
  );
}
