import {
  CheckCircle2,
  Clock,
  CreditCard,
  Package,
  Receipt,
  XCircle,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getBuyerOrders } from "@/lib/api/orders";

function StatusBadge({ status }) {
  const s = (status || "").toLowerCase();
  const isPaid = s === "paid";
  const isPending = s === "pending" || s === "processing";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
        isPaid
          ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
          : isPending
          ? "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
          : "bg-red-50 text-red-700 ring-1 ring-red-100"
      }`}
    >
      {isPaid ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : isPending ? (
        <Clock className="h-3.5 w-3.5" />
      ) : (
        <XCircle className="h-3.5 w-3.5" />
      )}
      {status || "pending"}
    </span>
  );
}

function EmptyPayments() {
  return (
    <div className="rounded-[2rem] border border-blue-100 bg-white p-12 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
        <Receipt className="h-8 w-8 text-blue-600" />
      </div>
      <h2 className="mt-5 text-2xl font-black text-slate-900">
        No Payments Found
      </h2>
      <p className="mt-2 text-sm font-medium text-slate-500">
        Your completed payments will appear here.
      </p>
    </div>
  );
}

export default async function PaymentHistoryPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  const ordersRes = email ? await getBuyerOrders(email) : [];
  const payments = Array.isArray(ordersRes)
    ? ordersRes
    : ordersRes?.orders || [];

  if (!payments.length) {
    return <EmptyPayments />;
  }

  const totalPaid = payments.reduce(
    (sum, item) => sum + Number(item?.productInfo?.price || 0),
    0
  );

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-100 p-3">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h1 className="text-3xl font-black text-slate-950">
                Payment History
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {payments.length}{" "}
                {payments.length === 1 ? "transaction" : "transactions"} found
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Paid
            </p>
            <p className="text-2xl font-black text-blue-600">${totalPaid}</p>
          </div>
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Transaction ID
                </th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Product
                </th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Amount
                </th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Date
                </th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="transition hover:bg-blue-50/40"
                >
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      {payment?.transactionId ||
                        payment?.stripePaymentIntentId ||
                        "N/A"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-blue-50 p-2">
                        <Package className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-black text-slate-900">
                        {payment?.productInfo?.title || "Unknown Product"}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-sm font-black text-blue-600">
                      ${Number(payment?.productInfo?.price || 0)}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-500">
                    {payment?.createdAt
                      ? new Date(payment.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={payment?.paymentStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <div className="rounded-xl bg-blue-50 p-2">
                  <Receipt className="h-4 w-4 text-blue-600" />
                </div>

                <span className="truncate font-mono text-xs font-bold text-slate-500">
                  {payment?.transactionId ||
                    payment?.stripePaymentIntentId ||
                    "N/A"}
                </span>
              </div>

              <StatusBadge status={payment?.paymentStatus} />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-slate-900">
                  {payment?.productInfo?.title || "Unknown Product"}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  {payment?.createdAt
                    ? new Date(payment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>

              <span className="shrink-0 text-sm font-black text-blue-600">
                ${Number(payment?.productInfo?.price || 0)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}