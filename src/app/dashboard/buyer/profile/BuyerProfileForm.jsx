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
  UploadCloud,
  X,
  Loader2,
} from "lucide-react";

const BuyerProfileForm = ({ user }) => {
  const router = useRouter();

  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [photo, setPhoto] = useState(user?.photo || "");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const isCompleted = user?.buyerProfileCompleted;

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pl-10 text-sm outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100";

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      if (!apiKey) {
        toast.error("ImgBB API key is missing");
        return;
      }

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setPhoto(data.data.url);
        toast.success("Profile image uploaded");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during image upload");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !address || !photo) {
      toast.error("Please complete all buyer profile fields");
      return;
    }

    setLoading(true);

    const res = await updateBuyerProfile(user.email, {
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
        className="relative overflow-hidden rounded-[2rem] border border-cyan-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8"
      >
        <div className="relative z-10">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/90 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Buyer Profile
          </p>

          <h1 className="text-3xl font-black text-slate-950">
            Manage Buyer Profile
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
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col items-center text-center">
            <img
              src={photo || "https://i.pravatar.cc/300?img=5"}
              alt={user?.name || "Buyer"}
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
                Profile Image
              </label>

              <div className="rounded-2xl border border-dashed border-cyan-200 bg-cyan-50/40 p-5">
                {photo && (
                  <div className="mb-4 flex items-center gap-4 rounded-xl bg-white p-3 shadow-sm">
                    <img
                      src={photo}
                      alt="Preview"
                      className="h-16 w-16 rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-800">
                        Image uploaded
                      </p>
                      <p className="truncate text-xs text-slate-500">{photo}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPhoto("")}
                      className="rounded-full bg-red-50 p-2 text-red-600 hover:bg-red-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl bg-white p-6 text-center shadow-sm transition hover:bg-cyan-50">
                  {uploadingImage ? (
                    <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
                  ) : (
                    <UploadCloud className="h-9 w-9 text-cyan-600" />
                  )}

                  <p className="mt-3 text-sm font-black text-slate-800">
                    {uploadingImage ? "Uploading..." : "Click to upload image"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    PNG, JPG, JPEG, WEBP supported
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingImage}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              disabled={loading || uploadingImage}
              className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-300 disabled:opacity-60"
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