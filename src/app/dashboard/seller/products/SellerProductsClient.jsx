"use client";

import { motion } from "framer-motion";
import { Package, DollarSign, Boxes, Eye, Pencil, Trash2 } from "lucide-react";

export default function SellerProductsClient({ products }) {
  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-blue-100">
              Seller Inventory
            </p>
            <h1 className="text-3xl font-black md:text-4xl">My Products</h1>
            <p className="mt-3 max-w-xl text-sm text-slate-300">
              Manage your listings, track stock, update pricing, and keep your
              marketplace profile professional.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <p className="text-sm text-slate-300">Total Products</p>
            <h2 className="mt-1 text-4xl font-black">{products.length}</h2>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <Package className="mx-auto h-14 w-14 text-slate-400" />
          <h2 className="mt-4 text-xl font-bold text-slate-900">
            No products found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Start by adding your first product listing.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:shadow-xl"
            >
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={product.images?.[0] || "/placeholder-product.png"}
                  alt={product.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-700 shadow-sm">
                  {product.status}
                </span>

                <span className="absolute right-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-bold text-white">
                  {product.condition}
                </span>
              </div>

              <div className="space-y-5 p-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                    {product.category}
                  </p>

                  <h2 className="mt-1 line-clamp-1 text-xl font-black text-slate-950">
                    {product.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-xs font-semibold">Price</span>
                    </div>
                    <p className="mt-1 text-lg font-black text-slate-950">
                      ${product.price}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Boxes className="h-4 w-4" />
                      <span className="text-xs font-semibold">Stock</span>
                    </div>
                    <p className="mt-1 text-lg font-black text-slate-950">
                      {product.stock}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
                    <Eye className="h-4 w-4" />
                    View
                  </button>

                  <button className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}