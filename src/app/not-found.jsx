import Link from "next/link";
import { Home, SearchX, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="max-w-3xl text-center">
        <div className="mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-[3rem] bg-gradient-to-br from-blue-50 to-cyan-50 shadow-sm">
          <div className="relative">
            <SearchX className="h-20 w-20 text-blue-600" />
            <span className="absolute -right-6 -top-6 rounded-2xl bg-white px-3 py-1 text-3xl font-black text-slate-950 shadow-sm">
              404
            </span>
          </div>
        </div>

        <p className="mb-3 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
          Page Not Found
        </p>

        <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
          This page got a new owner.
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-7 text-slate-500 md:text-base">
          The page you are looking for does not exist, was moved, or the link is
          incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
          >
            <Home className="h-4 w-4" />
            Back To Home
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
}