const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const getSellerProducts = async (
//   userId,
//   status = "available"
// ) => {
//   const res = await fetch(
//     `${baseUrl}/api/products?userId=${userId}&status=${status}`,
//     {
//       cache: "no-store",
//     }
//   );

//   return res.json();
// };
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSellerProducts = async (email) => {
  const res = await fetch(`${baseUrl}/api/products/seller/${email}`, {
    cache: "no-store",
  });

  return res.json();
};

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
    return {
      success: false,
      message: error.message,
    };
  }
};