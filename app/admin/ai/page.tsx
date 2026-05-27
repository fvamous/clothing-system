import { Sparkles } from "lucide-react";

import PlaceholderPage from "@/components/layout/PlaceholderPage";

export default function AdminAiPage() {
  return (
    <PlaceholderPage
      eyebrow="Admin AI"
      title="AI Studio is protected and ready."
      description="Only ADMIN users can reach this route. Connect generation workflows here when the AI module is expanded."
      icon={Sparkles}
      primaryAction={{
        href: "/admin/products",
        label: "Manage Products",
      }}
    />
  );
}
