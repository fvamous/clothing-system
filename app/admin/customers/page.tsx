import { Users } from "lucide-react";

import PlaceholderPage from "@/components/layout/PlaceholderPage";

export default function AdminCustomersPage() {
  return (
    <PlaceholderPage
      eyebrow="Customers"
      title="Customer management is ready for data."
      description="This protected admin route is in place for future customer records, segments, and account controls."
      icon={Users}
      primaryAction={{
        href: "/admin",
        label: "Dashboard",
      }}
    />
  );
}
