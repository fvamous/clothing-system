import { prisma } from "@/lib/infra/prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10,
  });

  return Response.json({ products });
}