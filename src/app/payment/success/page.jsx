// // src/app/payment/success/page.jsx

// import { stripe } from "@/lib/stripe";
// import Link from "next/link";
// import { redirect } from "next/navigation";

// export default async function PaymentSuccessPage({ searchParams }) {
//   const params = await searchParams;
//   const sessionId = params?.session_id;

//   if (!sessionId) {
//     redirect("/payment/cancel");
//   }

//   const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

//   if (checkoutSession.payment_status !== "paid") {
//     redirect("/payment/cancel");
//   }

//   const buyerInfo = JSON.parse(checkoutSession.metadata?.buyerInfo || "{}");
//   const sellerInfo = JSON.parse(checkoutSession.metadata?.sellerInfo || "{}");
//   const productInfo = JSON.parse(checkoutSession.metadata?.productInfo || "{}");

//   await fetch(`${process.env.BETTER_AUTH_URL}/api/orders/stripe-success`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     cache: "no-store",
//     body: JSON.stringify({
//       buyerInfo,
//       sellerInfo,
//       productInfo,
//       paymentStatus: "paid",
//       orderStatus: "processing",
//       stripeSessionId: checkoutSession.id,
//       stripePaymentIntentId: checkoutSession.payment_intent,
//     }),
//   });

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
//       <div className="max-w-md rounded-3xl bg-white p-10 text-center shadow">
//         <h1 className="text-3xl font-black text-blue-600">
//           Payment Successful
//         </h1>

//         <p className="mt-3 text-slate-500">
//           Your order has been saved successfully.
//         </p>

//         <Link
//           href="/dashboard/buyer/orders"
//           className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
//         >
//           View Orders
//         </Link>
//       </div>
//     </div>
//   );
// }


import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PaymentSuccessPage({ searchParams }) {
  const params = await searchParams;
  const sessionId = params?.session_id;

  if (!sessionId) {
    redirect("/payment/cancel");
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

  if (checkoutSession.payment_status !== "paid") {
    redirect("/payment/cancel");
  }

  const buyerInfo = JSON.parse(checkoutSession.metadata?.buyerInfo || "{}");
  const sellerInfo = JSON.parse(checkoutSession.metadata?.sellerInfo || "{}");
  const productInfo = JSON.parse(checkoutSession.metadata?.productInfo || "{}");

  const saveOrderRes =await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/stripe-success`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      buyerInfo,
      sellerInfo,
      productInfo,
      paymentStatus: "paid",
      orderStatus: "processing",
      stripeSessionId: checkoutSession.id,
      stripePaymentIntentId: checkoutSession.payment_intent,
    }),
  }
);
  const saveOrderData = await saveOrderRes.json();

  console.log("ORDER SAVE RESPONSE:", saveOrderData);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md rounded-3xl bg-white p-10 text-center shadow">
        <h1 className="text-3xl font-black text-blue-600">
          Payment Successful
        </h1>

        <p className="mt-3 text-slate-500">
          {saveOrderData?.success
            ? "Your order has been saved successfully."
            : "Payment done, but order save failed."}
        </p>

        <Link
          href="/dashboard/buyer/orders"
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
}