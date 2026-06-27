"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  X,
  ShoppingBag,
  Receipt,
  User,
  Store,
  CreditCard,
  Clock,
  Hash,
  CheckCircle2,
  AlertTriangle,
  Truck,
} from "lucide-react";
import { Chip } from "@heroui/react";
import { toast } from "react-toastify";
import { cancelOrder } from "@/lib/api/orders";

function PaymentBadge({ status }) {
  return (
    <Chip color={status === "paid" ? "success" : "warning"} size="sm" variant="flat">
      {status || "pending"}
    </Chip>
  );
}

function OrderBadge({ status }) {
  const color =
    status === "cancelled"
      ? "danger"
      : status === "delivered"
      ? "success"
      : status === "shipped"
      ? "primary"
      : "warning";

  return (
    <Chip color={color} size="sm" variant="flat" className="capitalize">
      {status || "pending"}
    </Chip>
  );
}

// function DetailRow({ icon: Icon, label, value }) {
//   return (
//     <div className="flex gap-3 border-b border-dashed border-slate-100 py-3 last:border-0">
//       <div className="rounded-xl bg-blue-50 p-2">
//         <Icon className="h-4 w-4 text-blue-600" />
//       </div>

//       <div>
//         <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//           {label}
//         </p>
//         <p className="break-all text-sm font-semibold text-slate-800">
//           {value || "N/A"}
//         </p>
//       </div>
//     </div>
//   );
// }

// function OrderModal({ order, onClose }) {
//   return (
//     <div
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-md"
//     >
//       <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow"
//         >
//           <X className="h-4 w-4" />
//         </button>

//         <div className="rounded-t-[2rem] bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white">
//           <div className="flex items-center gap-3">
//             <div className="rounded-2xl bg-white/20 p-3">
//               <ShoppingBag className="h-5 w-5" />
//             </div>

//             <div>
//               <h2 className="text-xl font-black">Order Details</h2>
//               <p className="text-sm text-white/70">
//                 #{order?._id?.slice(-8).toUpperCase()}
//               </p>
//             </div>
//           </div>

//           <div className="mt-4 flex gap-2">
//             <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
//               Payment: {order?.paymentStatus || "pending"}
//             </span>
//             <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
//               Order: {order?.orderStatus || "processing"}
//             </span>
//           </div>
//         </div>

//         <div className="p-6">
//           <h3 className="mb-2 text-xs font-black uppercase tracking-widest text-blue-600">
//             Product Information
//           </h3>

//           <DetailRow
//             icon={ShoppingBag}
//             label="Product Name"
//             value={order?.productInfo?.title}
//           />

//           <DetailRow
//             icon={CreditCard}
//             label="Price"
//             value={`$${order?.productInfo?.price || 0}`}
//           />

//           <DetailRow
//             icon={Hash}
//             label="Product ID"
//             value={order?.productInfo?.productId}
//           />

//           <h3 className="mb-2 mt-6 text-xs font-black uppercase tracking-widest text-blue-600">
//             Payment Details
//           </h3>

//           <DetailRow
//             icon={Receipt}
//             label="Transaction ID"
//             value={order?.transactionId || order?.stripePaymentIntentId}
//           />

//           <DetailRow
//             icon={Clock}
//             label="Order Date"
//             value={
//               order?.createdAt
//                 ? new Date(order.createdAt).toLocaleString()
//                 : "N/A"
//             }
//           />

//           <DetailRow
//             icon={CheckCircle2}
//             label="Payment Status"
//             value={order?.paymentStatus}
//           />

//           <h3 className="mb-2 mt-6 text-xs font-black uppercase tracking-widest text-blue-600">
//             Buyer Information
//           </h3>

//           <DetailRow
//             icon={User}
//             label="Buyer Name"
//             value={order?.buyerInfo?.name}
//           />

//           <DetailRow
//             icon={Receipt}
//             label="Buyer Email"
//             value={order?.buyerInfo?.email}
//           />

//           <DetailRow
//             icon={Truck}
//             label="Delivery Address"
//             value={order?.buyerInfo?.deliveryAddress || order?.buyerInfo?.location}
//           />

//           <h3 className="mb-2 mt-6 text-xs font-black uppercase tracking-widest text-blue-600">
//             Seller Information
//           </h3>

