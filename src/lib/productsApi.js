const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

export const getSellerProducts = async (
  email,
  { search = "", category = "all", sort = "latest" } = {}
) => {
  try {
    const query = new URLSearchParams({
      search,
      category,
      sort,
    }).toString();

    const res = await fetch(`${baseUrl}/api/products/seller/${email}?${query}`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Seller products error:", data);
      return [];
    }

    return Array.isArray(data) ? data : data?.products || [];
  } catch (error) {
    console.log("getSellerProducts error:", error);
    return [];
  }
};