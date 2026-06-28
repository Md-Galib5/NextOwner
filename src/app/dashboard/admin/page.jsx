import AdminOverview from "./AdminOverview";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getAdminStats() {
  try {
    const res = await fetch(`${baseUrl}/api/admin/stats`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed");

    return res.json();
  } catch {
    return {
      totalUsers: 0,
      totalProducts: 0,
      totalOrders: 0,
    };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return <AdminOverview stats={stats} />;
}