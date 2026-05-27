import { Settings } from "lucide-react";

import PlaceholderPage from "@/components/layout/PlaceholderPage";

export default function AdminSettingsPage() {
  return (
    <PlaceholderPage
      eyebrow="Settings"
      title="System settings are ready."
      description="This protected route can hold brand settings, integrations, permissions, and storefront configuration."
      icon={Settings}
      primaryAction={{
        href: "/admin",
        label: "Dashboard",
      }}
    />
  );
}
