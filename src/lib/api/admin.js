const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAdminUsers = async (search = "") => {
  const res = await fetch(`${baseUrl}/api/admin/users?search=${search}`, {
    cache: "no-store",
  });

  return res.json();
};

export const updateAdminUserStatus = async (id, status) => {
  const res = await fetch(`${baseUrl}/api/admin/users/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
};

export const deleteAdminUser = async (id) => {
  const res = await fetch(`${baseUrl}/api/admin/users/${id}`, {
    method: "DELETE",
  });

  return res.json();
};