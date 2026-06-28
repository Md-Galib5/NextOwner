"use client";

import { useEffect, useState } from "react";
import { PackageSearch, Sparkles } from "lucide-react";

export default function GlobalLoader({ children }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 4;
      });
    }, 60);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  if (!loading) return children;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-xl px-6">
        <div className="rounded-[2rem] border border-blue-100 bg-white p-10 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-3xl bg-blue-100" />

              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-200">
                <PackageSearch className="h-10 w-10" />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              <Sparkles className="h-4 w-4 animate-pulse" />
              Loading NextOwner
            </div>

            <h2 className="mt-5 text-3xl font-black text-slate-950">
              Preparing Marketplace
            </h2>

            <p className="mt-2 text-sm font-medium text-slate-500">
              Loading products, sellers and secure transactions...
            </p>

            <div className="mt-8 w-full">
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-3 flex justify-between text-xs font-bold text-slate-500">
                <span>Loading</span>
                <span>{progress}%</span>
              </div>
            </div>

            <div className="mt-8 grid w-full grid-cols-3 gap-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-100 p-3">
      <div className="h-20 animate-pulse rounded-xl bg-slate-200" />
      <div className="mt-3 h-3 animate-pulse rounded-full bg-slate-200" />
      <div className="mt-2 h-3 w-3/4 animate-pulse rounded-full bg-slate-100" />
    </div>
  );
}