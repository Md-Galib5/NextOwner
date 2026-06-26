const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrder = async (orderData) => {
  try {
    const res = await fetch(`${baseUrl}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
      cache: "no-store",
    });

    const data = await res.json();

    console.log("CREATE ORDER RESPONSE:", data);

    return data;
  } catch (error) {
    console.error("Create Order Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

export const getBuyerOrders = async (email) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/orders/buyer/${encodeURIComponent(email)}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.orders)) return data.orders;

    return [];
  } catch (error) {
    console.error("Get Buyer Orders Error:", error);
    return [];
  }
};