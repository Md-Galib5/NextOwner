"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  PackageCheck,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  Eye,
  User,
  Mail,
  MapPin,
  CreditCard,
  CalendarDays,
  X,
} from "lucide-react";
import { updateOrderStatus } from "@/lib/api/orders";
import { toast } from "react-toastify";

const statusStyle = {
  processing: "bg-amber-50 text-amber-700 ring-amber-200",
  pending: "bg-orange-50 text-orange-700 ring-orange-200",
  shipped: "bg-blue-50 text-blue-700 ring-blue-200",
  delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  cancelled: "bg-red-50 text-red-700 ring-red-200",
};

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ${className}`}
    >
      {children}
    </span>
  );
}

export default function SellerOrdersClient({ orders = [], res = {} }) {
    console.log(orders)
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const totalOrders = res.totalOrders || orders.length;
  const processingOrders =
    res.processingOrders ||
    orders.filter((order) => order.orderStatus === "processing").length;
  const deliveredOrders =
    res.deliveredOrders ||
    orders.filter((order) => order.orderStatus === "delivered").length;
  const cancelledOrders = orders.filter(
    (order) => order.orderStatus === "cancelled"
  ).length;

  const handleUpdateStatus = async (id, status) => {
    try {
      setLoadingId(id);
      const result = await updateOrderStatus(id, status);

      if (result?.success || result?.modifiedCount > 0) {
        toast.success(`Order marked as ${status}`);
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to update order");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

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
              <PackageCheck className="h-4 w-4" />
              Seller Order Center
            </div>
            <h1 className="text-3xl font-black md:text-5xl">
              Manage Orders
            </h1>
            <p className="mt-3 max-w-xl text-sm text-blue-50">
              Track buyer purchases, delivery progress, payments, and order
              actions from one clean dashboard.
            </p>
          </div>

          <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
            <ShoppingBag className="mb-3 h-9 w-9" />
            <p className="text-sm text-blue-50">Total Orders</p>
            <h2 className="text-4xl font-black">{totalOrders}</h2>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Total Orders",
            value: totalOrders,
            icon: ShoppingBag,
          },
          {
            title: "Processing",
            value: processingOrders,
            icon: Clock,
          },
          {
            title: "Delivered",
            value: deliveredOrders,
            icon: CheckCircle2,
          },
          {
            title: "Cancelled",
            value: cancelledOrders,
            icon: XCircle,
          },
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

      {orders.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-blue-200 bg-blue-50/60 p-12 text-center">
          <PackageCheck className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-4 text-2xl font-black text-slate-900">
            No orders yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            When buyers purchase your products, the order list will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="grid gap-5 lg:grid-cols-[90px_1.5fr_1fr_1fr_auto] lg:items-center">
                <img
                  src={order.productInfo?.image || "/placeholder.png"}
                  alt={order.productInfo?.title || "Product"}
                  className="h-20 w-20 rounded-2xl object-cover ring-1 ring-slate-200"
                />

                <div>
                  <p className="font-mono text-xs font-bold text-blue-600">
                    #{order._id?.slice(-8).toUpperCase()}
                  </p>
                  <h3 className="mt-1 text-lg font-black text-slate-900">
                    {order.productInfo?.title || "Unknown Product"}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {order.productInfo?.category || "N/A"} •{" "}
                    {order.productInfo?.condition || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Buyer
                  </p>
                  <p className="mt-1 font-bold text-slate-900">
                    {order.buyerInfo?.name || "N/A"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {order.buyerInfo?.email || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Amount
                  </p>
                  <p className="mt-1 text-xl font-black text-slate-900">
                    ${Number(order.productInfo?.price || 0).toLocaleString()}
                  </p>
                  <Badge className="mt-2 bg-emerald-50 text-emerald-700 ring-emerald-200">
                    {order.paymentStatus || "pending"}
                  </Badge>
                </div>

                <div className="flex flex-wrap justify-start gap-2 lg:justify-end">
                  <Badge
                    className={
                      statusStyle[order.orderStatus] ||
                      "bg-slate-50 text-slate-700 ring-slate-200"
                    }
                  >
                    {order.orderStatus || "processing"}
                  </Badge>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>

                  {order.orderStatus === "processing" && (
                    <button
                      disabled={loadingId === order._id}
                      onClick={() =>
                        handleUpdateStatus(order._id, "delivered")
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                      <Truck className="h-4 w-4" />
                      Deliver
                    </button>
                  )}

                  {!["delivered", "cancelled"].includes(order.orderStatus) && (
                    <button
                      disabled={loadingId === order._id}
                      onClick={() =>
                        handleUpdateStatus(order._id, "cancelled")
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100 disabled:opacity-60"
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-bold text-blue-600">
                  #{selectedOrder._id?.slice(-8).toUpperCase()}
                </p>
                <h2 className="mt-1 text-2xl font-black text-slate-900">
                  Order Details
                </h2>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full bg-slate-100 p-2 hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="font-black text-slate-900">
                  {selectedOrder.productInfo?.title || "N/A"}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedOrder.productInfo?.description || "No description"}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Info icon={User} label="Buyer" value={selectedOrder.buyerInfo?.name} />
                <Info icon={Mail} label="Email" value={selectedOrder.buyerInfo?.email} />
                <Info icon={MapPin} label="Delivery" value={selectedOrder.buyerInfo?.deliveryAddress} />
                <Info icon={CreditCard} label="Payment" value={selectedOrder.paymentStatus} />
                <Info
                  icon={CalendarDays}
                  label="Date"
                  value={
                    selectedOrder.createdAt
                      ? new Date(selectedOrder.createdAt).toLocaleString()
                      : "N/A"
                  }
                />
                <Info
                  icon={ShoppingBag}
                  label="Price"
                  value={`$${Number(
                    selectedOrder.productInfo?.price || 0
                  ).toLocaleString()}`}
                />
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-slate-400">
                  Transaction ID
                </p>
                <p className="mt-1 break-all rounded-xl bg-slate-50 p-3 text-sm font-medium text-slate-700">
                  {selectedOrder.stripePaymentIntentId || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="mb-2 flex items-center gap-2 text-blue-600">
        <Icon className="h-4 w-4" />
        <p className="text-xs font-bold uppercase">{label}</p>
      </div>
      <p className="font-bold text-slate-900">{value || "N/A"}</p>
    </div>
  );
}