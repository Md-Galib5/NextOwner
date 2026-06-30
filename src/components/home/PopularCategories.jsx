"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PopularCategories({ categories = [] }) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            Browse Categories
          </span>

          <h2 className="mt-5 text-4xl font-black text-slate-950 md:text-5xl">
            Popular Categories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Explore products from the most active categories in our marketplace.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
            >
              <Link
                href={`/products?category=${encodeURIComponent(
                  category.name
                )}`}
                className="group block overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">
                      {category.totalProducts} Products
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-black text-slate-900 transition-colors group-hover:text-blue-600">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Browse all {category.name} products
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white py-16 text-center">
            <h3 className="text-xl font-bold text-slate-900">
              No Categories Found
            </h3>

            <p className="mt-3 text-slate-500">
              Categories will appear here once products are added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}