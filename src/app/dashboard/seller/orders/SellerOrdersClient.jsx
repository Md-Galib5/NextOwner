// src/app/dashboard/seller/orders/SellerOrdersClient.jsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  AlertTriangle,
} from "lucide-react";
import { updateOrderStatus } from "@/lib/api/orders";
import { toast } from "react-toastify";

const statusStyle = {
  pending: "bg-orange-50 text-orange-700 ring-orange-200",
  processing: "bg-blue-50 text-blue-700 ring-blue-200",
  delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  cancelled: "bg-red-50 text-red-700 ring-red-200",
  rejected: "bg-red-50 text-red-700 ring-red-200",
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

function SmallButton({ children, icon: Icon, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-3.5 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </button>
  );
}

export default function SellerOrdersClient({ orders = [], res = {} }) {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
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

  const handleUpdateStatus = async () => {
    if (!confirmModal) return;

    const { id, orderStatus } = confirmModal;

    try {
      setLoadingId(id);

      const result = await updateOrderStatus(id, orderStatus);

      if (result?.success || result?.modifiedCount > 0) {
        toast.success(`Order marked as ${orderStatus}`);
        setConfirmModal(null);
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
      {/* HERO - SAME SIZE */}
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

            <h1 className="text-3xl font-black md:text-5xl">Manage Orders</h1>

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

      {/* STATS - SAME SIZE */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Total Orders", value: totalOrders, icon: ShoppingBag },
          { title: "Processing", value: processingOrders, icon: Clock },
          { title: "Delivered", value: deliveredOrders, icon: CheckCircle2 },
          { title: "Cancelled", value: cancelledOrders, icon: XCircle },
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
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[1.7fr_1fr_0.8fr_1.2fr] border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-400 lg:grid">
            <p>Product</p>
            <p>Buyer</p>
            <p>Amount</p>
            <p className="text-right">Actions</p>
          </div>

          <div className="divide-y divide-slate-100">
            {orders.map((order, index) => {
              const currentStatus = order.orderStatus || "pending";

              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="grid gap-5 px-5 py-4 transition hover:bg-blue-50/40 lg:grid-cols-[1.7fr_1fr_0.8fr_1.2fr] lg:items-center lg:px-6"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={order.productInfo?.image || "/placeholder.png"}
                      alt={order.productInfo?.title || "Product"}
                      className="h-16 w-16 rounded-2xl object-cover ring-1 ring-slate-200"
                    />

                    <div className="min-w-0">
                      <p className="font-mono text-xs font-bold text-blue-600">
                        #{order._id?.slice(-8).toUpperCase()}
                      </p>

                      <h3 className="mt-1 truncate text-lg font-black text-slate-900">
                        {order.productInfo?.title || "Unknown Product"}
                      </h3>

                      <p className="mt-1 truncate text-sm text-slate-500">
                        {order.productInfo?.category || "N/A"} •{" "}
                        {order.productInfo?.condition || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {order.buyerInfo?.name || "N/A"}
                    </p>
                    <p className="truncate text-sm text-slate-500">
                      {order.buyerInfo?.email || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-black text-slate-900">
                      ${Number(order.productInfo?.price || 0).toLocaleString()}
                    </p>
                    <Badge className="mt-2 bg-emerald-50 text-emerald-700 ring-emerald-200">
                      {order.paymentStatus || "pending"}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
                    <Badge
                      className={
                        statusStyle[currentStatus] ||
                        "bg-slate-50 text-slate-700 ring-slate-200"
                      }
                    >
                      {currentStatus}
                    </Badge>

                    <SmallButton
                      icon={Eye}
                      onClick={() => setSelectedOrder(order)}
                      className="border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      View
                    </SmallButton>

                    {currentStatus === "pending" && (
                      <SmallButton
                        icon={Clock}
                        disabled={loadingId === order._id}
                        onClick={() =>
                          setConfirmModal({
                            id: order._id,
                            orderStatus: "processing",
                            title: "Move to processing?",
                            message:
                              "This order will be marked as processing and prepared for delivery.",
                            buttonText: "Yes, Process",
                            type: "blue",
                          })
                        }
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Process
                      </SmallButton>
                    )}

                    {currentStatus === "processing" && (
                      <SmallButton
                        icon={Truck}
                        disabled={loadingId === order._id}
                        onClick={() =>
                          setConfirmModal({
                            id: order._id,
                            orderStatus: "delivered",
                            title: "Mark as delivered?",
                            message:
                              "This order will be completed and marked as delivered.",
                            buttonText: "Yes, Done",
                            type: "green",
                          })
                        }
                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                      >
                        Done
                      </SmallButton>
                    )}

                    {!["delivered", "cancelled", "rejected"].includes(
                      currentStatus
                    ) && (
                      <SmallButton
                        icon={XCircle}
                        disabled={loadingId === order._id}
                        onClick={() =>
                          setConfirmModal({
                            id: order._id,
                            orderStatus: "cancelled",
                            title: "Cancel this order?",
                            message:
                              "This action will cancel the order. You can review before confirming.",
                            buttonText: "Yes, Cancel",
                            type: "red",
                          })
                        }
                        className="bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        Cancel
                      </SmallButton>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl"
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONFIRM MODAL */}
      <AnimatePresence>
        {confirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 18 }}
              className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    confirmModal.type === "red"
                      ? "bg-red-50 text-red-600"
                      : confirmModal.type === "green"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <AlertTriangle className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {confirmModal.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {confirmModal.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setConfirmModal(null)}
                  className="h-10 rounded-full border border-slate-200 px-5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  No
                </button>

                <button
                  disabled={loadingId === confirmModal.id}
                  onClick={handleUpdateStatus}
                  className={`h-10 rounded-full px-5 text-sm font-bold text-white disabled:opacity-60 ${
                    confirmModal.type === "red"
                      ? "bg-red-600 hover:bg-red-700"
                      : confirmModal.type === "green"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loadingId === confirmModal.id
                    ? "Updating..."
                    : confirmModal.buttonText}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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