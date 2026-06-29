import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { getSellerProducts } from "@/lib/actions/products";
import SellerProductsClient from "./SellerProductsClient";

export default async function SellerProductsPage({ searchParams }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const params = await searchParams;
  const email = session?.user?.email;

  const products = email
    ? await getSellerProducts({
        email,
        search: params?.search || "",
        category: params?.category || "all",
        sort: params?.sort || "latest",
      })
    : [];

  return (
    <SellerProductsClient
      products={products}
      filters={{
        search: params?.search || "",
        category: params?.category || "all",
        sort: params?.sort || "latest",
      }}
    />
  );
}