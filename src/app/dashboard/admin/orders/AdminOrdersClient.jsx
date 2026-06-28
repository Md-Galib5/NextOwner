// src/app/dashboard/admin/orders/AdminOrdersClient.jsx

"use client";

import { useState } from "react";
import { Search, ClipboardList, ShieldCheck, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { getAdminOrders, updateAdminOrderStatus } from "@/lib/api/adminOrders";

export default function AdminOrdersClient({ initialOrders = [] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loadingId, setLoadingId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();

    const data = await getAdminOrders(search, status);
    setOrders(Array.isArray(data?.orders) ? data.orders : []);
  };

  const handleConfirmStatus = async (id) => {
    const newStatus = selectedStatus[id];

    if (!newStatus) {
      toast.error("Please select a status first");
      return;
    }

    const confirmUpdate = window.confirm(
      `Are you sure you want to update this order to "${newStatus}"?`
    );

    if (!confirmUpdate) return;

    try {
      setLoadingId(id);

      const res = await updateAdminOrderStatus(id, newStatus);

      if (res?.success || res?.modifiedCount > 0) {
        toast.success("Order status updated");

        setOrders((prev) =>
          prev.map((order) =>
            order._id === id ? { ...order, orderStatus: newStatus } : order
          )
        );

        setSelectedStatus((prev) => {
          const copy = { ...prev };
          delete copy[id];
          return copy;
        });
      } else {
        toast.error(res?.message || "Failed to update order");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  const statusStyle = {
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    processing: "bg-blue-50 text-blue-700 border-blue-100",
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
    rejected: "bg-red-50 text-red-700 border-red-100",
    cancelled: "bg-red-50 text-red-700 border-red-100",
  };

  const statusLabel = {
    pending: "Pending",
    processing: "Processing",
    delivered: "Delivered",
    rejected: "Rejected",
    cancelled: "Cancelled",
  };

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 text-white shadow-xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
          <ShieldCheck className="h-4 w-4" />
          Manage Orders
        </div>

        <h1 className="text-3xl font-black md:text-5xl">Order Monitoring</h1>

        <p className="mt-3 max-w-xl text-sm text-blue-50">
          Monitor all orders, track status, and update order state when needed.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="grid gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px_auto]"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search buyer, seller, or product..."
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="delivered">Delivered</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">
          Search
        </button>
      </form>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-xl font-black text-slate-950">All Orders</h2>
            <p className="text-sm text-slate-500">
              {orders.length} orders found
            </p>
          </div>

          <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
            <ClipboardList className="h-6 w-6" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-5 py-4 w-[320px]">Product</th>
                <th className="px-5 py-4 w-[220px]">Buyer</th>
                <th className="px-5 py-4 w-[220px]">Seller</th>
                <th className="px-5 py-4 w-[120px]">Total</th>
                <th className="px-5 py-4 w-[140px]">Status</th>
                <th className="px-5 py-4 w-[140px]">Date</th>
                <th className="px-5 py-4 w-[220px] text-right">Update</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => {
                const product = order.productInfo || {};
                const buyer = order.buyerInfo || {};
                const seller = order.sellerInfo || {};
                const currentStatus = order.orderStatus || "pending";

                const totalPrice =
                  order.totalPrice ||
                  order.total ||
                  product.price ||
                  order.price ||
                  0;

                const image =
                  product.image ||
                  product.images?.[0] ||
                  order.image ||
                  "https://placehold.co/120x120?text=Order";

                const hasChanged =
                  selectedStatus[order._id] &&
                  selectedStatus[order._id] !== currentStatus;

                return (
                  <tr key={order._id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 w-[320px]">
                      <div className="flex min-w-0 items-start gap-3">
                        <img
                          src={image}
                          alt={product.title || "Product"}
                          className="h-14 w-14 flex-shrink-0 rounded-2xl border border-slate-200 object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <p
                            title={product.title}
                            className="line-clamp-2 break-words font-bold text-slate-900"
                          >
                            {product.title || "Unknown Product"}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Qty: {order.quantity || 1}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 w-[220px]">
                      <p className="truncate font-semibold text-slate-800">
                        {buyer.name || "Unknown Buyer"}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {buyer.email || "No email"}
                      </p>
                    </td>

                    <td className="px-5 py-4 w-[220px]">
                      <p className="truncate font-semibold text-slate-800">
                        {seller.name || "Unknown Seller"}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {seller.email || "No email"}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-black text-slate-900">
                      ${Number(totalPrice).toFixed(2)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-bold ${
                          statusStyle[currentStatus] ||
                          "border-slate-100 bg-slate-100 text-slate-700"
                        }`}
                      >
                        {statusLabel[currentStatus] || currentStatus}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <select
                          value={selectedStatus[order._id] || currentStatus}
                          disabled={loadingId === order._id}
                          onChange={(e) =>
                            setSelectedStatus((prev) => ({
                              ...prev,
                              [order._id]: e.target.value,
                            }))
                          }
                          className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold outline-none focus:border-blue-500 disabled:opacity-50"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="delivered">Delivered</option>
                          <option value="rejected">Rejected</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        <button
                          type="button"
                          disabled={loadingId === order._id || !hasChanged}
                          onClick={() => handleConfirmStatus(order._id)}
                          className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <CheckCircle className="h-4 w-4" />
                          {loadingId === order._id ? "Saving..." : "Confirm"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-14 text-center text-slate-500"
                  >
                    No orders found.
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