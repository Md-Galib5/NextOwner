"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import {
  ShoppingBag,
  BadgeCheck,
  Boxes,
  DollarSign,
  Eye,
  ShoppingCart,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import WishlistButton from "@/components/products/WishlistButton";

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

export default function ProductsClient({
  products = [],
  pagination = null,
  filters = {
    search: "",
    category: "all",
    sort: "latest",
    page: "1",
    limit: "6",
  },
}) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [searchText, setSearchText] = useState(filters.search || "");

  const buildQuery = (nextFilters = {}) => {
    const merged = {
      search: filters.search || "",
      category: filters.category || "all",
      sort: filters.sort || "latest",
      page: filters.page || "1",
      limit: filters.limit || "6",
      ...nextFilters,
    };

    const params = new URLSearchParams();

    if (merged.search) params.set("search", merged.search);
    if (merged.category && merged.category !== "all") {
      params.set("category", merged.category);
    }
    if (merged.sort && merged.sort !== "latest") {
      params.set("sort", merged.sort);
    }

    params.set("page", merged.page || "1");
    params.set("limit", merged.limit || "6");

    return params.toString();
  };

  const updateFilter = (key, value) => {
    const query = buildQuery({
      [key]: value,
      page: "1",
    });

    router.push(`/products?${query}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilter("search", searchText.trim());
  };

  const clearFilters = () => {
    setSearchText("");
    router.push("/products");
  };

  const goToPage = (page) => {
    const query = buildQuery({
      page: String(page),
    });

    router.push(`/products?${query}`);
  };

  const handleBuyNow = (productId) => {
    if (isPending) return;

    if (!session?.user?.email) {
      toast.error("Please login first");
      router.push(`/auth/signin?redirect=/products`);
      return;
    }

    if (session?.user?.role !== "buyer") {
      toast.error("Only buyers can buy products");
      return;
    }

    router.push(`/checkout/${productId}`);
  };

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-100 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
              <ShoppingBag className="h-4 w-4" />
              NextOwner Marketplace
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-950">
              Explore All Products
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Browse trusted pre-owned products listed by verified sellers.
            </p>
          </div>
        </div>

        <div className="rounded-[1.7rem] border border-slate-200 bg-white p-4 shadow-sm">
          <form
            onSubmit={handleSearchSubmit}
            className="grid gap-3 lg:grid-cols-[1fr_220px_220px_120px]"
          >
            <div className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50">
              <Search className="h-4 w-4 text-slate-400" />

              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by title, category, seller..."
                className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-indigo-300 focus-within:bg-white">
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

            <div className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-indigo-300 focus-within:bg-white">
              <DollarSign className="h-4 w-4 text-slate-400" />

              <select
                value={filters.sort}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <button
              type="submit"
              className="h-12 rounded-2xl bg-slate-950 px-4 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200"
            >
              Search
            </button>
          </form>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Showing{" "}
              <span className="font-black text-slate-950">
                {pagination?.totalProducts || products.length}
              </span>{" "}
              products
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="text-left text-sm font-bold text-slate-500 transition hover:text-indigo-600 sm:text-right"
            >
              Clear filters
            </button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <ShoppingBag className="mx-auto h-12 w-12 text-slate-400" />

            <h2 className="mt-4 text-xl font-black text-slate-950">
              No products found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try another search keyword, category, or sorting option.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product._id}
                  className="group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={product.images?.[0] || "/placeholder-product.png"}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                      <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-black text-indigo-700 shadow-sm backdrop-blur">
                        {product.category}
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50/95 px-3 py-1 text-xs font-black text-emerald-700 shadow-sm">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {product.status || "available"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="min-h-[82px]">
                      <h2 className="line-clamp-1 text-xl font-black text-slate-950">
                        {product.title}
                      </h2>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-3">
                        <div className="flex items-center gap-1.5 text-indigo-700">
                          <DollarSign className="h-4 w-4" />
                          <span className="text-xs font-bold">Price</span>
                        </div>

                        <p className="mt-1 text-lg font-black text-slate-950">
                          ${product.price}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Boxes className="h-4 w-4" />
                          <span className="text-xs font-bold">Stock</span>
                        </div>

                        <p className="mt-1 text-lg font-black text-slate-950">
                          {product.stock}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      <Link
                        href={`/products/${product._id}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Link>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleBuyNow(product._id)}
                          disabled={isPending}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Buy Now
                        </button>

                        <WishlistButton product={product} />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
                <p className="text-sm font-bold text-slate-500">
                  Page{" "}
                  <span className="text-slate-950">
                    {pagination.currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="text-slate-950">
                    {pagination.totalPages}
                  </span>
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={!pagination.hasPrevPage}
                    onClick={() => goToPage(pagination.currentPage - 1)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        type="button"
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`h-10 w-10 rounded-xl text-sm font-black transition ${
                          page === pagination.currentPage
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                            : "border border-slate-200 bg-white text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    disabled={!pagination.hasNextPage}
                    onClick={() => goToPage(pagination.currentPage + 1)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}