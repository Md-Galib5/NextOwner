import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  ArrowLeft,
  BadgeCheck,
  Boxes,
  DollarSign,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingCart,
  User,
  Mail,
  AlertCircle,
} from "lucide-react";
import WishlistButton from "@/components/products/WishlistButton";

const getProductById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    { cache: "no-store" }
  );

  return res.json();
};

export default async function ProductsDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = session?.user?.role;
  const isBuyer = role === "buyer";

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
            <img
              src={product?.images?.[0] || "/placeholder-product.png"}
              alt={product?.title}
              className="h-[420px] w-full object-cover"
            />

            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-cyan-700 shadow-sm">
              {product?.category}
            </span>

            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 shadow-sm">
              <BadgeCheck className="h-3.5 w-3.5" />
              {product?.status || "available"}
            </span>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-black text-slate-950">
            {product?.title}
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            {product?.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
              <DollarSign className="h-5 w-5 text-cyan-700" />
              <p className="mt-2 text-xs font-bold text-slate-500">Price</p>
              <p className="text-2xl font-black text-slate-950">
                ${product?.price}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <Boxes className="h-5 w-5 text-slate-500" />
              <p className="mt-2 text-xs font-bold text-slate-500">Stock</p>
              <p className="text-2xl font-black text-slate-950">
                {product?.stock}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Condition
            </p>
            <p className="mt-1 text-lg font-black text-slate-900">
              {product?.condition}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {isBuyer ? (
              <Link
                href={`/checkout/${product._id}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-600"
              >
                <ShoppingCart className="h-4 w-4" />
                Buy Now
              </Link>
            ) : (
              <div className="col-span-1 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Only buyers can buy products.
                </div>
              </div>
            )}

            <WishlistButton product={product} />
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-700">
          <ShieldCheck className="h-4 w-4" />
          Seller Information
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <InfoCard icon={User} label="Name" value={product?.sellerInfo?.name} />
          <InfoCard icon={Mail} label="Email" value={product?.sellerInfo?.email} />
          <InfoCard icon={Phone} label="Phone" value={product?.sellerInfo?.phone} />
          <InfoCard
            icon={MapPin}
            label="Location"
            value={product?.sellerInfo?.location}
          />
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <Icon className="h-5 w-5 text-cyan-700" />
      <p className="mt-2 text-xs font-bold text-slate-400">{label}</p>
      <p className="truncate font-black text-slate-900">
        {value || "Not available"}
      </p>
    </div>
  );
}