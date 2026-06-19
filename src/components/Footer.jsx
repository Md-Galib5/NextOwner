
import Link from "next/link";
import Image from "next/image";
import {
  LogoFacebook,
  LogoLinkedin,
  LogoGithub,
} from "@gravity-ui/icons";

import LOGO from "../../public/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* BRAND SECTION */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src={LOGO}
                alt="NextOwner Logo"
                width={180}
                height={60}
                className="h-auto w-[150px] object-contain sm:w-[180px]"
                priority
              />
            </Link>

            <p className="max-w-sm leading-7 text-slate-500">
              NextOwner is a trusted marketplace for buying and selling
              quality pre-owned products. Discover great deals, reduce
              waste, and give products a second life.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-3">
              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <LogoFacebook className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                aria-label="Github"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <LogoGithub className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <LogoLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* MARKETPLACE */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-blue-600">
              Marketplace
            </h3>

            <ul className="space-y-3 text-slate-500">
              <li>
                <Link
                  href="/products"
                  className="transition hover:text-blue-600"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className="transition hover:text-blue-600"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/add-product"
                  className="transition hover:text-blue-600"
                >
                  Sell Product
                </Link>
              </li>

              <li>
                <Link
                  href="/wishlist"
                  className="transition hover:text-blue-600"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-blue-600">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-500">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-blue-600"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition hover:text-blue-600"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-blue-600"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="transition hover:text-blue-600"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-blue-600">
              Support
            </h3>

            <ul className="space-y-3 text-slate-500">
              <li>
                <Link
                  href="/help-center"
                  className="transition hover:text-blue-600"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="/payment-info"
                  className="transition hover:text-blue-600"
                >
                  Payment Info
                </Link>
              </li>

              <li>
                <Link
                  href="/seller-guide"
                  className="transition hover:text-blue-600"
                >
                  Seller Guide
                </Link>
              </li>

              <li>
                <Link
                  href="/buyer-protection"
                  className="transition hover:text-blue-600"
                >
                  Buyer Protection
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:text-left">
          <p>© 2026 NextOwner. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end md:gap-6">
            <Link
              href="/terms"
              className="transition hover:text-blue-600"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-blue-600"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

