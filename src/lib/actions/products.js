"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const addproducts = async (newProductsData) => {
  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductsData),
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.error("Add Product Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

export const getProductById = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.error("Get Product Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

export const getWishlist = async (email) => {
  try {
    const res = await fetch(`${baseUrl}/api/wishlist/user/${email}`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.wishlist)) return data.wishlist;
    if (Array.isArray(data.items)) return data.items;
    if (Array.isArray(data.data)) return data.data;

    return [];
  } catch (error) {
    console.error("Get Wishlist Error:", error);

    return [];
  }
};

export const removeWishlist = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/wishlist/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    const data = await res.json();

    return {
      success: data.success || data.deletedCount > 0,
      deletedCount: data.deletedCount || 0,
      message: data.message || "Wishlist item removed",
    };
  } catch (error) {
    console.error("Remove Wishlist Error:", error);

    return {
      success: false,
      deletedCount: 0,
      message: error.message,
    };
  }
};

export const updateProduct = async (id, data) => {
  try {
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.error("Update Product Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.error("Delete Product Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

export const getSellerProducts = async ({
  email,
  search = "",
  category = "all",
  sort = "latest",
}) => {
  try {
    const params = new URLSearchParams({
      search,
      category,
      sort,
    });

    const res = await fetch(
      `${baseUrl}/api/products/seller/${email}?${params.toString()}`,
      {
        cache: "no-store",
      }
    );

    return await res.json();
  } catch (error) {
    console.error("Get Seller Products Error:", error);

    return [];
  }
};