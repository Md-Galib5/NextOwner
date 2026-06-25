const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const safeJson = async (res) => {
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    console.error("Non JSON response:", text);
    return null;
  }
};

export const getUserById = async (id) => {
  if (!id) return null;

  try {
    const res = await fetch(`${baseUrl}/api/users/${id}`, {
      cache: "no-store",
    });

    return await safeJson(res);
  } catch (error) {
    console.error("Get user by id error:", error);
    return null;
  }
};

export const getUserByEmail = async (email) => {
  if (!email) return null;

  try {
    const res = await fetch(
      `${baseUrl}/api/users/by-email/${encodeURIComponent(email)}`,
      {
        cache: "no-store",
      }
    );

    return await safeJson(res);
  } catch (error) {
    console.error("Get user by email error:", error);
    return null;
  }
};

export const updateSellerProfile = async (email, data) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/users/by-email/${encodeURIComponent(
        email
      )}/seller-profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return await safeJson(res);
  } catch (error) {
    console.error("Update seller profile error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateBuyerProfile = async (email, data) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/users/by-email/${encodeURIComponent(
        email
      )}/buyer-profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return await safeJson(res);
  } catch (error) {
    console.error("Update buyer profile error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};