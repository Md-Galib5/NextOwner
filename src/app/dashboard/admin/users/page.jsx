import AdminUsersClient from "./AdminUsersClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getUsers() {
  try {
    const res = await fetch(`${baseUrl}/api/admin/users`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed");

    return res.json();
  } catch {
    return { success: false, users: [] };
  }
}

export default async function AdminUsersPage() {
  const data = await getUsers();

  return <AdminUsersClient initialUsers={data.users || []} />;
}