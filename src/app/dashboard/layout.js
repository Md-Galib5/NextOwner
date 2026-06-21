import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  const role = "seller";

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <DashboardSidebar role={role} />

      <main className="w-full flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}