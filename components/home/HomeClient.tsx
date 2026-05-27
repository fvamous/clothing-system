import type { Product } from "@prisma/client";

import Hero from "./Hero";
import FeaturedSection from "./FeaturedSection";
import BrandStory from "./BrandStory";

type HomeClientProps = {
  products: Product[];
};

export default function HomeClient({
  products,
}: HomeClientProps) {
  return (
    <div className="space-y-24">
      <Hero />

      <FeaturedSection
        products={products}
      />

      <BrandStory />
    </div>
  );
}