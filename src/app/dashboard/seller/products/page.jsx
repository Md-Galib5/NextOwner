import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getSellerProducts } from "@/lib/api/products";
import SellerProductsClient from "./SellerProductsClient";

const SellerProducts = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;
  const products = await getSellerProducts(userId);

  return <SellerProductsClient products={products} />;
};

export default SellerProducts;