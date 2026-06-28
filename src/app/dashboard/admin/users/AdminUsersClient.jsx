"use client";

import { useState } from "react";
import { Search, Users, ShieldCheck, Trash2, Ban, CheckCircle } from "lucide-react";
import { deleteAdminUser, getAdminUsers, updateAdminUserStatus } from "@/lib/api/admin";
import { toast } from "react-toastify";

export default function AdminUsersClient({ initialUsers = [] }) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    const data = await getAdminUsers(search);
    setUsers(data.users || []);
  };

  const handleStatus = async (id, status) => {
    setLoadingId(id);

    const res = await updateAdminUserStatus(id, status);

    if (res.success) {
      toast.success(`User ${status}`);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, status } : user
        )
      );
    } else {
      toast.error(res.message || "Failed to update user");
    }

    setLoadingId(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    setLoadingId(id);

    const res = await deleteAdminUser(id);

    if (res.success) {
      toast.success("User deleted");
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } else {
      toast.error(res.message || "Failed to delete user");
    }

    setLoadingId(null);
  };

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 text-white shadow-xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
          <ShieldCheck className="h-4 w-4" />
          Manage Users
        </div>

        <h1 className="text-3xl font-black md:text-5xl">User Control Panel</h1>

        <p className="mt-3 max-w-xl text-sm text-blue-50">
          Admin can monitor, search, block, unblock, and delete platform users.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm md:flex-row"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, role or status..."
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">
          Search
        </button>
      </form>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-xl font-black text-slate-950">All Users</h2>
            <p className="text-sm text-slate-500">{users.length} users found</p>
          </div>

          <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {users.map((user) => {
                const isBlocked = user.status === "blocked";

                return (
                  <tr key={user._id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.photo || "https://i.pravatar.cc/150"}
                          alt={user.name || "User"}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900">
                            {user.name || "Unknown User"}
                          </p>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold capitalize text-blue-700">
                        {user.role || "user"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                          isBlocked
                            ? "bg-red-50 text-red-600"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {user.status || "active"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        {isBlocked ? (
                          <button
                            disabled={loadingId === user._id}
                            onClick={() => handleStatus(user._id, "active")}
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-100"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Unblock
                          </button>
                        ) : (
                          <button
                            disabled={loadingId === user._id}
                            onClick={() => handleStatus(user._id, "blocked")}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
                          >
                            <Ban className="h-4 w-4" />
                            Block
                          </button>
                        )}

                        <button
                          disabled={loadingId === user._id}
                          onClick={() => handleDelete(user._id)}
                          className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-5 py-12 text-center text-slate-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}