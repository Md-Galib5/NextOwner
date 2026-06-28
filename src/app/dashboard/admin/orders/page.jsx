// src/app/dashboard/admin/orders/page.jsx

import AdminOrdersClient from "./AdminOrdersClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

async function getOrders() {
  try {
    const res = await fetch(`${baseUrl}/api/admin/orders`, {
      cache: "no-store",
    });

    const data = await res.json();
    return Array.isArray(data?.orders) ? data.orders : [];
  } catch {
    return [];
  }
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return <AdminOrdersClient initialOrders={orders} />;
}