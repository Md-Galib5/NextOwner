import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getSellerOrders } from "@/lib/api/orders";
import SellerOrdersClient from "./SellerOrdersClient";

export default async function SellerOrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  let data = { success: false, orders: [] };

  if (email) {
    data = await getSellerOrders(email);
  }
  
  const orders = data?.orders || [];

  console.log("SELLER SESSION:", session);
console.log("SELLER EMAIL:", email);
  console.log(orders)

  const totalOrders = orders.length;
  const processingOrders = orders.filter(
    (order) => order.orderStatus === "processing"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "delivered"
  ).length;
  const cancelledOrders = orders.filter(
    (order) => order.orderStatus === "cancelled"
  ).length;

  return (
    <SellerOrdersClient
      orders={orders}
      sellerEmail={email}
      res={{
        totalOrders,
        processingOrders,
        deliveredOrders,
        cancelledOrders,
      }}
    />
  );
}