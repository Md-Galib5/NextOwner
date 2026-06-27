"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  Heart,
  Trash2,
  Loader2,
  CreditCard,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { removeWishlist } from "@/lib/actions/products";

export default function WishlistClient({ items = [] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  const handleRemove = async (id) => {
    if (loadingId) return;

    try {
      setLoadingId(id);

      const res = await removeWishlist(id);

      if (res?.success) {
        toast.success("Removed from wishlist", {
          toastId: `wishlist-${id}`,
          autoClose: 2000,
        });

        router.refresh();
      } else {
        toast.error(res?.message || "Failed to remove item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-slate-50 p-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-indigo-700 shadow-sm">
          <Heart className="h-4 w-4" />
          Buyer Wishlist
        </div>

        <h1 className="text-3xl font-black text-slate-950">
          My Wishlist
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Products you saved for future purchase.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center">
          <Heart className="mx-auto h-12 w-12 text-slate-400" />

          <h2 className="mt-4 text-xl font-black text-slate-950">
            No wishlist products
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Save products from the marketplace to see them here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const product = item.product;

            return (
              <article
                key={item._id}
                className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={product?.images?.[0] || "/placeholder-product.png"}
                  alt={product?.title || "Product"}
                  className="h-52 w-full rounded-2xl object-cover"
                />

                <div className="mt-4">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700">
                    {product?.category || "Product"}
                  </span>

                  <h2 className="mt-3 line-clamp-1 text-xl font-black text-slate-950">
                    {product?.title || "Untitled Product"}
                  </h2>

                  <p className="mt-2 text-lg font-black text-slate-900">
                    ${product?.price || 0}
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* <Link
                      href={`/products/${product?._id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-600"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link> */}

                    <Link
                       href={`/products/${product._id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                      <CreditCard className="h-4 w-4" />
                      Checkout
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleRemove(item._id)}
                      disabled={loadingId === item._id}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loadingId === item._id ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Removing...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}