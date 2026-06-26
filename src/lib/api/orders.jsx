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

    return await res.json();
  } catch (error) {
    console.error("Create Order Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};