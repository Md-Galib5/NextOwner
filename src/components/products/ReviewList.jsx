import { Star } from "lucide-react";

export default function ReviewsList({
  reviews,
}) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="rounded-2xl border border-slate-200 p-5"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-black">
              {review.userName}
            </h4>

            <div className="flex">
              {[...Array(review.rating)].map(
                (_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                )
              )}
            </div>
          </div>

          <p className="mt-3 text-slate-600">
            {review.comment}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            {new Date(
              review.createdAt
            ).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}