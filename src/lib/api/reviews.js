// src/lib/api/reviews.js

export const addReview = async (reviewData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  return res.json();
};

export const getProductReviews = async (productId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/${productId}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};