"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer } from "@heroui/react";
import {
  PanelLeft,
  Home,
  ShoppingCart,
  Heart,
  CreditCard,
  User,
  PackagePlus,
  Package,
  ClipboardList,
  BarChart3,
  Users,
  ShieldCheck,
  Settings,
} from "lucide-react";

export function DashboardSidebar({ role = "buyer" }) {
  const pathname = usePathname();

  const buyerLinks = [
    { icon: Home, href: "/dashboard/buyer", label: "Overview" },
    { icon: ShoppingCart, href: "/dashboard/buyer/orders", label: "My Orders" },
    { icon: Heart, href: "/dashboard/buyer/wishlist", label: "Wishlist" },
    { icon: CreditCard, href: "/dashboard/buyer/payments", label: "Payment History" },
    { icon: User, href: "/dashboard/buyer/profile", label: "Profile" },
  ];

  const sellerLinks = [
    { icon: Home, href: "/dashboard/seller", label: "Overview" },
    { icon: PackagePlus, href: "/dashboard/seller/products/new", label: "Add Product" },
    { icon: Package, href: "/dashboard/seller/products", label: "My Products" },
    { icon: ClipboardList, href: "/dashboard/seller/orders", label: "Manage Orders" },
    { icon: BarChart3, href: "/dashboard/seller/analytics", label: "Sales Analytics" },
    { icon: User, href: "/dashboard/seller/profile", label: "Profile" },
  ];

  const adminLinks = [
    { icon: Home, href: "/dashboard/admin", label: "Overview" },
    { icon: Users, href: "/dashboard/admin/users", label: "Manage Users" },
    { icon: Package, href: "/dashboard/admin/products", label: "Manage Products" },
    { icon: ClipboardList, href: "/dashboard/admin/orders", label: "Manage Orders" },
    { icon: BarChart3, href: "/dashboard/admin/analytics", label: "Platform Analytics" },
    { icon: Settings, href: "/dashboard/admin/settings", label: "Settings" },
  ];

  const navItems =
    role === "admin" ? adminLinks : role === "seller" ? sellerLinks : buyerLinks;

  const roleTitle =
    role === "admin"
      ? "Admin Panel"
      : role === "seller"
      ? "Seller Dashboard"
      : "Buyer Dashboard";

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white p-4 lg:block">
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
      <ShieldCheck className="h-5 w-5 text-white" />
    </div>

    <div>
      <h2 className="text-sm font-bold text-slate-900">
        {roleTitle}
      </h2>
      <p className="text-xs text-slate-500">
        NextOwner Panel
      </p>
    </div>
  </div>
</div>

        {navContent}
      </aside>

      <div className="p-4 lg:hidden">
  <Drawer>
    <Button>
      <PanelLeft className="h-4 w-4" />
      Menu
    </Button>

    <Drawer.Backdrop className="bg-slate-900/40 backdrop-blur-sm">
      <Drawer.Content placement="left">
        <Drawer.Dialog className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
          <Drawer.CloseTrigger />

          <Drawer.Header className="border-b border-blue-100 bg-blue-50">
            <Drawer.Heading className="text-slate-900">
              {roleTitle}
            </Drawer.Heading>
          </Drawer.Header>

          <Drawer.Body className="bg-gradient-to-b from-blue-50 via-white to-slate-100 px-4 py-5">
            <div className="mb-5 rounded-2xl bg-blue-600 p-4 text-white shadow-lg shadow-blue-200">
              <p className="text-xs uppercase tracking-wider text-blue-100">
                NextOwner
              </p>
              <h2 className="mt-1 font-bold">{roleTitle}</h2>
              <p className="mt-1 text-xs text-blue-100">
                Manage your marketplace account
              </p>
            </div>

            {navContent}
          </Drawer.Body>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  </Drawer>
</div>
    </>
  );
}