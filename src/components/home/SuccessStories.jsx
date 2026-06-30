"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const stories = [
  {
    name: "Ayesha Rahman",
    role: "Buyer",
    story:
      "I found a clean laptop at a fair price. The seller was verified and the whole process felt safe.",
    product: "Bought a Laptop",
  },
  {
    name: "Rakib Hasan",
    role: "Seller",
    story:
      "I sold my camera within two days. NextOwner helped me reach real buyers quickly.",
    product: "Sold a Camera",
  },
  {
    name: "Nadia Islam",
    role: "Buyer",
    story:
      "The category search made it easy to find exactly what I needed for my new apartment.",
    product: "Bought Furniture",
  },
];

export default function SuccessStories() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            Success Stories
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">
            Buyers & Sellers Love NextOwner
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Real marketplace stories from people buying and selling with confidence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-sm transition hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <Quote className="h-5 w-5" />
                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                  {item.role}
                </span>
              </div>

              <div className="mb-5 flex gap-1 text-blue-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <p className="text-sm leading-7 text-slate-600">
                “{item.story}”
              </p>

              <div className="mt-7 border-t border-slate-200 pt-5">
                <h3 className="font-black text-slate-950">{item.name}</h3>
                <p className="mt-1 text-sm font-semibold text-blue-600">
                  {item.product}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}