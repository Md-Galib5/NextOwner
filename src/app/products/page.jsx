// import ProductsClient from "./ProductsClient";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

// async function getProducts(params = {}) {
//   try {
//     const query = new URLSearchParams({
//       page: params?.page || "1",
//       limit: params?.limit || "6",
//       search: params?.search || "",
//       category: params?.category || "all",
//       sort: params?.sort || "latest",
//     });

//     const res = await fetch(`${baseUrl}/api/products?${query.toString()}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       return { products: [], pagination: null };
//     }

//     const data = await res.json();

//     return {
//       products: data?.products || [],
//       pagination: data?.pagination || null,
//     };
//   } catch (error) {
//     console.error("Failed to load products:", error);
//     return { products: [], pagination: null };
//   }
// }

// export default async function Allproducts({ searchParams = {} }) {
//   const { products, pagination } = await getProducts(searchParams);

//   return (
//     <ProductsClient
//       products={products}
//       pagination={pagination}
//       filters={{
//         search: searchParams?.search || "",
//         category: searchParams?.category || "all",
//         sort: searchParams?.sort || "latest",
//         page: searchParams?.page || "1",
//         limit: searchParams?.limit || "6",
//       }}
//     />
//   );
// }

import ProductsClient from "./ProductsClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

async function getProducts(params = {}) {
  try {
    const query = new URLSearchParams();

    query.set("page", params.page || "1");
    query.set("limit", params.limit || "6");
    query.set("search", params.search || "");
    query.set("category", params.category || "all");
    query.set("sort", params.sort || "latest");

    const res = await fetch(`${baseUrl}/api/products?${query.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { products: [], pagination: null };
    }

    const data = await res.json();

    return {
      products: data?.products || [],
      pagination: data?.pagination || null,
    };
  } catch (error) {
    console.error("Failed to load products:", error);
    return { products: [], pagination: null };
  }
}

export default async function Allproducts({ searchParams }) {
  const params = await searchParams;

  const filters = {
    search: params?.search || "",
    category: params?.category || "all",
    sort: params?.sort || "latest",
    page: params?.page || "1",
    limit: params?.limit || "6",
  };

  const { products, pagination } = await getProducts(filters);

  return (
    <ProductsClient
      products={products}
      pagination={pagination}
      filters={filters}
    />
  );
}