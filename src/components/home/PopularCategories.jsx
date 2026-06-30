"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PopularCategories({ categories = [] }) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
              Browse Categories
            </span>

            <h2 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">
              Popular Categories
            </h2>

            <p className="mt-3 text-slate-500">
              Explore products from our most active categories.
            </p>
          </div>

          <Link
            href="/products"
            className="hidden items-center gap-2 font-semibold text-blue-700 md:flex"
          >
            View All <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white py-16 text-center">
            <h3 className="text-xl font-bold text-slate-900">
              No Categories Found
            </h3>
            <p className="mt-3 text-slate-500">
              Categories will appear here once products are added.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/20 to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">
                      {category.totalProducts} Products
                    </span>
                  </div>
                </div>

                <div className="p-5 text-center">
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Browse all {category.name} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}