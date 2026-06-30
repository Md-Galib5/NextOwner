"use client";

import { Package, Users, ShoppingBag, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function MarketplaceStatistics({ stats }) {
  const items = [
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: Package,
    },
    {
      title: "Total Sellers",
      value: stats?.totalSellers || 0,
      icon: Users,
    },
    {
      title: "Total Buyers",
      value: stats?.totalBuyers || 0,
      icon: ShoppingBag,
    },
    {
      title: "Completed Orders",
      value: stats?.completedOrders || 0,
      icon: BadgeCheck,
    },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-white/15 px-5 py-2 text-sm font-bold text-white">
            Marketplace Growth
          </span>

          <h2 className="mt-5 text-4xl font-black text-white md:text-5xl">
            Trusted By Thousands
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Real numbers showing the growth of the NextOwner marketplace.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-700">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-4xl font-black text-white">
                  {item.value.toLocaleString()}
                </h3>

                <p className="mt-2 text-blue-100">
                  {item.title}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}