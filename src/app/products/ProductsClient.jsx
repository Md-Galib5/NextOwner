"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Search,
  SlidersHorizontal,
  DollarSign,
  Eye,
  Boxes,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Heart,
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
  pagination = {},
  filters = {
    search: "",
    category: "all",
    sort: "latest",
  },
}) {
  const router = useRouter();
  const [searchText, setSearchText] = useState(filters.search || "");

  const currentPage = Number(pagination?.currentPage || 1);
  const totalPages = Number(pagination?.totalPages || 1);
  const totalProducts = Number(pagination?.totalProducts || products.length);

  const buildQuery = (nextValues = {}) => {
    const params = new URLSearchParams();

    const search = nextValues.search ?? filters.search;
    const category = nextValues.category ?? filters.category;
    const sort = nextValues.sort ?? filters.sort;
    const page = nextValues.page ?? currentPage;

    if (search) params.set("search", search);
    if (category && category !== "all") params.set("category", category);
    if (sort && sort !== "latest") params.set("sort", sort);

    params.set("page", String(page));
    return params.toString();
  };

  const updateFilter = (key, value) => {
    router.push(`/products?${buildQuery({ [key]: value, page: 1 })}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilter("search", searchText.trim());
  };

  const clearFilters = () => {
    setSearchText("");
    router.push("/products?page=1");
  };

  const changePage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    router.push(`/products?${buildQuery({ page })}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-slate-200/70 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                <ShoppingBag className="h-4 w-4" />
                Verified Marketplace
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Explore Products
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Discover approved second-hand products from trusted sellers.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Total Listings
              </p>
              <p className="mt-1 text-2xl font-black text-slate-950">
                {totalProducts}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.7rem] border border-slate-200 bg-white p-4 shadow-sm">
          <form
            onSubmit={handleSearchSubmit}
            className="grid gap-3 lg:grid-cols-[1fr_220px_220px_120px]"
          >
            <div className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
              <Search className="h-4 w-4 text-slate-400" />

              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400"
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
              className="h-12 rounded-2xl bg-blue-600 px-4 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200"
            >
              Search
            </button>
          </form>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Showing{" "}
              <span className="font-black text-slate-950">
                {products.length}
              </span>{" "}
              of{" "}
              <span className="font-black text-slate-950">
                {totalProducts}
              </span>{" "}
              products
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="text-left text-sm font-bold text-slate-500 transition hover:text-blue-600 sm:text-right"
            >
              Clear filters
            </button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <ShoppingBag className="mx-auto h-12 w-12 text-slate-400" />

            <h2 className="mt-4 text-xl font-black text-slate-950">
              No approved products found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search, category, or sorting option.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product._id}
                  className="group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={product.images?.[0] || "/placeholder-product.png"}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                      <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-black text-blue-700 shadow-sm backdrop-blur">
                        {product.category}
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50/95 px-3 py-1 text-xs font-black text-blue-700 shadow-sm">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Approved
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
                      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-3">
                        <div className="flex items-center gap-1.5 text-blue-700">
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

                    <div className="mt-5 grid grid-cols-[1fr_auto] gap-3">
                      <Link
                        href={`/products/${product._id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200"
                      >
                        <Eye className="h-4 w-4" />
                        View Product
                      </Link>

                      <WishlistButton product={product} />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={!pagination?.hasPrevPage}
                  onClick={() => changePage(currentPage - 1)}
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => changePage(page)}
                        className={`h-11 w-11 rounded-xl text-sm font-black transition ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={!pagination?.hasNextPage}
                  onClick={() => changePage(currentPage + 1)}
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}