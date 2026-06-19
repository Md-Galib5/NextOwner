"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import LOGO from "../../public/logo.png";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
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

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-900 hover:shadow-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-6 w-px bg-slate-200" />

          <div className="flex items-center gap-3">
            <Button
              as={Link}
              href="/dashboard/add-product"
              radius="lg"
              variant="bordered"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              Sell Item
            </Button>

            <Button
              as={Link}
              href="/products"
              radius="lg"
              className="h-11 bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Browse Products
            </Button>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center rounded-xl p-2 text-slate-900 transition hover:bg-slate-100 lg:hidden"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-4 px-4 py-6 sm:px-6">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-2xl px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-2">
              <Button
                as={Link}
                href="/dashboard/add-product"
                radius="lg"
                variant="bordered"
                className="w-full border-blue-200 text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell Item
              </Button>

              <Button
                as={Link}
                href="/products"
                radius="lg"
                className="w-full bg-blue-600 font-semibold text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Products
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}