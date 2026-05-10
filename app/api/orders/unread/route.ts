import { prisma } from "@/lib/infra/prisma/client";

export async function GET() {
  const count = await prisma.order.count({
    where: {
      status: "PENDING",
    },
  });

  return Response.json({ count });
}