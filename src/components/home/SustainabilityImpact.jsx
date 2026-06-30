"use client";

import { motion } from "framer-motion";
import { Leaf, Recycle, ShieldCheck } from "lucide-react";
import CountUp from "./CountUp";

export default function SustainabilityImpact() {
  const impacts = [
    {
      icon: Leaf,
      value: 2500,
      suffix: "+",
      title: "Items Reused",
      description:
        "Products given a second life instead of ending up as waste.",
    },
    {
      icon: Recycle,
      value: 1200,
      suffix: " KG",
      title: "Waste Reduced",
      description:
        "Estimated reduction in landfill waste through second-hand trading.",
    },
    {
      icon: ShieldCheck,
      value: 5000,
      suffix: "+",
      title: "Sustainable Transactions",
      description:
        "Successful purchases helping create a circular economy.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-bold text-emerald-700">
            Sustainability Impact
          </span>

          <h2 className="mt-5 text-4xl font-black text-slate-950 md:text-5xl">
            Every Purchase Makes a Difference
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-slate-600">
            Buying and selling pre-owned products helps reduce waste,
            conserve resources, and support a more sustainable future.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {impacts.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Icon className="h-7 w-7" />
                </div>

                <motion.h3
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl font-black text-slate-950"
                >
                  <CountUp
                    to={item.value}
                    suffix={item.suffix}
                  />
                </motion.h3>

                <h4 className="mt-3 text-xl font-bold text-slate-900">
                  {item.title}
                </h4>

                <p className="mt-3 text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-[2rem] bg-gradient-to-r from-emerald-600 to-blue-600 p-10 text-center text-white"
        >
          <h3 className="text-3xl font-black">
            Choose Reuse. Reduce Waste.
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-emerald-50">
            Every item bought second-hand helps extend product lifecycles,
            reduces manufacturing demand, and contributes to a greener planet.
          </p>
        </motion.div>
      </div>
    </section>
  );
}