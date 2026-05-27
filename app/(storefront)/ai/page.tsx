import { Sparkles } from "lucide-react";

import PlaceholderPage from "@/components/layout/PlaceholderPage";

export default function AiStylePage() {
  return (
    <PlaceholderPage
      eyebrow="AI Style"
      title="AI styling studio is being prepared."
      description="This page now exists so the navbar flow is complete. It is ready to be connected to product recommendations, outfit generation, or your existing AI endpoints."
      icon={Sparkles}
      primaryAction={{
        href: "/catalog",
        label: "Explore Catalog",
      }}
      secondaryAction={{
        href: "/admin",
        label: "Open Admin",
      }}
    />
  );
}
