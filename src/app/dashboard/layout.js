import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  const role = "buyer";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar role={role} />

      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}