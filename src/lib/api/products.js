const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSellerProducts = async (
  userId,
  status = "available"
) => {
  const res = await fetch(
    `${baseUrl}/api/products?userId=${userId}&status=${status}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};