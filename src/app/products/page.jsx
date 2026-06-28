import ProductsClient from "./ProductsClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getProducts(searchParams) {
  const paramsData = await searchParams;

  const page = paramsData?.page || "1";
  const search = paramsData?.search || "";
  const category = paramsData?.category || "all";
  const sort = paramsData?.sort || "latest";

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", "6");

  if (search) params.set("search", search);
  if (category !== "all") params.set("category", category);
  if (sort !== "latest") params.set("sort", sort);

  const res = await fetch(`${baseUrl}/api/products?${params.toString()}`, {
    cache: "no-store",
  });

  const data = await res.json();

  console.log("PRODUCT API:", `${baseUrl}/api/products?${params.toString()}`);
  console.log("PRODUCT DATA:", data);

  return data;
}

export default async function ProductsPage({ searchParams }) {
  const paramsData = await searchParams;
  const data = await getProducts(paramsData);

  return (
    <ProductsClient
      products={data?.products || []}
      pagination={data?.pagination || {}}
      filters={{
        search: paramsData?.search || "",
        category: paramsData?.category || "all",
        sort: paramsData?.sort || "latest",
      }}
    />
  );
}