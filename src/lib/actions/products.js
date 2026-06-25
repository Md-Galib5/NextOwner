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

export const updateProduct = async (id, data) => {
  try {
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

export const getSellerProducts = async (email) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/seller/${email}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};