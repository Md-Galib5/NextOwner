"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { deleteProduct } from "@/lib/actions/products";
import { motion } from "framer-motion";
import {
  Package,
  DollarSign,
  Boxes,
  Eye,
  Pencil,
  Trash2,
  Plus,
  Sparkles,
  Search,
  BadgeCheck,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";

const categories = [
  "all",
  "Electronics",
  "Mobile Phones",
  "Computers",
  "Fashion",
  "Furniture",
  "Home Appliances",
  "Sports",
  "Books",
  "Vehicles",
  "Others",
];

export default function SellerProductsClient({
  products = [],
  filters = {
    search: "",
    category: "all",
    sort: "latest",
  },
}) {
  const router = useRouter();

  const [searchText, setSearchText] = useState(filters.search || "");
  const [deletingId, setDeletingId] = useState(null);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams();

    const nextSearch = key === "search" ? value : filters.search;
    const nextCategory = key === "category" ? value : filters.category;
    const nextSort = key === "sort" ? value : filters.sort;

    if (nextSearch) params.set("search", nextSearch);
    if (nextCategory && nextCategory !== "all") {
      params.set("category", nextCategory);
    }
    if (nextSort && nextSort !== "latest") {
      params.set("sort", nextSort);
    }

    router.push(`/dashboard/seller/products?${params.toString()}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilter("search", searchText.trim());
  };

  const clearFilters = () => {
    setSearchText("");
    router.push("/dashboard/seller/products");
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const res = await deleteProduct(id);

      if (res.success && res.deletedCount > 0) {
        toast.success("Product deleted successfully");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete product");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />

        <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-blue-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Seller Inventory
            </div>

            <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              My Products
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
              {products.length > 0
                ? `Showing ${products.length} product${
                    products.length > 1 ? "s" : ""
                  }.`
                : "No products found for the current filters."}
            </p>
          </div>

          <Link
            href="/dashboard/seller/products/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-600"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Product
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <form
          onSubmit={handleSearchSubmit}
          className="grid gap-3 lg:grid-cols-[1fr_220px_220px_120px]"
        >
          <div className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4">
            <Search className="h-4 w-4 text-slate-400" />

            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search title, category, description..."
              className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />

            <select
              value={filters.category}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All Categories" : item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4">
            <DollarSign className="h-4 w-4 text-slate-400" />

            <select
              value={filters.sort}
              onChange={(e) => updateFilter("sort", e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
            >
              <option value="latest">Latest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <button
            type="submit"
            className="h-12 rounded-2xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        <button
          type="button"
          onClick={clearFilters}
          className="mt-3 text-sm font-bold text-slate-500 transition hover:text-blue-600"
        >
          Clear filters
        </button>
      </motion.div>

      {products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm"
        >
          <Package className="mx-auto h-12 w-12 text-slate-400" />

          <h2 className="mt-4 text-xl font-black text-slate-950">
            No products found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Try another keyword, category, or sorting option.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {products.map((product, index) => (
            <motion.article
              key={product._id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              whileHover={{ y: -4, scale: 1.005 }}
              className="group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-xl"
            >
              <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center">
                <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-slate-100 lg:h-28 lg:w-40 lg:shrink-0">
                  <img
                    src={product.images?.[0] || "/placeholder-product.png"}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-black text-slate-700 shadow-sm backdrop-blur">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black uppercase text-blue-700">
                      {product.category}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black capitalize text-emerald-700">
                      <BadgeCheck className="h-3 w-3" />
                      {product.status || "active"}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold capitalize text-slate-700">
                      {product.condition}
                    </span>
                  </div>

                  <h2 className="mt-3 line-clamp-1 text-xl font-black text-slate-950">
                    {product.title}
                  </h2>

                  <p className="mt-1 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-500">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:w-56 lg:shrink-0">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-xs font-bold">Price</span>
                    </div>

                    <p className="mt-1 text-lg font-black text-slate-950">
                      ${product.price}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Boxes className="h-4 w-4" />
                      <span className="text-xs font-bold">Stock</span>
                    </div>

                    <p className="mt-1 text-lg font-black text-slate-950">
                      {product.stock}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 lg:shrink-0">
                  <Link
                    href={`/products/${product._id}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-600 lg:flex-none"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Link>

                  <Link
                    href={`/dashboard/seller/products/edit/${product._id}`}
                    className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                    className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}