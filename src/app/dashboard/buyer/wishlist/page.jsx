import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getWishlist } from "@/lib/actions/products";
import WishlistClient from "./WishlistClient";

export default async function WishlistPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  let items = [];

  if (email) {
    try {
      const result = await getWishlist(email);

      // Handle different response shapes
      if (Array.isArray(result)) {
        items = result;
      } else if (Array.isArray(result?.items)) {
        items = result.items;
      } else if (Array.isArray(result?.wishlist)) {
        items = result.wishlist;
      } else if (Array.isArray(result?.data)) {
        items = result.data;
      } else {
        items = [];
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
      items = [];
    }
  }

  return <WishlistClient items={items} />;
}