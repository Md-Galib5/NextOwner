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

import { Eye, EyeSlash, Person, At, ShieldKeyhole } from "@gravity-ui/icons";

import {
  UserPlus,
  ArrowRight,
  ShoppingCart,
  Store,
  Recycle,
} from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("buyer");

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const toggleVisibility = () => setIsVisible(!isVisible);

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

      setSuccess("Account created successfully! Redirecting...");
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setSuccess("");
    setGoogleLoading(true);

    try {
      localStorage.setItem("nextowner-role", role);

      await signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
    } catch (err) {
      setError(err?.message || "Google sign up failed.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 lg:grid-cols-2">
        <section className="hidden lg:block">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
              <Recycle className="h-4 w-4" />
              Join NextOwner Marketplace
            </div>

            <h1 className="text-5xl font-black leading-tight text-slate-950">
              Buy and sell pre-owned products with confidence.
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
              Create your account to discover affordable second-hand items,
              reduce waste, and turn unused products into income.
            </p>
          </div>
        </section>

        <Card className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/70">
          <div className="mb-6 border-b border-slate-100 pb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
              <UserPlus className="h-7 w-7" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Create NextOwner Account
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Register as a buyer or seller to continue.
            </p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
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
            </div>

            <Button
              type="button"
              onClick={handleGoogleSignup}
              isLoading={googleLoading}
              isDisabled={googleLoading || isLoading}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Continue with Google
            </Button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <TextField isRequired name="name" className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-slate-700">
                Full Name
              </Label>

              <InputGroup className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-blue-500 focus-within:bg-white">
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

              <InputGroup className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-blue-500 focus-within:bg-white">
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

              <InputGroup className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-blue-500 focus-within:bg-white">
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
                  className="text-slate-400 hover:text-slate-600"
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
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-3.5 text-xs font-medium text-blue-700">
                <span className="font-semibold">Success:</span> {success}
              </div>
            )}

            <Button
              type="submit"
              isLoading={isLoading}
              isDisabled={isLoading || googleLoading}
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