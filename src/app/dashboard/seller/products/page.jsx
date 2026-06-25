import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getSellerProducts } from "@/lib/api/products";
import SellerProductsClient from "./SellerProductsClient";

const SellerProducts = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;
  const products = email ? await getSellerProducts(email) : [];

  return <SellerProductsClient products={products} />;
};

export default SellerProducts;