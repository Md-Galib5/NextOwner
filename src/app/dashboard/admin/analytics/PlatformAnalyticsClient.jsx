"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  ShoppingBag,
  Package,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Activity,
} from "lucide-react";

const userGrowth = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 210 },
  { month: "Mar", users: 340 },
  { month: "Apr", users: 480 },
  { month: "May", users: 690 },
  { month: "Jun", users: 920 },
];

const categoryPerformance = [
  { category: "Laptop", sales: 45 },
  { category: "Mobile", sales: 78 },
  { category: "Camera", sales: 28 },
  { category: "Watch", sales: 38 },
  { category: "Furniture", sales: 55 },
];

const monthlyOrders = [
  { month: "Jan", orders: 80 },
  { month: "Feb", orders: 120 },
  { month: "Mar", orders: 170 },
  { month: "Apr", orders: 210 },
  { month: "May", orders: 260 },
  { month: "Jun", orders: 330 },
];

const topCategories = [
  { name: "Mobile", value: 35 },
  { name: "Laptop", value: 25 },
  { name: "Furniture", value: 18 },
  { name: "Watch", value: 12 },
  { name: "Camera", value: 10 },
];

const COLORS = ["#2563eb", "#06b6d4", "#8b5cf6", "#f59e0b", "#10b981"];

export default function PlatformAnalyticsClient() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 text-white shadow-xl"
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              <BarChart3 className="h-4 w-4" />
              Platform Analytics
            </div>

            <h1 className="text-3xl font-black md:text-5xl">
              Business Insights
            </h1>

            <p className="mt-3 max-w-2xl text-sm text-blue-50">
              Understand platform growth, user activity, product performance,
              monthly orders, and overall revenue trends.
            </p>
          </div>

          <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
            <Activity className="mb-3 h-9 w-9" />
            <p className="text-sm text-blue-50">Total Revenue</p>
            <h2 className="text-4xl font-black">$48.5K</h2>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Total Users", value: "920", icon: Users },
          { title: "Total Orders", value: "330", icon: ShoppingBag },
          { title: "Products", value: "1.2K", icon: Package },
          { title: "Revenue", value: "$48.5K", icon: DollarSign },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {item.title}
                </p>
                <h3 className="mt-2 text-3xl font-black text-slate-900">
                  {item.value}
                </h3>
              </div>

              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                <item.icon className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          icon={TrendingUp}
          title="User Growth Chart"
          subtitle="Monthly registered users"
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#2563eb"
                fill="#dbeafe"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          icon={BarChart3}
          title="Category Performance Chart"
          subtitle="Sales by product category"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563eb" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          icon={ShoppingBag}
          title="Monthly Orders Chart"
          subtitle="Orders placed per month"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyOrders}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#06b6d4"
                strokeWidth={4}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
<ChartCard
  icon={PieIcon}
  title="Top Categories Chart"
  subtitle="Category share by total sales"
>
  <div className="grid items-center gap-6 lg:grid-cols-[1fr_220px]">
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={topCategories}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={4}
        >
          {topCategories.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>

    {/* Custom Legend */}
    <div className="space-y-3">
      <h4 className="text-sm font-black uppercase tracking-wide text-slate-400">
        Category Share
      </h4>

      {topCategories.map((item, index) => (
        <div
          key={item.name}
          className="flex items-center justify-between rounded-2xl border border-slate-200 p-3"
        >
          <div className="flex items-center gap-3">
            <span
              className="h-3.5 w-3.5 rounded-full"
              style={{
                backgroundColor: COLORS[index],
              }}
            />

            <span className="font-semibold text-slate-700">
              {item.name}
            </span>
          </div>

          <span className="text-sm font-black text-slate-900">
            {item.value}%
          </span>
        </div>
      ))}
    </div>
  </div>
</ChartCard>
      </div>
    </section>
  );
}

function ChartCard({ icon: Icon, title, subtitle, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {children}
    </motion.div>
  );
}