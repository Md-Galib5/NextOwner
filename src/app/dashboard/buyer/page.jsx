"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Heart, Package, ArrowRight, Sparkles } from "lucide-react";

import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { getBuyerOrders } from "@/lib/api/orders";
import { getWishlist } from "@/lib/api/wishlist";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function BuyerDashboardPage() {
  const { data: session, isPending } = useSession();

  const [stats, setStats] = useState({
    totalOrders: 0,
    wishlistItems: 0,
    recentPurchases: 0,
  });

  const [recentPurchases, setRecentPurchases] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const user = session?.user;

  const getArray = (res, key) => {
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.[key])) return res[key];
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.result)) return res.result;
    return [];
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        if (!user?.email) return;

        const email = String(user.email).trim().toLowerCase();

        const ordersRes = await getBuyerOrders(email);
        let wishlistRes = await getWishlist(email);
        let wishlist = getArray(wishlistRes, "wishlist");

        if (wishlist.length === 0 && BASE_URL) {
          const directRes = await fetch(
            `${BASE_URL}/api/wishlist/user/${encodeURIComponent(email)}`,
            { cache: "no-store" }
          );

          wishlistRes = await directRes.json();
          wishlist = getArray(wishlistRes, "wishlist");
        }

        const orders = getArray(ordersRes, "orders");

        const paidOrders = orders.filter(
          (order) => order?.paymentStatus === "paid"
        );

        setStats({
          totalOrders: orders.length,
          wishlistItems: wishlist.length,
          recentPurchases: paidOrders.length,
        });

        setRecentPurchases(
          [...orders]
            .sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
            .slice(0, 5)
        );
      } catch (error) {
        console.error("Buyer dashboard fetch error:", error);
      } finally {
        setLoadingData(false);
      }
    };

    if (!isPending) loadDashboardData();
  }, [isPending, user?.email]);

  if (isPending || loadingData) {
    return (
      <div className="flex h-[60vh] items-center justify-center px-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  const buyerStats = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      trend: "Orders",
    },
    {
      title: "Wishlist Items",
      value: stats.wishlistItems,
      icon: Heart,
      trend: "Saved",
    },
    {
      title: "Recent Purchases",
      value: stats.recentPurchases,
      icon: Package,
      trend: "Paid",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="w-full space-y-5 overflow-hidden sm:space-y-8"
    >
      <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-300/30 blur-2xl sm:h-48 sm:w-48" />
        <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-cyan-300/30 blur-2xl sm:h-56 sm:w-56" />

        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-2 text-xs font-semibold text-blue-600 shadow-sm sm:px-4 sm:text-sm">
              <Sparkles className="h-4 w-4" />
              Buyer Dashboard
            </div>

            <h1 className="text-2xl font-black leading-tight text-slate-950 sm:text-4xl">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-slate-950 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {user?.name || "Buyer"}
              </span>{" "}
              👋
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Track your orders, manage saved products, and discover trusted
              second-hand deals from one clean dashboard.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 rounded-3xl border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur sm:w-auto sm:min-w-[280px] sm:p-4">
            <div className="rounded-2xl bg-blue-50 p-4">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              <p className="mt-3 text-2xl font-black text-slate-950">
                {stats.totalOrders}
              </p>
              <p className="text-xs font-medium text-slate-500">
                Orders Placed
              </p>
            </div>

            <div className="rounded-2xl bg-cyan-50 p-4">
              <Heart className="h-5 w-5 text-cyan-600" />
              <p className="mt-3 text-2xl font-black text-slate-950">
                {stats.wishlistItems}
              </p>
              <p className="text-xs font-medium text-slate-500">Saved Items</p>
            </div>
          </div>
        </div>
      </section>

      <DashboardStats statsData={buyerStats} />

      <section className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950 sm:text-xl">
                Recent Purchases
              </h2>
              <p className="text-sm text-slate-500">
                Latest products you purchased
              </p>
            </div>

            <Link
              href="/dashboard/buyer/orders"
              className="inline-flex w-fit items-center gap-1 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentPurchases.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center sm:p-8">
                <Package className="mx-auto h-8 w-8 text-slate-400" />
                <p className="mt-3 text-sm font-semibold text-slate-500">
                  No purchases found yet.
                </p>
              </div>
            ) : (
              recentPurchases.map((item, index) => (
                <motion.div
                  key={item?._id || index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:bg-white hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <h3 className="line-clamp-1 font-semibold text-slate-900">
                      {item?.productInfo?.title || "Unknown Product"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      ${Number(item?.productInfo?.price || 0)}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {item?.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "No date"}
                    </p>
                  </div>

                  <span
                    className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      item?.orderStatus === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : item?.orderStatus === "delivered"
                        ? "bg-green-100 text-green-700"
                        : item?.orderStatus === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item?.orderStatus || "processing"}
                  </span>
                </motion.div>
              ))
            )}
          </div>
        </div>

        <motion.div
          whileHover={{ y: -4 }}
          className="h-fit rounded-3xl border border-blue-100 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-5 text-white shadow-xl sm:rounded-[2rem] sm:p-6 xl:sticky xl:top-24"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="w-fit rounded-2xl bg-white/10 p-3">
              <Heart className="h-6 w-6 text-pink-300" />
            </div>

            <div className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-black text-blue-100">
              {stats.wishlistItems} Saved
            </div>
          </div>

          <h2 className="mt-5 text-xl font-black">Wishlist Insight</h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            You have {stats.wishlistItems} saved item
            {stats.wishlistItems === 1 ? "" : "s"}. Revisit your wishlist and
            grab the best deals before they are gone.
          </p>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4">
            <p className="text-xs font-semibold text-slate-300">
              Saved Products
            </p>
            <p className="mt-1 text-3xl font-black text-white">
              {stats.wishlistItems}
            </p>
          </div>

          <Link
            href="/dashboard/buyer/wishlist"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
          >
            Open Wishlist
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
}