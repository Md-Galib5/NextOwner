"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Link,
  TextField,
  Label,
  InputGroup,
  Input,
} from "@heroui/react";
import {
  Eye,
  EyeSlash,
  At,
  ShieldKeyhole,
} from "@gravity-ui/icons";
import {
  ShoppingBag,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const { error: authError } = await signIn.email({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
      } else {
        setSuccess("Signed in successfully! Redirecting...");
        setEmail("");
        setPassword("");
        router.push(redirectTo);
      }
    } catch (err) {
      setError("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50/40 to-slate-100 px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* LEFT BRAND SECTION */}
        <div className="hidden lg:block">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
              <ShoppingBag className="h-4 w-4" />
              Welcome to NextOwner
            </div>

            <h1 className="text-5xl font-black leading-tight text-slate-950">
              Continue your trusted marketplace journey.
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
              Sign in to manage your listings, track orders, save wishlist
              items, and discover quality pre-owned products with confidence.
            </p>

            <div className="mt-8 grid max-w-lg gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
                <h3 className="mt-3 font-bold text-slate-900">
                  Secure Access
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Protected buyer and seller dashboard.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <BadgeCheck className="h-6 w-6 text-blue-600" />
                <h3 className="mt-3 font-bold text-slate-900">
                  Verified Deals
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Shop and sell with more confidence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <Card className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/70">
          <div className="mb-6 border-b border-slate-100 pb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <ShoppingBag className="h-7 w-7" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Sign in to NextOwner
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Access your marketplace account securely.
            </p>
          </div>

          <form onSubmit={handleSignin} className="flex flex-col gap-5">
            <TextField
              isRequired
              name="email"
              type="email"
              className="flex flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-slate-700">
                Email Address
              </Label>

              <InputGroup className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-blue-500 focus-within:bg-white">
                <At className="pointer-events-none text-slate-400" size={16} />
                <Input
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-none bg-transparent py-2 text-sm text-slate-900 outline-none"
                />
              </InputGroup>
            </TextField>

            <TextField
              isRequired
              name="password"
              className="flex flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-slate-700">
                Password
              </Label>

              <InputGroup className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-blue-500 focus-within:bg-white">
                <ShieldKeyhole
                  className="pointer-events-none text-slate-400"
                  size={16}
                />

                <Input
                  type={isVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-none bg-transparent py-2 text-sm text-slate-900 outline-none"
                />

                <button
                  className="text-slate-400 transition hover:text-slate-600 focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </InputGroup>
            </TextField>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-700">
                <span className="font-semibold">Error:</span> {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-medium text-emerald-700">
                <span className="font-semibold">Success:</span> {success}
              </div>
            )}

            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700"
              isLoading={isLoading}
              isDisabled={isLoading}
              endContent={!isLoading && <ArrowRight className="h-4 w-4" />}
            >
              Sign In
            </Button>

            <div className="mt-2 border-t border-slate-100 pt-4 text-center text-sm text-slate-500">
              New to NextOwner?{" "}
              <Link
                href={`/auth/signup?redirect=${redirectTo}`}
                className="cursor-pointer text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Create an account
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}