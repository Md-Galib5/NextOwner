// src/app/dashboard/admin/products/AdminProductsClient.jsx

"use client";

import { useState } from "react";
import {
  Search,
  PackageCheck,
  Trash2,
  CheckCircle,
  XCircle,
  ShieldCheck,
  Package,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  deleteAdminProduct,
  getAdminProducts,
  updateAdminProductStatus,
} from "@/lib/api/adminProducts";

export default function AdminProductsClient({ initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loadingId, setLoadingId] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    const data = await getAdminProducts(search, status);
    setProducts(data.products || []);
  };

  const handleStatus = async (id, newStatus) => {
    setLoadingId(id);

    const res = await updateAdminProductStatus(id, newStatus);

    if (res.success) {
      toast.success(`Product ${newStatus}`);
      setProducts((prev) =>
        prev.map((product) =>
          product._id === id ? { ...product, status: newStatus } : product
        )
      );
    } else {
      toast.error(res.message || "Failed to update product");
    }

    setLoadingId(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    setLoadingId(id);

    const res = await deleteAdminProduct(id);

    if (res.success) {
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } else {
      toast.error(res.message || "Failed to delete product");
    }

    setLoadingId(null);
  };

  const statusStyle = {
    available: "bg-blue-50 text-blue-700",
    approved: "bg-emerald-50 text-emerald-700",
    rejected: "bg-red-50 text-red-700",
    pending: "bg-amber-50 text-amber-700",
    sold: "bg-slate-100 text-slate-700",
  };

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 text-white shadow-xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
          <ShieldCheck className="h-4 w-4" />
          Manage Products
        </div>

        <h1 className="text-3xl font-black md:text-5xl">
          Product Moderation
        </h1>

        <p className="mt-3 max-w-xl text-sm text-blue-50">
          Review, approve, reject, and delete product listings from one admin
          control panel.
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
            placeholder="Search by title, category, seller email..."
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="sold">Sold</option>
        </select>

        <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">
          Search
        </button>
      </form>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              All Products
            </h2>
            <p className="text-sm text-slate-500">
              {products.length} products found
            </p>
          </div>

          <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
            <PackageCheck className="h-6 w-6" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Seller</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {products.map((product) => {
                const image =
                  product.images?.[0] ||
                  product.image ||
                  "https://placehold.co/120x120?text=Product";

                return (
                  <tr key={product._id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={image}
                          alt={product.title}
                          className="h-14 w-14 rounded-2xl border border-slate-200 object-cover"
                        />

                        <div>
                          <p className="max-w-[240px] truncate font-bold text-slate-900">
                            {product.title || "Untitled Product"}
                          </p>
                          <p className="text-xs text-slate-500">
                            Stock: {product.stock ?? 0}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {product.sellerInfo?.name || "Unknown Seller"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {product.sellerInfo?.email || "No email"}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold capitalize text-slate-600">
                      {product.category || "N/A"}
                    </td>

                    <td className="px-5 py-4 font-black text-slate-900">
                      ${product.price || 0}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                          statusStyle[product.status] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {product.status || "available"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          disabled={loadingId === product._id}
                          onClick={() => handleStatus(product._id, "approved")}
                          className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-100 disabled:opacity-50"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </button>

                        <button
                          disabled={loadingId === product._id}
                          onClick={() => handleStatus(product._id, "rejected")}
                          className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100 disabled:opacity-50"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </button>

                        <button
                          disabled={loadingId === product._id}
                          onClick={() => handleDelete(product._id)}
                          className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-5 py-14 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="mb-4 rounded-2xl bg-slate-100 p-4 text-slate-500">
                        <Package className="h-7 w-7" />
                      </div>
                      <h3 className="font-black text-slate-900">
                        No products found
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Try searching with another keyword or status.
                      </p>
                    </div>
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