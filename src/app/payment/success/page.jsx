import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-black text-slate-950">
          Payment Successful
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Your payment was completed successfully.
        </p>

        <Link
          href="/dashboard/buyer/orders"
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
        >
          View My Orders
        </Link>
      </div>
    </section>
  );
}