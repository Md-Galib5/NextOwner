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
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="space-y-8"
    >
      <motion.section
        variants={{
          hidden: { opacity: 0, y: 28 },
          visible: { opacity: 1, y: 0 },
        }}
        animate={{
          boxShadow: [
            "0 0 0px rgba(37,99,235,0.10)",
            "0 0 32px rgba(37,99,235,0.28)",
            "0 0 0px rgba(37,99,235,0.10)",
          ],
        }}
        transition={{
          duration: 0.5,
          boxShadow: {
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-6"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-300/30 blur-2xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-indigo-300/30 blur-2xl"
        />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.15, 1] }}
                transition={{
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  scale: {
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
              Buyer Dashboard
            </div>

            <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
              Welcome back,{" "}
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  filter: [
                    "drop-shadow(0 0 0px rgba(37,99,235,0))",
                    "drop-shadow(0 0 10px rgba(37,99,235,0.35))",
                    "drop-shadow(0 0 0px rgba(37,99,235,0))",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="inline-block bg-gradient-to-r from-slate-950 via-blue-600 via-cyan-500 to-slate-950 bg-[length:250%_auto] bg-clip-text text-transparent"
              >
                {user?.name || "Buyer"}
              </motion.span>{" "}
              👋
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Track your orders, manage saved products, and discover trusted
              second-hand deals from one clean dashboard.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
            <motion.div
              whileHover={{ y: -4, scale: 1.03 }}
              className="rounded-2xl bg-blue-50 p-4"
            >
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <p className="mt-3 text-2xl font-black text-slate-950">92%</p>
              <p className="text-xs font-medium text-slate-500">
                Order success
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.03 }}
              className="rounded-2xl bg-green-50 p-4"
            >
              <ShieldCheck className="h-5 w-5 text-green-600" />
              <p className="mt-3 text-2xl font-black text-slate-950">Safe</p>
              <p className="text-xs font-medium text-slate-500">
                Buyer protected
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <DashboardStats statsData={buyerStats} />
      </motion.div>

      <motion.section
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0 },
        }}
        className="grid gap-6 xl:grid-cols-3"
      >
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
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
                whileHover={{ x: 6, scale: 1.01 }}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:bg-white hover:shadow-md"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
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

        <motion.div
          whileHover={{ y: -5, scale: 1.01 }}
          className="rounded-[2rem] border border-slate-800 bg-slate-950 p-6 text-white shadow-xl"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-fit rounded-2xl bg-white/10 p-3"
          >
            <Heart className="h-6 w-6 text-pink-300" />
          </motion.div>

          <h2 className="mt-5 text-xl font-bold">Wishlist Insight</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            You have 12 saved items. Revisit your wishlist and grab the best
            deals before they are gone.
          </p>

          <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-slate-100">
            Open Wishlist
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}