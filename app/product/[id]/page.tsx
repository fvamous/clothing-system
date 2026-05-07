import { prisma } from "@/lib/prisma";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) {
    return <div style={{ padding: 20 }}>Product not found</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <p>Rp {product.price.toLocaleString()}</p>
    </div>
  );
}