import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserById } from "@/lib/api/user";
import BuyerProfileForm from "./BuyerProfileForm";

const BuyerProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;
  const user = await getUserById(userId);

  return <BuyerProfileForm user={user} />;
};

export default BuyerProfilePage;