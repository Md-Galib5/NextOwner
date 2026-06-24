"use client";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useSession } from "@/lib/auth-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const role = session?.user?.role || "seller";

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