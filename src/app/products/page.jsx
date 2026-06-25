import ProductsClient from "./ProductsClient";

const getAllProducts = async ({ search = "", category = "all", sort = "latest" }) => {
  const params = new URLSearchParams({
    search,
    category,
    sort,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};

export default async function Allproducts({ searchParams }) {
  const params = await searchParams;

  const products = await getAllProducts({
    search: params?.search || "",
    category: params?.category || "all",
    sort: params?.sort || "latest",
  });

  return (
    <ProductsClient
      products={products || []}
      filters={{
        search: params?.search || "",
        category: params?.category || "all",
        sort: params?.sort || "latest",
      }}
    />
  );
}