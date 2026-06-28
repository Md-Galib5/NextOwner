"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Package,
  ShoppingCart,
  ShieldCheck,
  ArrowRight,
  Activity,
  LayoutDashboard,
} from "lucide-react";

export default function AdminOverview({ stats }) {
  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      text: "Registered platform users",
    },
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      text: "Products listed by sellers",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      text: "Customer orders created",
    },
  ];

  const quickLinks = [
    {
      title: "User Management",
      desc: "View buyers, sellers, and manage user accounts.",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "Product Control",
      desc: "Review, manage, or remove marketplace products.",
      href: "/dashboard/admin/products",
      icon: Package,
    },
    {
      title: "Order Monitoring",
      desc: "Track orders, delivery status, and platform activity.",
      href: "/dashboard/admin/orders",
      icon: ShoppingCart,
    },
  ];

  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 text-white shadow-xl"
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              Admin Control Panel
            </div>

            <h1 className="text-3xl font-black md:text-5xl">
              Admin Overview
            </h1>

            <p className="mt-3 max-w-xl text-sm text-blue-50">
              The admin has full control over the platform. Monitor users,
              products, and orders from one powerful dashboard.
            </p>
          </div>

          <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
            <Activity className="mb-3 h-9 w-9" />
            <p className="text-sm text-blue-50">System Status</p>
            <h2 className="text-3xl font-black">Active</h2>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-500">
                    {card.title}
                  </p>

                  <h3 className="mt-3 text-4xl font-black text-slate-950">
                    {card.value}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">{card.text}</p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-4 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {quickLinks.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08 }}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-black text-slate-950">
                {item.title}
              </h3>

              <p className="mt-2 min-h-12 text-sm text-slate-500">
                {item.desc}
              </p>

              <Link
                href={item.href}
                className="mt-5 inline-flex w-full items-center justify-between rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Open Panel
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
            <LayoutDashboard className="h-6 w-6" />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-950">
              Platform Summary
            </h3>
            <p className="text-sm text-slate-500">
              Manage the marketplace, monitor platform growth, and keep the
              system running smoothly.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}