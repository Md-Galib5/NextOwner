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