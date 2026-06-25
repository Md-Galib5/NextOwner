"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { usePathname } from "next/navigation";
import {
  LogIn,
  UserPlus,
  User,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";

import LOGO from "../../public/logo.png";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  const role = user?.role || "buyer";

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isDashboard = pathname === `/dashboard/${role}`;
  const isProfile = pathname === `/dashboard/${role}/profile`;

  const handleSignOut = async () => {
    await signOut();
    setIsUserOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src={LOGO}
            alt="NextOwner"
            width={200}
            height={80}
            className="h-auto w-[135px] object-contain sm:w-[165px] lg:w-[185px]"
            priority
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="h-6 w-px bg-slate-200" />

          {!user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/signin"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Sign In
              </Link>

              <Link
                href="/auth/register"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsUserOpen(!isUserOpen)}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 transition hover:bg-white hover:shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900">
                    {user.name}
                  </p>
                  <p className="max-w-[140px] truncate text-xs text-slate-500">
                    {user.email}
                  </p>
                </div>

                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>

              {isUserOpen && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <div className="border-b border-slate-100 p-4">
                    <p className="font-semibold text-slate-900">{user.name}</p>
                    <p className="truncate text-sm text-slate-500">
                      {user.email}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                      {role}
                    </span>
                  </div>

                  <Link
                    href={`/dashboard/${role}`}
                    onClick={() => setIsUserOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition ${
                      isDashboard
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>

                  <Link
                    href={`/dashboard/${role}/profile`}
                    onClick={() => setIsUserOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition ${
                      isProfile
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center rounded-xl p-2 text-slate-900 transition hover:bg-slate-100 lg:hidden"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-4 px-4 py-6 sm:px-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-base font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="grid gap-3 border-t border-slate-200 pt-4">
              {!user ? (
                <>
                  <Button
                    as={Link}
                    href="/auth/signin"
                    radius="lg"
                    variant="bordered"
                    startContent={<LogIn className="h-4 w-4" />}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Button>

                  <Button
                    as={Link}
                    href="/auth/register"
                    radius="lg"
                    startContent={<UserPlus className="h-4 w-4" />}
                    className="bg-blue-600 text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <div className="rounded-xl bg-slate-50 px-4 py-3">
                    <p className="font-semibold text-slate-900">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                    <span className="mt-2 inline-block rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                      {role}
                    </span>
                  </div>

                  <Button
                    as={Link}
                    href={`/dashboard/${role}`}
                    variant={isDashboard ? "solid" : "bordered"}
                    className={isDashboard ? "bg-blue-600 text-white" : ""}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Button>

                  <Button
                    as={Link}
                    href={`/dashboard/${role}/profile`}
                    variant={isProfile ? "solid" : "bordered"}
                    className={isProfile ? "bg-blue-600 text-white" : ""}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Button>

                  <Button
                    onClick={handleSignOut}
                    className="bg-red-600 text-white"
                  >
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}