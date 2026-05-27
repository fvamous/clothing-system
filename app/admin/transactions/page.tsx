import { CreditCard } from "lucide-react";

import PlaceholderPage from "@/components/layout/PlaceholderPage";

export default function AdminTransactionsPage() {
  return (
    <PlaceholderPage
      eyebrow="Transactions"
      title="Transaction monitoring is ready."
      description="Use this protected route for payment status, reconciliation, and revenue operations."
      icon={CreditCard}
      primaryAction={{
        href: "/admin/orders",
        label: "View Orders",
      }}
    />
  );
}
