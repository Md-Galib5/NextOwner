export const getWishlist = async (email) => {
  try {
    const res = await fetch(`${baseUrl}/api/wishlist/user/${email}`, {
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: error.message,
      wishlist: [],
    };
  }
};

export const removeWishlist = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/wishlist/${id}`, {
      method: "DELETE",
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