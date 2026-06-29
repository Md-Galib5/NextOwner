// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

// const getToken = () => {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem("nextowner-token");
// };

// const authHeaders = () => {
//   const token = getToken();

//   return {
//     "Content-Type": "application/json",
//     ...(token && { Authorization: `Bearer ${token}` }),
//   };
// };

// const parseJson = async (res) => {
//   const text = await res.text();

//   try {
//     return JSON.parse(text);
//   } catch {
//     return {
//       success: false,
//       orders: [],
//       message: text || "Invalid API response",
//     };
//   }
// };

// export async function getBuyerOrders(email) {
//   if (!email) return { success: false, orders: [] };

//   const cleanEmail = email.trim().toLowerCase();

//   const res = await fetch(
//     `${baseUrl}/api/orders/buyer/${encodeURIComponent(cleanEmail)}`,
//     {
//       headers: authHeaders(),
//       cache: "no-store",
//     }
//   );

//   return parseJson(res);
// }

// export async function getSellerOrders(email) {
//   if (!email) return { success: false, orders: [] };

//   const cleanEmail = email.trim().toLowerCase();

//   const res = await fetch(
//     `${baseUrl}/api/orders/seller/${encodeURIComponent(cleanEmail)}`,
//     {
//       cache: "no-store",
//     }
//   );

//   return parseJson(res);
// }

// export async function getOrderDetails(id) {
//   if (!id) return { success: false, order: null };

//   const res = await fetch(`${baseUrl}/api/orders/${id}`, {
//     headers: authHeaders(),
//     cache: "no-store",
//   });

//   return parseJson(res);
// }

// export async function cancelOrder(id) {
//   if (!id) {
//     return {
//       success: false,
//       message: "Order id is required",
//     };
//   }

//   const res = await fetch(`${baseUrl}/api/orders/${id}/cancel`, {
//     method: "PATCH",
//     headers: authHeaders(),
//     cache: "no-store",
//   });

//   return parseJson(res);
// }

// export async function updateOrderStatus(id, orderStatus) {
//   if (!id || !orderStatus) {
//     return {
//       success: false,
//       message: "Order id and status are required",
//     };
//   }

//   const res = await fetch(`${baseUrl}/api/orders/${id}/status`, {
//     method: "PATCH",
//     headers: authHeaders(),
//     cache: "no-store",
//     body: JSON.stringify({ orderStatus }),
//   });

//   return parseJson(res);
// }

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

const parseJson = async (res) => {
  const text = await res.text();

  console.log("STATUS:", res.status);
  console.log("RAW API TEXT:", text);

  try {
    return JSON.parse(text);
  } catch {
    return {
      success: false,
      orders: [],
      message: text,
    };
  }
};

export async function getBuyerOrders(email) {
  if (!email) return { success: false, orders: [] };

  const res = await fetch(
    `${baseUrl}/api/orders/buyer/${encodeURIComponent(email.trim().toLowerCase())}`,
    { cache: "no-store" }
  );

  return parseJson(res);
}

export async function getSellerOrders(email) {
  if (!email) return { success: false, orders: [] };

  const cleanEmail = email.trim().toLowerCase();
  const url = `${baseUrl}/api/orders/seller/${encodeURIComponent(cleanEmail)}`;

  console.log("GET SELLER ORDERS URL:", url);

  const res = await fetch(url, { cache: "no-store" });
  const data = await parseJson(res);

  console.log("GET SELLER ORDERS DATA:", data);

  return {
    success: data?.success ?? false,
    orders: Array.isArray(data?.orders) ? data.orders : [],
  };
}

export async function getOrderDetails(id) {
  const res = await fetch(`${baseUrl}/api/orders/${id}`, {
    cache: "no-store",
  });

  return parseJson(res);
}

export async function cancelOrder(id) {
  const res = await fetch(`${baseUrl}/api/orders/${id}/cancel`, {
    method: "PATCH",
    cache: "no-store",
  });

  return parseJson(res);
}

export async function updateOrderStatus(id, status) {
  const res = await fetch(`${baseUrl}/api/orders/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({ status }),
  });

  return parseJson(res);
}