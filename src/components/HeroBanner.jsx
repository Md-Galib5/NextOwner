"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Truck, BadgeCheck } from "lucide-react";

import {
  ShieldCheck,
  Tags,
  Leaf,
  ShoppingBag,
  ShoppingCart,
  PackagePlus,
} from "lucide-react";

import BANNER from "../../public/banner.png";

export default function HeroBanner() {
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -35 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 40, scale: 0.97 },
    visible: { opacity: 1, x: 0, scale: 1 },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      icon: ShieldCheck,
      title: "Safe & Secure",
      text: "Trusted deals",
    },
    {
      icon: Tags,
      title: "Great Deals",
      text: "Save more",
    },
    {
      icon: Leaf,
      title: "Sustainable",
      text: "Reuse smarter",
    },
  ];

  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
        {/* LEFT CONTENT */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          {/* BADGE */}
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600"
          >
            <ShoppingBag className="h-4 w-4 shrink-0 text-blue-600" />
            Trusted Second-Hand Marketplace
          </motion.span>

          {/* HEADING */}
          <motion.h1
            variants={fadeLeft}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="text-4xl font-black leading-[1.05] text-slate-950 sm:text-5xl lg:text-6xl"
          >
            Buy. Sell. Inspire.
            <span className="block text-blue-600">
              Give items a second life.
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg lg:mx-0"
          >
            NextOwner helps you discover quality pre-owned products, sell unused
            items, and shop with confidence at great prices.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button
              as={Link}
              href="/products"
              radius="lg"
              startContent={
                <ShoppingCart className="h-4 w-4 shrink-0 text-white" />
              }
              endContent={<Tags className="h-4 w-4 shrink-0 text-white" />}
              className="h-12 bg-blue-600 px-8 text-base font-semibold text-white hover:bg-blue-700"
            >
              Browse Products
            </Button>

            <Button
              as={Link}
              href="/dashboard/add-product"
              radius="lg"
              variant="bordered"
              startContent={
                <PackagePlus className="h-4 w-4 shrink-0 text-blue-600" />
              }
              endContent={
                <ShieldCheck className="h-4 w-4 shrink-0 text-blue-600" />
              }
              className="h-12 border-blue-200 px-8 text-base font-semibold text-blue-600 hover:bg-blue-50"
            >
              Sell Your Item
            </Button>
          </motion.div>

          {/* FEATURES */}
          <motion.div
            variants={staggerContainer}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <Icon className="mx-auto h-6 w-6 text-blue-600 lg:mx-0" />

                  <h3 className="mt-3 font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">{item.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeRight}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="order-1 lg:order-2"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-200"
          >
            <Image
              src={BANNER}
              alt="Second-hand marketplace products"
              width={900}
              height={900}
              className="h-auto w-full object-cover"
              priority
            />

            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-black/5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
