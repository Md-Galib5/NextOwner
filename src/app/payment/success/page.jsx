import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  BadgeCheck,
  ClipboardList,
  CreditCard,
  Home,
  ListChecks,
  PackageCheck,
  Receipt,
  ShieldCheck,
} from "lucide-react";

export default async function PaymentSuccessPage({ searchParams }) {
  const params = await searchParams;
  const sessionId = params?.session_id;

  if (!sessionId) redirect("/payment/cancel");

  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

  if (checkoutSession.payment_status !== "paid") {
    redirect("/payment/cancel");
  }

  const buyerInfo = JSON.parse(checkoutSession.metadata?.buyerInfo || "{}");
  const sellerInfo = JSON.parse(checkoutSession.metadata?.sellerInfo || "{}");
  const productInfo = JSON.parse(checkoutSession.metadata?.productInfo || "{}");

  const transactionId = `NO-${checkoutSession.id
    .slice(-10)
    .toUpperCase()}`;

  let saveOrderData = null;

  try {
    const saveOrderRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/stripe-success`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          buyerInfo,
          sellerInfo,
          productInfo,

          paymentStatus: "paid",
          orderStatus: "processing",

          transactionId,

          stripeSessionId: checkoutSession.id,
          stripePaymentIntentId: checkoutSession.payment_intent,
        }),
      }
    );

    saveOrderData = await saveOrderRes.json();
  } catch (error) {
    saveOrderData = {
      success: false,
      message: "Order save failed",
    };
  }

  const price = Number(productInfo?.price || 0);
  const quantity = Number(productInfo?.quantity || 1);
  const total = price * quantity;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white px-4 py-10">
      <section className="mx-auto max-w-lg overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-2xl shadow-blue-100/70">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 px-8 py-10 text-center text-white">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-white/10" />

          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <BadgeCheck className="h-11 w-11 text-white" />
          </div>

          <h1 className="relative mt-5 text-3xl font-black">
            Payment Successful!
          </h1>

          <p className="relative mt-2 text-sm font-medium text-blue-50">
            Thank you for your purchase. Your order is now being processed.
          </p>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-blue-600" />
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">
                Order Summary
              </h2>
            </div>

            <div className="space-y-4 text-sm">
              <InfoRow label="Product Name" value={productInfo?.title} />
              <InfoRow label="Unit Price" value={`$${price}`} />
              <InfoRow label="Quantity" value={quantity} />
              <InfoRow label="Delivery Charge" value="Free" />
              <InfoRow label="Payment Amount" value={`$${total}`} highlight />
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-blue-600" />
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">
                Payment Details
              </h2>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50/40 p-4">
              <InfoRow label="Transaction ID" value={transactionId} mono />
              <InfoRow
                label="Payment Date"
                value={new Date().toLocaleString()}
              />
              <InfoRow label="Payment Method" value="Stripe" />
              <InfoRow label="Status" value="Paid" highlight />
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50 px-4 py-3 text-center text-xs font-semibold text-slate-600">
            <PackageCheck className="mx-auto mb-2 h-5 w-5 text-blue-600" />
            Your order will be delivered in 2–3 working days. Confirmation sent
            to <span className="font-black text-slate-900">{buyerInfo?.email}</span>
          </div>

          {!saveOrderData?.success && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-3 text-center text-xs font-bold text-red-600">
              Payment done, but order save failed.
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/dashboard/buyer/orders"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              <ListChecks className="h-4 w-4" />
              Go to My Orders
            </Link>

            <Link
              href="/products"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
            >
              <Home className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <ShieldCheck className="h-4 w-4" />
            Secure payment powered by Stripe
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoRow({ label, value, highlight = false, mono = false }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-dashed border-slate-200 pb-3 last:border-0 last:pb-0">
      <p className="text-slate-500">{label}</p>
      <p
        className={`text-right text-sm font-bold ${
          highlight ? "text-blue-600" : "text-slate-900"
        } ${mono ? "font-mono text-xs" : ""}`}
      >
        {value || "N/A"}
      </p>
    </div>
  );
}