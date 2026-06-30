"use client";

import { motion } from "framer-motion";
import { BadgeCheck, MapPin, Star, Store, ArrowRight } from "lucide-react";
import Link from "next/link";

const sellers = [
  {
    name: "Ayesha Rahman",
    location: "Dhaka",
    rating: 4.9,
    sales: 42,
    category: "Electronics",
    image: "https://i.pravatar.cc/300?img=47",
  },
  {
    name: "Rakib Hasan",
    location: "Chattogram",
    rating: 4.8,
    sales: 35,
    category: "Cameras",
    image: "https://i.pravatar.cc/300?img=12",
  },
  {
    name: "Nadia Islam",
    location: "Sylhet",
    rating: 4.9,
    sales: 51,
    category: "Furniture",
    image: "https://i.pravatar.cc/300?img=32",
  },
];

export default function TrustedSellersShowcase() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-sm font-bold text-blue-700">
              <BadgeCheck className="h-4 w-4" />
              Trusted Sellers
            </span>

            <h2 className="mt-5 text-4xl font-black text-slate-950 md:text-5xl">
              Top-Rated Sellers
            </h2>

            <p className="mt-4 max-w-2xl text-slate-500">
              Meet reliable sellers with strong ratings, verified profiles, and successful marketplace activity.
            </p>
          </div>

          <Link
            href="/products"
            className="hidden items-center gap-2 font-semibold text-blue-700 md:flex"
          >
            Shop from sellers <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {sellers.map((seller, index) => (
            <motion.div
              key={seller.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-sm transition hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-xl"
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-blue-100 transition group-hover:bg-blue-600" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={seller.image}
                      alt={seller.name}
                      className="h-20 w-20 rounded-3xl object-cover ring-4 ring-white"
                    />
                    <span className="absolute -right-2 -bottom-2 rounded-full bg-blue-600 p-1.5 text-white">
                      <BadgeCheck className="h-4 w-4" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-950">
                      {seller.name}
                    </h3>

                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="h-4 w-4" />
                      {seller.location}
                    </p>
                  </div>
                </div>

                <div className="mb-6 flex items-center gap-1 text-blue-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ml-2 text-sm font-bold text-slate-700">
                    {seller.rating}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                    <p className="text-2xl font-black text-slate-950">
                      {seller.sales}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      Sales
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                    <Store className="mx-auto h-6 w-6 text-blue-600" />
                    <p className="mt-2 text-xs font-semibold text-slate-500">
                      {seller.category}
                    </p>
                  </div>
                </div>

                <Link
                  href="/products"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  View Seller Products
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}