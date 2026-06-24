import React from "react";
import Link from "next/link";
import { ShoppingBag, BadgeCheck, Boxes, DollarSign, Eye, Heart, ShoppingCart } from "lucide-react";

const getAllProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  return res.json();
};

const Allproducts = async () => {
  const products = await getAllProducts();

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-cyan-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 shadow-sm">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-300/30 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/90 px-4 py-2 text-sm font-bold text-cyan-700 shadow-sm">
            <ShoppingBag className="h-4 w-4" />
            NextOwner Marketplace
          </div>

          <h1 className="text-3xl font-black text-slate-950">
            Explore All Products
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Browse trusted pre-owned products listed by verified sellers.
          </p>
        </div>
      </div>

      {products?.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-slate-400" />
          <h2 className="mt-4 text-xl font-black text-slate-950">
            No products found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Products will appear here after sellers add listings.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product._id}
              className="group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={product.images?.[0] || "/placeholder-product.png"}
                  alt={product.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-cyan-700 shadow-sm backdrop-blur">
                  {product.category}
                </span>

                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 shadow-sm">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  {product.status || "available"}
                </span>
              </div>

              <div className="p-5">
                <h2 className="line-clamp-1 text-xl font-black text-slate-950">
                  {product.title}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                  {product.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-3">
                    <div className="flex items-center gap-1.5 text-cyan-700">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-xs font-bold">Price</span>
                    </div>
                    <p className="mt-1 text-lg font-black text-slate-950">
                      ${product.price}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Boxes className="h-4 w-4" />
                      <span className="text-xs font-bold">Stock</span>
                    </div>
                    <p className="mt-1 text-lg font-black text-slate-950">
                      {product.stock}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-slate-400">Seller</p>
                    <p className="line-clamp-1 text-sm font-bold text-slate-700">
                      {product.sellerInfo?.name || "Unknown Seller"}
                    </p>
                  </div>

                 <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
  <Link
    href={`/products/${product._id}`}
    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
  >
    <Eye className="h-4 w-4" />
    Details
  </Link>

  <button
    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-50 px-3 py-2 text-sm font-bold text-cyan-700 transition hover:bg-cyan-100"
  >
    <Heart className="h-4 w-4" />
    Wishlist
  </button>

  <button
    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-cyan-600"
  >
    <ShoppingCart className="h-4 w-4" />
    Buy Now
  </button>
</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Allproducts;