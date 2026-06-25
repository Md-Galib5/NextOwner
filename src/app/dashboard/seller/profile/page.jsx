import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserByEmail } from "@/lib/api/user";
import SellerProfileForm from "./SellerProfileForm";

export default async function SellerProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  const user = email ? await getUserByEmail(email) : null;

  console.log(user)

  return <SellerProfileForm user={user} />;
}