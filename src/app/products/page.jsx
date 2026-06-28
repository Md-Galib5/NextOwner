import ProductsClient from "./ProductsClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

async function getProducts(params) {
  try {
    const search = params?.search || "";
    const category = params?.category || "all";
    const sort = params?.sort || "latest";

    const res = await fetch(
      `${baseUrl}/api/products?search=${search}&category=${category}&sort=${sort}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    return Array.isArray(data?.products) ? data.products : [];
  } catch (error) {
    console.log("Failed to load products:", error);
    return [];
  }
}

export default async function Allproducts({ searchParams }) {
  const params = await searchParams;
  const products = await getProducts(params);

  return (
    <ProductsClient
      products={products}
      filters={{
        search: params?.search || "",
        category: params?.category || "all",
        sort: params?.sort || "latest",
      }}
    />
  );
}