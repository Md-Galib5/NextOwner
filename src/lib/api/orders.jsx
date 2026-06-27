// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createOrder = async (orderData) => {
//   try {
//     const res = await fetch(`${baseUrl}/api/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(orderData),
//       cache: "no-store",
//     });

//     const data = await res.json();

//     console.log("CREATE ORDER RESPONSE:", data);

//     return data;
//   } catch (error) {
//     console.error("Create Order Error:", error);

//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// };

// export const getBuyerOrders = async (email) => {
//   try {
//     const res = await fetch(
//       `${baseUrl}/api/orders/buyer/${encodeURIComponent(email)}`,
//       {
//         cache: "no-store",
//       }
//     );

//     const data = await res.json();

//     if (Array.isArray(data)) return data;
//     if (Array.isArray(data?.orders)) return data.orders;

//     return [];
//   } catch (error) {
//     console.error("Get Buyer Orders Error:", error);
//     return [];
//   }
// };


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getBuyerOrders(email) {
  const res = await fetch(`${baseUrl}/api/orders/buyer/${email}`, {
    cache: "no-store",
  });

  return res.json();
}

export async function getOrderDetails(id) {
  const res = await fetch(`${baseUrl}/api/orders/${id}`, {
    cache: "no-store",
  });

  return res.json();
}

export async function cancelOrder(id) {
  const res = await fetch(`${baseUrl}/api/orders/${id}/cancel`, {
    method: "PATCH",
    cache: "no-store",
  });

  return res.json();
}