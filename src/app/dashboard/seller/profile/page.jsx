import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserById } from "@/lib/api/user";
import SellerProfileForm from "./SellerProfileForm";

const SellerProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;
  const user = await getUserById(userId);

  return <SellerProfileForm user={user} />;
};

export default SellerProfilePage;