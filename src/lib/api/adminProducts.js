// src/lib/api/adminProducts.js

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAdminProducts = async (search = "", status = "all") => {
  const res = await fetch(
    `${baseUrl}/api/admin/products?search=${search}&status=${status}`,
    { cache: "no-store" }
  );

  return res.json();
};

export const updateAdminProductStatus = async (id, status) => {
  const res = await fetch(`${baseUrl}/api/admin/products/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  return res.json();
};

export const deleteAdminProduct = async (id) => {
  const res = await fetch(`${baseUrl}/api/admin/products/${id}`, {
    method: "DELETE",
  });

  return res.json();
};