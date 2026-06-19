import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { ShieldCheck, Tags, Leaf } from "lucide-react";
import BANNER from "../../public/banner.png";

export default function HeroBanner() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        {/* LEFT CONTENT */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <span className="mb-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            Trusted Second-Hand Marketplace
          </span>

          <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Buy. Sell. Inspire.
            <span className="block text-blue-600">
              Give items a second life.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
            NextOwner helps you discover quality pre-owned products, sell unused
            items, and shop with confidence at great prices.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Button
              as={Link}
              href="/products"
              radius="lg"
              className="h-12 bg-blue-600 px-8 text-base font-semibold text-white hover:bg-blue-700"
            >
              Browse Products
            </Button>

            <Button
              as={Link}
              href="/dashboard/add-product"
              radius="lg"
              variant="bordered"
              className="h-12 border-blue-200 px-8 text-base font-semibold text-blue-600 hover:bg-blue-50"
            >
              Sell Your Item
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <ShieldCheck className="mx-auto h-6 w-6 text-blue-600 lg:mx-0" />
              <h3 className="mt-3 font-bold text-slate-900">Safe & Secure</h3>
              <p className="mt-1 text-sm text-slate-500">Trusted deals</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <Tags className="mx-auto h-6 w-6 text-blue-600 lg:mx-0" />
              <h3 className="mt-3 font-bold text-slate-900">Great Deals</h3>
              <p className="mt-1 text-sm text-slate-500">Save more</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <Leaf className="mx-auto h-6 w-6 text-blue-600 lg:mx-0" />
              <h3 className="mt-3 font-bold text-slate-900">Sustainable</h3>
              <p className="mt-1 text-sm text-slate-500">Reuse smarter</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-50 shadow-2xl shadow-slate-200">
            <Image
              src={BANNER}
              alt="Second-hand marketplace products"
              width={900}
              height={900}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}