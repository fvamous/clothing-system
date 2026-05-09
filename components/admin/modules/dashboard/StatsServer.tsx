import { prisma } from "@/lib/infra/prisma/client";
import StatsCards from "@/components/shared/StatsCards";

export default async function StatsServer() {
  const [products, orders, users] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  return (
    <StatsCards
      items={[
        { label: "Products", value: products },
        { label: "Orders", value: orders },
        { label: "Users", value: users },
      ]}
    />
  );
}