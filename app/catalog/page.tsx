import CatalogClient from "./CatalogClient";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Page() {
  const products = await getProducts();

  return <CatalogClient products={products} />;
}