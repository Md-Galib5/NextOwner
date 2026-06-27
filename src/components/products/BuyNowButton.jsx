"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

export default function BuyNowButton({ product }) {
  const [loading, setLoading] = useState(false);

  const handleBuyNow = async () => {
    try {
      setLoading(true);

      if (!product?._id) {
        toast.error("Product not found");
        return;
      }

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          title: product.title,
          price: product.price,
          image: product.images?.[0] || "",
          description: product.description || "",
          sellerEmail: product.sellerInfo?.email || "",
        }),
      });

      const data = await res.json();

      console.log("Stripe checkout response:", data);

      if (!res.ok || !data?.success) {
        toast.error(data?.message || "Failed to start payment");
        return;
      }

      if (!data?.url) {
        toast.error("Stripe checkout URL not found");
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Buy now error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBuyNow}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <ShoppingCart className="h-4 w-4" />
      {loading ? "Redirecting..." : "Buy Now"}
    </button>
  );
}