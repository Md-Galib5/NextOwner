"use client";

import { useMemo, useState } from "react";
import {
  Search,
  CreditCard,
  DollarSign,
  Receipt,
  Filter,
  Hash,
} from "lucide-react";

export default function AdminTransactionsClient({
  initialTransactions = [],
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredTransactions = useMemo(() => {
    return initialTransactions.filter((item) => {
      const keyword = search.toLowerCase().trim();

      const matchesSearch =
        keyword === "" ||
        item?.buyerInfo?.name?.toLowerCase().includes(keyword) ||
        item?.buyerInfo?.email?.toLowerCase().includes(keyword) ||
        item?.sellerInfo?.name?.toLowerCase().includes(keyword) ||
        item?.sellerInfo?.email?.toLowerCase().includes(keyword) ||
        item?.productInfo?.title?.toLowerCase().includes(keyword) ||
        item?.transactionId?.toLowerCase().includes(keyword) ||
        item?.stripePaymentIntentId?.toLowerCase().includes(keyword) ||
        item?.stripeSessionId?.toLowerCase().includes(keyword);

      const matchesStatus =
        status === "all" || item?.paymentStatus === status;

      return matchesSearch && matchesStatus;
    });
  }, [initialTransactions, search, status]);

  const filteredRevenue = filteredTransactions.reduce(
    (sum, item) =>
      sum +
      Number(
        item.totalPrice ||
          Number(item.unitPrice || item.productInfo?.price || 0) *
            Number(item.quantity || item.productInfo?.quantity || 1)
      ),
    0
  );

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
          <CreditCard className="h-4 w-4" />
          Transactions
        </div>

        <h1 className="mt-4 text-4xl font-black">Payment Monitoring</h1>
        <p className="mt-2 text-blue-100">
          Search, filter, and monitor marketplace revenue.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard
          icon={DollarSign}
          label="Revenue"
          value={`$${filteredRevenue.toFixed(2)}`}
        />
        <StatCard
          icon={Receipt}
          label="Transactions"
          value={filteredTransactions.length}
        />
        <StatCard
          icon={CreditCard}
          label="Paid Payments"
          value={
            filteredTransactions.filter((item) => item.paymentStatus === "paid")
              .length
          }
        />
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search buyer, seller, product, transaction ID..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-bold outline-none transition focus:border-blue-500 focus:bg-white"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              Transaction History
            </h2>
            <p className="text-sm font-semibold text-slate-500">
              Showing {filteredTransactions.length} transaction
              {filteredTransactions.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px]">
            <thead className="bg-slate-50">
              <tr>
                <TableHead>Buyer</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Date</TableHead>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((item) => {
                  const quantity = Number(
                    item.quantity || item.productInfo?.quantity || 1
                  );

                  const unitPrice = Number(
                    item.unitPrice || item.productInfo?.price || 0
                  );

                  const amount = Number(item.totalPrice || unitPrice * quantity);

                  return (
                    <tr
                      key={item._id}
                      className="border-t border-slate-100 transition hover:bg-blue-50/30"
                    >
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">
                          {item.buyerInfo?.name || "Unknown Buyer"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.buyerInfo?.email || "No email"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">
                          {item.sellerInfo?.name || "Unknown Seller"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.sellerInfo?.email || "No email"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="max-w-[190px] truncate font-bold text-slate-800">
                          {item.productInfo?.title || "Product"}
                        </p>
                        <p className="text-xs font-semibold text-slate-500">
                          Qty: {quantity} × ${unitPrice.toFixed(2)}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2">
                          <Hash className="h-3.5 w-3.5 text-blue-600" />
                          <span className="font-mono text-xs font-black text-blue-700">
                            {item.transactionId || "N/A"}
                          </span>
                        </div>

                        <p className="mt-1 max-w-[180px] truncate font-mono text-[11px] text-slate-400">
                          {item.stripePaymentIntentId ||
                            item.stripeSessionId ||
                            ""}
                        </p>
                      </td>

                      <td className="px-5 py-4 font-black text-emerald-600">
                        ${amount.toFixed(2)}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={item.paymentStatus} />
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          {item.orderStatus || "pending"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-500">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-5 py-12 text-center">
                    <p className="font-black text-slate-900">
                      No transactions found
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try changing search or status filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <p className="mt-4 text-sm font-bold text-slate-500">{label}</p>
      <h2 className="mt-1 text-3xl font-black text-slate-950">{value}</h2>
    </div>
  );
}

function TableHead({ children }) {
  return (
    <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
      {children}
    </th>
  );
}

function StatusBadge({ status }) {
  const style = {
    paid: "bg-emerald-50 text-emerald-700 border-emerald-100",
    unpaid: "bg-amber-50 text-amber-700 border-amber-100",
    failed: "bg-red-50 text-red-700 border-red-100",
    refunded: "bg-purple-50 text-purple-700 border-purple-100",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-bold ${
        style[status] || "bg-slate-100 text-slate-600 border-slate-200"
      }`}
    >
      {status || "unknown"}
    </span>
  );
}