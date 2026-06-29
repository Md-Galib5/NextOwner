// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// const getToken = () => {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem("nextowner-token");
// };

// const safeJson = async (res) => {
//   const text = await res.text();

//   try {
//     return JSON.parse(text);
//   } catch {
//     console.error("API returned non JSON response:", text);

//     return {
//       success: false,
//       message:
//         "API returned non JSON. Check NEXT_PUBLIC_BASE_URL and backend route.",
//       rawResponse: text,
//     };
//   }
// };

// export const getUserByEmail = async (email) => {
//   if (!email) return null;

//   try {
//     const res = await fetch(
//       `${baseUrl}/api/users/by-email/${encodeURIComponent(email)}`,
//       {
//         cache: "no-store",
//       }
//     );

//     return await safeJson(res);
//   } catch (error) {
//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// };

// export const updateSellerProfile = async (email, data) => {
//   if (!email) {
//     return {
//       success: false,
//       message: "User email missing",
//     };
//   }

//   const token = getToken();

//   if (!token) {
//     return {
//       success: false,
//       message: "JWT token missing. Please login again.",
//     };
//   }

//   try {
//     const res = await fetch(
//       `${baseUrl}/api/users/by-email/${encodeURIComponent(
//         email
//       )}/seller-profile`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     const result = await safeJson(res);

//     if (!res.ok) {
//       return {
//         success: false,
//         message: result?.message || "Failed to update seller profile",
//       };
//     }

//     return result;
//   } catch (error) {
//     return {
//       success: false,
//       message: error.message || "Something went wrong",
//     };
//   }
// };

// export const updateBuyerProfile = async (email, data) => {
//   if (!email) {
//     return {
//       success: false,
//       message: "User email missing",
//     };
//   }

//   const token = getToken();

//   if (!token) {
//     return {
//       success: false,
//       message: "JWT token missing. Please login again.",
//     };
//   }

//   try {
//     const res = await fetch(
//       `${baseUrl}/api/users/by-email/${encodeURIComponent(
//         email
//       )}/buyer-profile`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     const result = await safeJson(res);

//     if (!res.ok) {
//       return {
//         success: false,
//         message: result?.message || "Failed to update buyer profile",
//       };
//     }

//     return result;
//   } catch (error) {
//     return {
//       success: false,
//       message: error.message || "Something went wrong",
//     };
//   }
// };

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