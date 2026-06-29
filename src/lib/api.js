import { getToken } from "./authToken";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

const authHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token && { authorization: `Bearer ${token}` }),
  };
};

// create JWT after login/register
export const createJwtToken = async (email) => {
  const res = await fetch(`${baseUrl}/api/jwt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return await res.json();
};

// seller add product
export const addProduct = async (productData) => {
  const res = await fetch(`${baseUrl}/api/products`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(productData),
  });

  return await res.json();
};

// get public products
export const getProducts = async ({
  page = 1,
  limit = 6,
  search = "",
  category = "all",
  sort = "latest",
} = {}) => {
  const res = await fetch(
    `${baseUrl}/api/products?page=${page}&limit=${limit}&search=${search}&category=${category}&sort=${sort}`,
    {
      cache: "no-store",
    }
  );

  return await res.json();
};

// seller products
export const getSellerProducts = async (email) => {
  const res = await fetch(`${baseUrl}/api/products/seller/${email}`, {
    headers: authHeaders(),
    cache: "no-store",
  });

  return await res.json();
};

// update product
export const updateProduct = async (id, data) => {
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  return await res.json();
};

// delete product
export const deleteProduct = async (id) => {
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  return await res.json();
};

// buyer wishlist
export const addToWishlist = async (wishlistData) => {
  const res = await fetch(`${baseUrl}/api/wishlist`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(wishlistData),
  });

  return await res.json();
};

export const getWishlist = async (email) => {
  const res = await fetch(`${baseUrl}/api/wishlist/user/${email}`, {
    headers: authHeaders(),
    cache: "no-store",
  });

  return await res.json();
};

// admin
export const getAdminStats = async () => {
  const res = await fetch(`${baseUrl}/api/admin/stats`, {
    headers: authHeaders(),
    cache: "no-store",
  });

  return await res.json();
};

export const getAdminUsers = async () => {
  const res = await fetch(`${baseUrl}/api/admin/users`, {
    headers: authHeaders(),
    cache: "no-store",
  });

  return await res.json();
};

export const getAdminProducts = async () => {
  const res = await fetch(`${baseUrl}/api/admin/products`, {
    headers: authHeaders(),
    cache: "no-store",
  });

  return await res.json();
};

export const getAdminOrders = async () => {
  const res = await fetch(`${baseUrl}/api/admin/orders`, {
    headers: authHeaders(),
    cache: "no-store",
  });

  return await res.json();
};