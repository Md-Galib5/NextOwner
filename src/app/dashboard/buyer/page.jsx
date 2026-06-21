"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Package,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

import { DashboardStats } from "@/components/dashboard/DashboardStats";

export default function BuyerDashboardPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex h-40 items-center justify-center text-slate-500">
        Loading...
      </div>
    );
  }

  const user = session?.user;

  const buyerStats = [
    { title: "Total Orders", value: "24", icon: ShoppingCart, trend: "+8%" },
    { title: "Wishlist Items", value: "12", icon: Heart, trend: "+14%" },
    { title: "Recent Purchases", value: "8", icon: Package, trend: "+6%" },
    { title: "Pending Orders", value: "3", icon: Clock, trend: "+2%" },
  ];

  const recentPurchases = [
    { name: "iPhone 13 Pro", price: "$650", status: "Delivered" },
    { name: "Gaming Keyboard", price: "$45", status: "Shipped" },
    { name: "Office Chair", price: "$120", status: "Pending" },
  ];

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/60"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-200/30 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-indigo-200/30 blur-2xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Buyer Dashboard
            </div>

            <h1 className="text-3xl font-black text-slate-950 sm:text-4xl">
              Welcome back, {user?.name || "Buyer"} 👋
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Track your orders, manage saved products, and discover trusted
              second-hand deals from one clean dashboard.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
            <div className="rounded-2xl bg-blue-50 p-4">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <p className="mt-3 text-2xl font-black text-slate-950">92%</p>
              <p className="text-xs font-medium text-slate-500">
                Order success
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-4">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              <p className="mt-3 text-2xl font-black text-slate-950">Safe</p>
              <p className="text-xs font-medium text-slate-500">
                Buyer protected
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <DashboardStats statsData={buyerStats} />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="grid gap-6 xl:grid-cols-3"
      >
        <div className="xl:col-span-2 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Recent Purchases
              </h2>
              <p className="text-sm text-slate-500">
                Latest products you purchased
              </p>
            </div>

            <button className="hidden items-center gap-1 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 sm:flex">
              View all
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            {recentPurchases.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.25 + index * 0.08 }}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:bg-white hover:shadow-md"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{item.price}</p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-xl">
          <div className="rounded-2xl bg-white/10 p-3 w-fit">
            <Heart className="h-6 w-6 text-pink-300" />
          </div>

          <h2 className="mt-5 text-xl font-bold">Wishlist Insight</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            You have 12 saved items. Revisit your wishlist and grab the best
            deals before they are gone.
          </p>

          <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-slate-100">
            Open Wishlist
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.section>
    </div>
  );
}