import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getWishlist } from "@/lib/actions/products";
import WishlistClient from "./WishlistClient";

export default async function WishlistPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;
  const items = email ? await getWishlist(email) : [];

  return <WishlistClient items={items} />;
}