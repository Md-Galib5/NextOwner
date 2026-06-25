import ProductsClient from "./ProductsClient";

const getAllProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  return res.json();
};

export default async function Allproducts() {
  const products = await getAllProducts();

  return <ProductsClient products={products || []} />;
}