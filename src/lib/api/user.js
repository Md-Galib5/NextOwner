const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getUserById = async (id) => {
  const res = await fetch(`${baseUrl}/api/users/${id}`, {
    cache: "no-store",
  });

  return res.json();
};

export const updateSellerProfile = async (id, data) => {
  const res = await fetch(`${baseUrl}/api/users/${id}/seller-profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};