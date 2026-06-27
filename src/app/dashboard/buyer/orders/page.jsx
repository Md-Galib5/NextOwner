import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getBuyerOrders } from "@/lib/api/orders";
import BuyerOrdersClient from "./BuyerOrdersClient";

export default async function BuyerOrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  const ordersRes = email ? await getBuyerOrders(email) : [];

  const orders = Array.isArray(ordersRes)
    ? ordersRes
    : ordersRes?.orders || [];

  return <BuyerOrdersClient orders={orders} email={email} />;
}