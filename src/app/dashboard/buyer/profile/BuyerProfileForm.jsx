"use client";

import { useState } from "react";
import { updateBuyerProfile } from "@/lib/api/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Camera,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  Mail,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

const BuyerProfileForm = ({ user }) => {
  const router = useRouter();

  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [photo, setPhoto] = useState(user?.photo || "");
  const [loading, setLoading] = useState(false);

  const isCompleted = user?.buyerProfileCompleted;

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pl-10 text-sm outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !address || !photo) {
      toast.error("Please complete all buyer profile fields");
      return;
    }

    setLoading(true);

    const res = await updateBuyerProfile(user._id, {
      phone,
      address,
      photo,
      status: "active",
    });

    setLoading(false);

    if (res.success) {
      toast.success("Buyer profile updated successfully");
      router.push("/dashboard/buyer");
      router.refresh();
    } else {
      toast.error(res.message || "Failed to update profile");
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      className="space-y-8"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0 },
        }}
        animate={{
          boxShadow: [
            "0 0 0px rgba(6,182,212,0.15)",
            "0 0 40px rgba(6,182,212,0.3)",
            "0 0 0px rgba(6,182,212,0.15)",
          ],
        }}
        transition={{
          duration: 0.5,
          boxShadow: {
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative overflow-hidden rounded-[2rem] border border-cyan-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8"
      >
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl"
        />

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-300/30 blur-3xl"
        />

        <div className="relative z-10">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/90 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm backdrop-blur">
            <motion.span
              animate={{ rotate: 360, scale: [1, 1.15, 1] }}
              transition={{
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.span>
            Buyer Profile
          </p>

          <h1 className="text-3xl font-black text-slate-950">
            Manage{" "}
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                filter: [
                  "drop-shadow(0 0 0px rgba(6,182,212,0))",
                  "drop-shadow(0 0 12px rgba(6,182,212,0.5))",
                  "drop-shadow(0 0 0px rgba(6,182,212,0))",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="inline-block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-[length:250%_auto] bg-clip-text text-transparent"
            >
              Buyer Profile
            </motion.span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Update your delivery information, phone number, and profile image
            for a smoother NextOwner shopping experience.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -24 },
            visible: { opacity: 1, x: 0 },
          }}
          whileHover={{ y: -4 }}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col items-center text-center">
            <motion.img
              src={photo || "https://i.pravatar.cc/300?img=5"}
              alt={user?.name || "Buyer"}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(6,182,212,0.2)",
                  "0 0 30px rgba(6,182,212,0.45)",
                  "0 0 0px rgba(6,182,212,0.2)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-28 w-28 rounded-full object-cover ring-4 ring-cyan-100"
            />

            <h2 className="mt-4 text-xl font-black text-slate-950">
              {user?.name}
            </h2>

            <p className="text-sm text-slate-500">{user?.email}</p>

            <span className="mt-4 rounded-full bg-cyan-50 px-4 py-1 text-xs font-bold text-cyan-700">
              Current Role: {user?.role || "buyer"}
            </span>

            {isCompleted ? (
              <div className="mt-4 flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
                <ShieldCheck className="h-4 w-4" />
                Profile Completed
              </div>
            ) : (
              <div className="mt-4 rounded-full bg-yellow-50 px-4 py-2 text-sm font-bold text-yellow-700">
                Profile Incomplete
              </div>
            )}

            <div className="mt-6 grid w-full grid-cols-2 gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
                <ShoppingCart className="mx-auto h-5 w-5 text-cyan-600" />
                <p className="mt-2 text-lg font-black text-slate-950">24</p>
                <p className="text-xs text-slate-500">Orders</p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 p-4">
                <ShieldCheck className="mx-auto h-5 w-5 text-blue-600" />
                <p className="mt-2 text-lg font-black text-slate-950">Safe</p>
                <p className="text-xs text-slate-500">Buyer</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          variants={{
            hidden: { opacity: 0, x: 24 },
            visible: { opacity: 1, x: 0 },
          }}
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
        >
          <div className="mb-6 border-b border-slate-100 pb-5">
            <h2 className="text-xl font-black text-slate-950">
              Personal Information
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Keep your profile updated for orders and delivery communication.
            </p>
          </div>

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
              <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">
                <Mail className="h-4 w-4" />
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
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Dhaka, Bangladesh"
                  className={inputClass}
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
                  placeholder="https://i.pravatar.cc/300?img=5"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              disabled={loading}
              className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg  transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-300 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Update Buyer Profile"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/dashboard/buyer")}
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default BuyerProfileForm;