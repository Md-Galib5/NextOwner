import Link from "next/link";
import { ArrowRight, BadgeCheck, DollarSign, Eye } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

async function getFeaturedProducts() {
  try {
    const res = await fetch(`${baseUrl}/api/products?page=1&limit=6&sort=latest`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data?.products || [];
  } catch (error) {
    console.error("Failed to load featured products:", error);
    return [];
  }
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              <BadgeCheck className="h-4 w-4" />
              Featured Products
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Latest Products From Sellers
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Discover newly listed second-hand products from trusted sellers.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <h3 className="text-xl font-black text-slate-950">
              No products found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Products will appear here after sellers add listings.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product._id}
                className="group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={product.images?.[0] || "/placeholder-product.png"}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-blue-700 shadow-sm">
                    {product.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="line-clamp-1 text-xl font-black text-slate-950">
                    {product.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-center gap-2 text-blue-700">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm font-bold">Price</span>
                    </div>

                    <p className="text-xl font-black text-slate-950">
                      ${product.price}
                    </p>
                  </div>

                  <Link
                    href={`/products/${product._id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}