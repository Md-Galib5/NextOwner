"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  ChartNoAxesCombined,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  PackageCheck,
} from "lucide-react";

const salesData = [
  { month: "Jan", sales: 450 },
  { month: "Feb", sales: 780 },
  { month: "Mar", sales: 620 },
  { month: "Apr", sales: 980 },
  { month: "May", sales: 1250 },
  { month: "Jun", sales: 1680 },
];

const productData = [
  { name: "Laptop", sold: 18 },
  { name: "Phone", sold: 14 },
  { name: "Headphone", sold: 10 },
  { name: "Camera", sold: 8 },
  { name: "Watch", sold: 6 },
];

export default function SalesAnalyticsClient() {
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalProductsSold = productData.reduce((sum, item) => sum + item.sold, 0);

  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 text-white shadow-xl"
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              <ChartNoAxesCombined className="h-4 w-4" />
              Sales Analytics
            </div>

            <h1 className="text-3xl font-black md:text-5xl">
              Seller Performance
            </h1>

            <p className="mt-3 max-w-xl text-sm text-blue-50">
              Visual representation of your monthly sales trend and top selling
              products.
            </p>
          </div>

          <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
            <TrendingUp className="mb-3 h-9 w-9" />
            <p className="text-sm text-blue-50">Monthly Growth</p>
            <h2 className="text-4xl font-black">+32%</h2>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon={DollarSign}
          title="Total Sales"
          value={`$${totalSales.toLocaleString()}`}
        />
        <StatCard
          icon={ShoppingBag}
          title="Products Sold"
          value={totalProductsSold}
        />
        <StatCard icon={PackageCheck} title="Best Product" value="Laptop" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-900">
              Monthly Sales Trend
            </h2>
            <p className="text-sm text-slate-500">
              Sales chart based on monthly revenue.
            </p>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#salesColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-900">
              Top Selling Products
            </h2>
            <p className="text-sm text-slate-500">
              Products with highest sales volume.
            </p>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="sold" fill="#2563eb" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, title, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-black text-slate-900">{value}</h3>
        </div>

        <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}