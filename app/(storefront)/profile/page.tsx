import { User2 } from "lucide-react";

import PlaceholderPage from "@/components/layout/PlaceholderPage";

export default function ProfilePage() {
  return (
    <PlaceholderPage
      eyebrow="Profile"
      title="Customer profile is ready for account features."
      description="Use this route for customer identity, addresses, order history, and saved preferences. Admin access remains protected separately."
      icon={User2}
      primaryAction={{
        href: "/login",
        label: "Login",
      }}
      secondaryAction={{
        href: "/admin",
        label: "Admin Panel",
      }}
    />
  );
}
