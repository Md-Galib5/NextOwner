"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { addReview } from "@/lib/api/reviews";

export default function ReviewForm({ productId, user }) {
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("Please login first.");
      return;
    }

    if (!comment.trim()) {
      alert("Please write a review.");
      return;
    }

    try {
      setLoading(true);

      const result = await addReview({
        productId: String(productId),
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        rating: Number(rating),
        comment: comment.trim(),
      });

      if (result?.success || result?.insertedId) {
        alert("Review submitted successfully");
        setComment("");
        setRating(5);
        router.refresh();
      } else {
        alert(result?.message || "Failed to submit review");
      }
    } catch (error) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h3 className="text-xl font-black text-slate-950">Write a Review</h3>

      <div className="mt-4 flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="transition hover:scale-110"
          >
            <Star
              className={`h-6 w-6 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-300"
              }`}
            />
          </button>
        ))}
      </div>

      <textarea
        rows={4}
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience about this product..."
        className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-4 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}