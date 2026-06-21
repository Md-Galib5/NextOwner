"use server";

export const addproducts = async (newProductsData) => {
  const res = await fetch("http://localhost:8080/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProductsData),
    cache: "no-store",
  });

  const text = await res.text();

  if (!res.ok) {
    console.log("Backend error:", text);
    return {
      success: false,
      message: text || "Failed to add product",
    };
  }

  return JSON.parse(text);
};