import Link from "next/link";
import { ArrowRight, Boxes, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

async function getCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/popular`,
      { cache: "no-store" }
    );

    const data = await res.json();
    return data?.categories || [];
  } catch {
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <section className="min-h-screen bg-blue-50/40 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            <Sparkles className="h-4 w-4" />
            Explore Categories
          </div>

          <h1 className="mt-5 text-4xl font-black text-slate-950">
            Find products by category
          </h1>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-56 overflow-hidden bg-slate-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex items-center justify-between p-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-950">
                    {category.name}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {category.totalProducts} products available
                  </p>
                </div>

                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center">
            <Boxes className="mx-auto h-12 w-12 text-slate-400" />
            <h2 className="mt-4 text-2xl font-black text-slate-900">
              No categories found
            </h2>
          </div>
        )}
      </div>
    </section>
  );
}