//           <DetailRow
//             icon={Store}
//             label="Seller Name"
//             value={order?.sellerInfo?.name}
//           />

//           <DetailRow
//             icon={Receipt}
//             label="Seller Email"
//             value={order?.sellerInfo?.email}
//           />

//           <DetailRow
//             icon={CreditCard}
//             label="Phone"
//             value={order?.sellerInfo?.phone}
//           />

//           <button
//             onClick={onClose}
//             className="mt-6 w-full rounded-full bg-blue-600 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

function DetailRow({ icon: Icon, label, value, highlight = false }) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-blue-100 hover:shadow-md">
      <div
        className={`rounded-xl p-2.5 ${
          highlight ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
          {label}
        </p>
        <p
          className={`mt-1 break-all text-sm font-bold ${
            highlight ? "text-blue-600" : "text-slate-900"
          }`}
        >
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="mb-3 mt-6 flex items-center gap-2 first:mt-0">
      <div className="rounded-xl bg-blue-100 p-2">
        <Icon className="h-4 w-4 text-blue-600" />
      </div>
      <h3 className="text-xs font-black uppercase tracking-[0.22em] text-slate-800">
        {title}
      </h3>
    </div>
  );
}

function OrderModal({ order, onClose }) {
  const price = Number(order?.productInfo?.price || 0);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-lg"
    >
      <div className="relative max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-[2.2rem] border border-white/60 bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 rounded-full bg-white/90 p-2.5 text-slate-500 shadow-lg transition hover:bg-red-50 hover:text-red-500"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 px-7 py-8 text-white">
          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-white/10" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/25 bg-white/20 shadow-xl backdrop-blur">
                <ShoppingBag className="h-8 w-8" />
              </div>

              <div>
                <p className="mb-1 inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-50">
                  Order Details
                </p>
                <h2 className="text-2xl font-black">
                  #{order?._id?.slice(-8).toUpperCase()}
                </h2>
                <p className="mt-1 text-sm font-medium text-blue-50">
                  {order?.productInfo?.title || "Unknown Product"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-white/15 px-4 py-3 text-center backdrop-blur">
                <p className="text-[10px] font-black uppercase text-blue-50">
                  Payment
                </p>
                <p className="mt-1 text-sm font-black capitalize">
                  {order?.paymentStatus || "pending"}
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 px-4 py-3 text-center backdrop-blur">
                <p className="text-[10px] font-black uppercase text-blue-50">
                  Order
                </p>
                <p className="mt-1 text-sm font-black capitalize">
                  {order?.orderStatus || "processing"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-h-[68vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-white p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm">
              <CreditCard className="h-6 w-6 text-blue-600" />
              <p className="mt-3 text-xs font-bold text-slate-400">Amount</p>
              <p className="text-2xl font-black text-blue-600">${price}</p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
              <p className="mt-3 text-xs font-bold text-slate-400">Payment</p>
              <p className="text-lg font-black capitalize text-slate-900">
                {order?.paymentStatus || "pending"}
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm">
              <Truck className="h-6 w-6 text-blue-600" />
              <p className="mt-3 text-xs font-bold text-slate-400">Delivery</p>
              <p className="text-lg font-black text-slate-900">2–3 Days</p>
            </div>
          </div>

          <SectionTitle icon={ShoppingBag} title="Product Information" />

          <div className="grid gap-3 md:grid-cols-2">
            <DetailRow
              icon={ShoppingBag}
              label="Product Name"
              value={order?.productInfo?.title}
            />

            <DetailRow
              icon={CreditCard}
              label="Price"
              value={`$${order?.productInfo?.price || 0}`}
              highlight
            />

            <DetailRow
              icon={Hash}
              label="Product ID"
              value={order?.productInfo?.productId}
            />
          </div>

          <SectionTitle icon={Receipt} title="Payment Details" />

          <div className="grid gap-3 md:grid-cols-2">
            <DetailRow
              icon={Receipt}
              label="Transaction ID"
              value={order?.transactionId || order?.stripePaymentIntentId}
              highlight
            />

            <DetailRow
              icon={Clock}
              label="Order Date"
              value={
                order?.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "N/A"
              }
            />

            <DetailRow
              icon={CheckCircle2}
              label="Payment Status"
              value={order?.paymentStatus}
            />
          </div>

          <SectionTitle icon={User} title="Buyer Information" />

          <div className="grid gap-3 md:grid-cols-2">
            <DetailRow
              icon={User}
              label="Buyer Name"
              value={order?.buyerInfo?.name}
            />

            <DetailRow
              icon={Receipt}
              label="Buyer Email"
              value={order?.buyerInfo?.email}
            />

            <DetailRow
              icon={Truck}
              label="Delivery Address"
              value={order?.buyerInfo?.deliveryAddress || order?.buyerInfo?.location}
            />
          </div>

          <SectionTitle icon={Store} title="Seller Information" />

          <div className="grid gap-3 md:grid-cols-2">
            <DetailRow
              icon={Store}
              label="Seller Name"
              value={order?.sellerInfo?.name}
            />

            <DetailRow
              icon={Receipt}
              label="Seller Email"
              value={order?.sellerInfo?.email}
            />

            <DetailRow
              icon={CreditCard}
              label="Phone"
              value={order?.sellerInfo?.phone}
            />
          </div>

          <button
            onClick={onClose}
            className="mt-7 w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:scale-[1.01]"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BuyerOrdersClient({ orders = [], email }) {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelId, setCancelId] = useState(null);

  const safeOrders = Array.isArray(orders) ? orders : [];

  const handleCancel = async (id) => {
    try {
      setCancelId(id);
      const res = await cancelOrder(id);

      if (res?.success) {
        toast.success("Order cancelled successfully");
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to cancel order");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setCancelId(null);
    }
  };

  return (
    <>
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      <section className="space-y-6">
        <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-100 p-3">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <h1 className="text-3xl font-black text-slate-950">My Orders</h1>
              <p className="text-sm text-slate-500">
                Track and manage your orders.
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-400">
                {email || "Not logged in"}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm md:block">
          <table className="w-full">
            <thead className="bg-slate-50 text-left text-sm text-slate-500">
              <tr>
                <th className="px-5 py-4">Order</th>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Seller</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {safeOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm font-semibold text-slate-500"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                safeOrders.map((order) => (
                  <tr key={order._id} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-mono text-xs text-slate-500">
                      #{order?._id?.slice(-8).toUpperCase()}
                    </td>

                    <td className="px-5 py-4 font-bold text-slate-900">
                      {order?.productInfo?.title || "Unknown Product"}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {order?.sellerInfo?.name || "N/A"}
                    </td>

                    <td className="px-5 py-4 font-black text-blue-600">
                      ${order?.productInfo?.price || 0}
                    </td>

                    <td className="px-5 py-4">
                      <PaymentBadge status={order?.paymentStatus} />
                    </td>

                    <td className="px-5 py-4">
                      <OrderBadge status={order?.orderStatus} />
                    </td>

                    <td className="px-5 py-4">
                     <div className="flex justify-end gap-3">
  <button
    onClick={() => setSelectedOrder(order)}
    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
  >
    <Eye className="h-3.5 w-3.5" />
    View Details
  </button>

  {!["shipped", "delivered", "cancelled"].includes(
    order?.orderStatus
  ) && (
    <button
      onClick={() => handleCancel(order._id)}
      disabled={cancelId === order._id}
      className="rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-600 disabled:opacity-60"
    >
      {cancelId === order._id ? "Cancelling..." : "Cancel"}
    </button>
  )}
</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">
          {safeOrders.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <AlertTriangle className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-3 text-sm font-semibold text-slate-500">
                No orders found.
              </p>
            </div>
          ) : (
            safeOrders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="line-clamp-1 text-sm font-black text-slate-900">
                      {order?.productInfo?.title || "Unknown Product"}
                    </h2>

                    <p className="font-mono text-xs text-slate-400">
                      #{order?._id?.slice(-8).toUpperCase()}
                    </p>
                  </div>

                  <p className="font-black text-blue-600">
                    ${order?.productInfo?.price || 0}
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <PaymentBadge status={order?.paymentStatus} />
                  <OrderBadge status={order?.orderStatus} />
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 rounded-full bg-blue-600 py-2 text-xs font-bold text-white"
                  >
                    View Details
                  </button>

                  {!["shipped", "delivered", "cancelled"].includes(
                    order?.orderStatus
                  ) && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      disabled={cancelId === order._id}
                      className="rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white disabled:opacity-60"
                    >
                      {cancelId === order._id ? "..." : "Cancel"}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}