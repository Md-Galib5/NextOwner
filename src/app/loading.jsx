"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheck,
  PackageSearch,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const steps = 100;
    const intervalTime = duration / steps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-8">
        <div className="overflow-hidden rounded-[2.5rem] border border-blue-100 bg-white/90 p-8 shadow-xl shadow-blue-100 backdrop-blur">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                <Sparkles className="h-4 w-4 animate-pulse" />
                NextOwner Marketplace
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Loading Marketplace
              </h1>

              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-500 md:text-base">
                Fetching products, seller information, transactions and secure
                marketplace data.
              </p>

              <div className="mt-8 max-w-xl">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-600">
                    Preparing Experience
                  </span>

                  <span className="text-sm font-black text-blue-600">
                    {progress}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-150"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <Feature icon={ShieldCheck} text="Secure" />
                <Feature icon={BadgeCheck} text="Verified" />
                <Feature icon={TrendingUp} text="Fast" />
              </div>
            </div>

            <div className="relative mx-auto flex h-72 w-full max-w-sm items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-cyan-500 shadow-2xl shadow-blue-200">
              <div className="absolute h-40 w-40 animate-ping rounded-full bg-white/20" />

              <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white shadow-xl">
                <PackageSearch className="h-14 w-14 animate-bounce text-blue-600" />
              </div>

              <div className="absolute left-5 top-5 rounded-2xl bg-white px-4 py-3 shadow-lg">
                <p className="text-xs font-bold text-slate-500">Products</p>
                <p className="text-xl font-black text-slate-950">
                  Loading...
                </p>
              </div>

              <div className="absolute bottom-5 right-5 rounded-2xl bg-white px-4 py-3 shadow-lg">
                <p className="text-xs font-bold text-slate-500">Status</p>
                <p className="text-xl font-black text-blue-600">Syncing</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <StatsSkeleton />
          <StatsSkeleton />
          <StatsSkeleton />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <Icon className="h-4 w-4 text-blue-600" />
      <span className="text-sm font-black text-slate-700">{text}</span>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 animate-pulse rounded-2xl bg-blue-100" />

        <div className="flex-1 space-y-3">
          <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
          <div className="h-6 w-40 animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="relative h-56 overflow-hidden rounded-[1.5rem] bg-slate-100">
        <div className="absolute inset-0 animate-pulse bg-slate-200" />

        <div className="absolute left-4 top-4 h-7 w-24 rounded-full bg-white/70" />
        <div className="absolute right-4 top-4 h-7 w-16 rounded-full bg-white/70" />
      </div>

      <div className="mt-5 space-y-3">
        <div className="h-5 w-4/5 animate-pulse rounded-full bg-slate-200" />

        <div className="h-3 w-full animate-pulse rounded-full bg-slate-100" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-slate-100" />

        <div className="flex items-center justify-between pt-4">
          <div className="h-8 w-24 animate-pulse rounded-full bg-blue-100" />

          <div className="h-11 w-28 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}