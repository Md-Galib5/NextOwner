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

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Add Product Error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};