import { Sparkles } from "lucide-react";

import PlaceholderPage from "@/components/layout/PlaceholderPage";

export default function AiStyleCollectionPage() {
  return (
    <PlaceholderPage
      eyebrow="Collection"
      title="AI Style collection is queued."
      description="The collection route is available, so search and navigation links no longer fall into 404."
      icon={Sparkles}
      primaryAction={{
        href: "/catalog",
        label: "Back to Catalog",
      }}
    />
  );
}
