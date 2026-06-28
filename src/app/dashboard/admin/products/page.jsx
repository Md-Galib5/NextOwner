// src/app/dashboard/admin/products/page.jsx

import AdminProductsClient from "./AdminProductsClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getProducts() {
  try {
    const res = await fetch(`${baseUrl}/api/admin/products`, {
      cache: "no-store",
    });

    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch {
      console.log("API returned HTML/text instead of JSON:", text.slice(0, 200));
      return { success: false, products: [] };
    }
  } catch (error) {
    console.log("Failed to fetch products:", error);
    return { success: false, products: [] };
  }
}

export default async function AdminProductsPage() {
  const data = await getProducts();

  return <AdminProductsClient initialProducts={data.products || []} />;
}