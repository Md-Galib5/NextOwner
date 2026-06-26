"use client";

import { useState } from "react";
import { updateSellerProfile } from "@/lib/api/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Camera, MapPin, Phone, ShieldCheck, User } from "lucide-react";

const SellerProfileForm = ({ user }) => {
  const router = useRouter();
  // console.log(user)

  const [phone, setPhone] = useState(user?.phone || "");
  const [location, setLocation] = useState(user?.location || "");
  const [photo, setPhoto] = useState(user?.photo || "");
  const [loading, setLoading] = useState(false);

  const isCompleted = user?.sellerProfileCompleted;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !location || !photo) {
      toast.error("Please complete all seller profile fields");
      return;
    }

    setLoading(true);

    const res = await updateSellerProfile(user.email, {
  phone,
  location,
  photo,
  status: "active",
});

    setLoading(false);

    if (res.success) {
      toast.success("Seller profile completed");
      router.push("/dashboard/seller");
      router.refresh();
    } else {
      toast.error(res.message || "Failed to update profile");
    }
  };

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-8 text-white shadow-xl">
        <p className="mb-2 inline-flex rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-blue-100">
          Seller Verification
        </p>

        <h1 className="text-3xl font-black">Complete Seller Profile</h1>

        <p className="mt-3 max-w-xl text-sm text-slate-300">
          Complete your seller information before adding products, managing
          orders, or using seller tools.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <img
              src={photo || "https://i.pravatar.cc/300?img=1"}
              alt={user?.name}
              className="h-28 w-28 rounded-full object-cover ring-4 ring-blue-100"
            />

            <h2 className="mt-4 text-xl font-black text-slate-950">
              {user?.name}
            </h2>

            <p className="text-sm text-slate-500">{user?.email}</p>

            <span className="mt-4 rounded-full bg-blue-50 px-4 py-1 text-xs font-bold text-blue-700">
              Current Role: {user?.role}
            </span>

            {isCompleted ? (
              <div className="mt-4 flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
                <ShieldCheck className="h-4 w-4" />
                Profile Completed
              </div>
            ) : (
              <div className="mt-4 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600">
                Profile Incomplete
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Name
              </label>
              <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">
                <User className="h-4 w-4" />
                {user?.name}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Email
              </label>
              <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">
                {user?.email}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+8801712345678"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pl-10 text-sm outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Dhaka, Bangladesh"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pl-10 text-sm outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Photo URL
              </label>
              <div className="relative">
                <Camera className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder="https://i.pravatar.cc/300?img=1"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pl-10 text-sm outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Complete Seller Profile"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SellerProfileForm;