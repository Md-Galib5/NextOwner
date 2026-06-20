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
  Person,
  At,
  ShieldKeyhole,
} from "@gravity-ui/icons";

import {
  UserPlus,
  ArrowRight,
  ShoppingCart,
  Store,
  Sparkles,
  CheckCircle2,
  Recycle,
} from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("buyer");

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/auth/signin";

  const toggleVisibility = () => setIsVisible(!isVisible);

  const roleOptions = [
    {
      value: "buyer",
      title: "Buyer",
      badge: "Shop Smart",
      description:
        "Browse products, save wishlist items, place secure orders, and track purchases.",
      icon: ShoppingCart,
      highlights: ["Wishlist", "Orders", "Payment"],
    },
    {
      value: "seller",
      title: "Seller",
      badge: "Start Selling",
      description:
        "List used products, manage orders, track sales, and grow your marketplace business.",
      icon: Store,
      highlights: ["Listings", "Sales", "Orders"],
    },
  ];

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const { error: authError } = await signUp.email({
        email,
        password,
        name,
        fetchOptions: {
          body: {
            role,
            status: "active",
          },
        },
      });

      if (authError) {
        setError(authError.message || "Something went wrong during register.");
        return;
      }

      setSuccess("Account created successfully! Welcome to ReSell Hub.");

      setName("");
      setEmail("");
      setPassword("");
      setRole("buyer");

      router.push(redirectTo);
    } catch (err) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 lg:grid-cols-2">
        <section className="hidden lg:block">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
              <Recycle className="h-4 w-4" />
              Join ReSell Hub Marketplace
            </div>

            <h1 className="text-5xl font-black leading-tight text-slate-950">
              Buy and sell pre-owned products with confidence.
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
              Create your account to discover affordable second-hand items,
              reduce waste, and turn unused products into income.
            </p>

            <div className="mt-8 grid max-w-lg gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <ShoppingCart className="h-7 w-7 text-blue-600" />
                <h3 className="mt-4 font-bold text-slate-900">
                  Buyer Dashboard
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Manage orders, wishlist, payment history, and profile.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <Store className="h-7 w-7 text-blue-600" />
                <h3 className="mt-4 font-bold text-slate-900">
                  Seller Dashboard
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Add products, manage listings, track sales, and orders.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Card className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/70">
          <div className="mb-6 border-b border-slate-100 pb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
              <UserPlus className="h-7 w-7" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Create ReSell Hub Account
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Register as a buyer or seller to continue.
            </p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <TextField isRequired name="name" className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-slate-700">
                Full Name
              </Label>

              <InputGroup className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-blue-500 focus-within:bg-white">
                <Person className="text-slate-400" size={16} />

                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-none bg-transparent py-2 text-sm text-slate-900 outline-none"
                />
              </InputGroup>
            </TextField>

            <TextField isRequired name="email" className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-slate-700">
                Email Address
              </Label>

              <InputGroup className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-blue-500 focus-within:bg-white">
                <At className="text-slate-400" size={16} />

                <Input
                  type="email"
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

              <InputGroup className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-blue-500 focus-within:bg-white">
                <ShieldKeyhole className="text-slate-400" size={16} />

                <Input
                  type={isVisible ? "text" : "password"}
                  placeholder="Choose a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-none bg-transparent py-2 text-sm text-slate-900 outline-none"
                />

                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="text-slate-400 transition hover:text-slate-600"
                  aria-label="toggle password visibility"
                >
                  {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </InputGroup>
            </TextField>

         <div className="space-y-2">
  <Label className="text-sm font-semibold text-slate-800">
    Account Type
  </Label>

  <div className="grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
    <button
      type="button"
      onClick={() => setRole("buyer")}
      className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
        role === "buyer"
          ? "bg-white text-blue-600 shadow-sm"
          : "text-slate-500 hover:text-slate-800"
      }`}
    >
      <ShoppingCart className="h-4 w-4" />
      Buyer
    </button>

    <button
      type="button"
      onClick={() => setRole("seller")}
      className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
        role === "seller"
          ? "bg-white text-blue-600 shadow-sm"
          : "text-slate-500 hover:text-slate-800"
      }`}
    >
      <Store className="h-4 w-4" />
      Seller
    </button>
  </div>

  <p className="text-xs text-slate-500">
    {role === "buyer"
      ? "Purchase products, manage orders & wishlist."
      : "List products, manage sales & orders."}
  </p>
</div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-700">
                <span className="font-semibold">Error:</span> {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-3.5 text-xs font-medium text-blue-700">
                <span className="font-semibold">Success:</span> {success}
              </div>
            )}

            <Button
              type="submit"
              isLoading={isLoading}
              isDisabled={isLoading}
              endContent={!isLoading && <ArrowRight className="h-4 w-4" />}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:opacity-95"
            >
              Create Account
            </Button>

            <div className="mt-2 border-t border-slate-100 pt-4 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href={`/auth/signin?redirect=${redirectTo}`}
                className="cursor-pointer text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Sign in instead
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}