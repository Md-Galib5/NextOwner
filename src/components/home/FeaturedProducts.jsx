import Link from "next/link";

export default function FeaturedProducts({ products = [] }) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            Featured Products
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">
            Latest Products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500">
            Explore the newest products added by trusted sellers.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <h3 className="text-lg font-black text-slate-900">
              No products found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Latest products will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                href={`/products/${product._id}`}
                key={product._id}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="h-56 overflow-hidden bg-slate-100">
                  <img
                    src={product?.images?.[0] || "/placeholder-product.png"}
                    alt={product?.title || "Product"}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {product?.category || "General"}
                    </span>

                    <span className="text-lg font-black text-slate-950">
                      ${product?.price || 0}
                    </span>
                  </div>

                  <h3 className="line-clamp-1 text-lg font-black text-slate-950">
                    {product?.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                    {product?.description || "No description available."}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-bold text-slate-500">
                      Stock: {product?.stock ?? 0}
                    </span>

                    <span className="text-sm font-black text-blue-600">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}