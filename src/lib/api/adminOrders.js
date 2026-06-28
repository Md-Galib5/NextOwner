const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

export const getAdminOrders = async (search = "", status = "all") => {
  const res = await fetch(
    `${baseUrl}/api/admin/orders?search=${search}&status=${status}`,
    { cache: "no-store" }
  );

  return res.json();
};

export const updateAdminOrderStatus = async (id, orderStatus) => {
  const res = await fetch(`${baseUrl}/api/admin/orders/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderStatus }),
  });

  return res.json();
};