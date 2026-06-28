"use client";

import { Ban } from "lucide-react";

export default function BlockedUserGuard({ user, children }) {
  if (user?.status === "blocked") {
    return (
      <section className="flex min-h-[70vh] items-center justify-center p-6">
        <div className="max-w-xl rounded-[2rem] border border-red-100 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Ban className="h-8 w-8" />
          </div>

          <h1 className="text-3xl font-black text-slate-950">
            Account Blocked
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Your account has been blocked by admin. You cannot use buyer,
            seller, or admin features right now.
          </p>
        </div>
      </section>
    );
  }

  return children;
}