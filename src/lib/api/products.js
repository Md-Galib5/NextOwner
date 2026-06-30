// "use server";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const getSellerProducts = async (email) => {
//   try {
//     const res = await fetch(`${baseUrl}/api/products/seller/${email}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       return [];
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("Get Seller Products Error:", error);
//     return [];
//   }
// };

// export const addproducts = async (newProductsData) => {
//   try {
//     const res = await fetch(`${baseUrl}/api/products`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newProductsData),
//       cache: "no-store",
//     });

//     const text = await res.text();

//     let data;

//     try {
//       data = JSON.parse(text);
//     } catch {
//       console.error("Non JSON response:", text);

//       return {
//         success: false,
//         message: "Backend is not returning JSON. Check POST /api/products route.",
//       };
//     }

//     if (!res.ok) {
//       return {
//         success: false,
//         message: data?.message || "Failed to add product",
//       };
//     }

//     return data;
//   } catch (error) {
//     console.error("Add Product Error:", error);

//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// };

"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSellerProducts = async (email) => {
  try {
    const res = await fetch(`${baseUrl}/api/products/seller/${email}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Get Seller Products Error:", error);
    return [];
  }
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

    const text = await res.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error("Non JSON response:", text);

      return {
        success: false,
        message: "Backend is not returning JSON. Check POST /api/products route.",
      };
    }

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to add product",
      };
    }

    return data;
  } catch (error) {
    console.error("Add Product Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

export const getFeaturedProducts = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/products/featured`, {
      cache: "no-store",
    });

    const data = await res.json();
    return data?.products || [];
  } catch (error) {
    console.log("Featured products error:", error);
    return [];
  }
};

export const getPopularCategories = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/categories/popular`, {
      cache: "no-store",
    });

    const data = await res.json();
    return data?.categories || [];
  } catch (error) {
    return [];
  }
};

export const getMarketplaceStats = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/statistics`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data.statistics;
  } catch (error) {
    return {
      totalProducts: 0,
      totalSellers: 0,
      totalBuyers: 0,
      completedOrders: 0,
    };
  }
};