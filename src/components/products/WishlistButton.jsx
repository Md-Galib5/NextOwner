"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

export default function WishlistButton({ product }) {
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleWishlist = async () => {
    if (isPending || loading) return;

    if (!session?.user?.email) {
      toast.error("Please login first");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: session.user.email,
            product,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data?.message || "Failed to add wishlist");
        return;
      }

      setAdded(true);
      toast.success(data?.message || "Added to wishlist");
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleWishlist}
      disabled={loading || isPending || added}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition disabled:opacity-70 ${
        added
          ? "border-rose-300 bg-rose-50 text-rose-600"
          : "border-slate-200 bg-white text-slate-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
      }`}
    >
      <Heart
        size={18}
        fill={added ? "currentColor" : "none"}
        className={loading ? "animate-ping" : added ? "scale-110" : ""}
      />

      {loading ? "Adding..." : added ? "Added" : "Wishlist"}
    </button>
  );
}