"use client";

import { useEffect, useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useSession } from "@/lib/auth-client";
import { ToastContainer } from "react-toastify";
import { Ban } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();
  const [dbUser, setDbUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (isPending) return;

      if (!session?.user?.email) {
        setUserLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${baseUrl}/api/users/by-email/${encodeURIComponent(
            session.user.email
          )}`
        );

        const data = await res.json();
        setDbUser(data);
      } catch (error) {
        console.error("Failed to load DB user:", error);
      } finally {
        setUserLoading(false);
      }
    };

    loadUser();
  }, [session?.user?.email, isPending]);

  if (isPending || userLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const user = dbUser || session?.user;
  const role = user?.role || "seller";

  if (user?.status === "blocked") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="max-w-xl rounded-[2rem] border border-red-100 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Ban className="h-8 w-8" />
          </div>

          <h1 className="text-3xl font-black text-slate-950">
            Account Blocked
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Your account has been blocked by admin. You cannot access dashboard
            features.
          </p>
        </div>

        <ToastContainer position="top-right" autoClose={3000} theme="light" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <DashboardSidebar role={role} />

      <main className="w-full flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        {children}
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
      </main>
    </div>
  );
}