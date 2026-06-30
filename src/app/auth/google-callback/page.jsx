// app/auth/google-callback/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  useEffect(() => {
    const saveGoogleUser = async () => {
      const { data } = await authClient.getSession();

      const user = data?.user;
      const role = localStorage.getItem("nextowner-role") || "buyer";

      if (!user?.email) {
        router.push("/auth/signin");
        return;
      }

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          photo: user.image,
          role,
          status: "active",
        }),
      });

      localStorage.removeItem("nextowner-role");
      router.push(redirectTo);
      router.refresh();
    };

    saveGoogleUser();
  }, [router, redirectTo]);

  return <p className="p-6">Saving your account...</p>;
}