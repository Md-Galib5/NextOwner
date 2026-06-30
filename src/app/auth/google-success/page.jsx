"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function GoogleSuccessPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) return;

    const role = localStorage.getItem("nextowner-role") || "buyer";

    const updateRole = async () => {
      await fetch("/api/user/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      localStorage.removeItem("nextowner-role");
      router.push("/");
    };

    updateRole();
  }, [session]);

  return <h2>Signing you in...</h2>;
}