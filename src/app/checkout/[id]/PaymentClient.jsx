"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  Phone,
  Truck,
  User,
} from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import { getUserByEmail } from "@/lib/api/user";
import { createOrder } from "@/lib/api/orders";

export default function PaymentClient({ product }) {
  const { data: session } = useSession();

  const [dbUser, setDbUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      if (!session?.user?.email) {
        setLoadingUser(false);
        return;
      }

     const user = await getUserByEmail(session.user.email);

setDbUser(user);
setPhone(user?.phone || "");
setCity(user?.location || "");
setAddress("");
setLoadingUser(false);
    };

    loadUser();
  }, [session?.user?.email]);

  const userName = dbUser?.name || session?.user?.name || "";
  const userEmail = dbUser?.email || session?.user?.email || "";

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!userName || !userEmail || !phone || !city || !address) {
      toast.error("Please fill in all checkout fields");
      return;
    }

    const orderData = {
      buyerInfo: {
        userId: dbUser?._id || session?.user?.id,
        name: userName,
        email: userEmail,
        phone,
        location: city,
        deliveryAddress: address,
      },

      sellerInfo: {
        userId: product?.sellerInfo?.userId,
        name: product?.sellerInfo?.name,
        email: product?.sellerInfo?.email,
        phone: product?.sellerInfo?.phone,
        location: product?.sellerInfo?.location,
      },

      productInfo: {
        productId: product?._id,
        title: product?.title,
        image: product?.images?.[0],
        price: product?.price,
        category: product?.category,
        condition: product?.condition,
      },

      paymentStatus: "pending",
      orderStatus: "pending",
    };

    try {
      setLoading(true);

      const res = await createOrder(orderData);

      if (res?.success) {
        toast.success("Order placed successfully");
        setAddress("");
      } else {
        toast.error(res?.message || "Failed to place order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
        <motion.form
          onSubmit={handlePayment}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              <Lock className="h-4 w-4" />
              Secure Checkout
            </div>

            <h1 className="text-3xl font-black text-slate-950">
              Complete Your Purchase
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Your name, email, phone, and city are loaded from your profile.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <ReadOnlyField icon={User} label="Full Name" value={userName} />
            <ReadOnlyField icon={Mail} label="Email" value={userEmail} />

            <Field
              icon={Phone}
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+8801712345678"
            />

            <Field
              icon={MapPin}
              label="City / Location"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Dhaka"
            />

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Delivery Address
              </label>

              <textarea
                required
                rows={4}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Write your full delivery address..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <Truck className="mt-1 h-5 w-5 text-blue-700" />
              <div>
                <h3 className="font-black text-slate-900">Delivery Method</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Seller will contact buyer to confirm delivery or pickup.
                </p>
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-blue-600 disabled:opacity-60"
          >
            <CreditCard className="h-4 w-4" />
            {loading ? "Placing Order..." : "Continue to Payment"}
          </button>
        </motion.form>

        <motion.aside
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="space-y-5"
        >
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
            <img
              src={product?.images?.[0] || "/placeholder-product.png"}
              alt={product?.title || "Product"}
              className="h-56 w-full rounded-2xl object-cover"
            />

            <div className="mt-4">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                {product?.category || "Product"}
              </span>

              <h2 className="mt-3 text-xl font-black text-slate-950">
                {product?.title || "Selected Product"}
              </h2>

              <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                {product?.description || "Product details will appear here."}
              </p>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <span className="text-sm font-bold text-slate-500">Total</span>
                <span className="text-2xl font-black text-slate-950">
                  ${product?.price || 0}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
              <BadgeCheck className="h-4 w-4" />
              Seller Information
            </div>

            <Info label="Seller" value={product?.sellerInfo?.name} />
            <Info label="Email" value={product?.sellerInfo?.email} />
            <Info label="Phone" value={product?.sellerInfo?.phone} />
            <Info label="Location" value={product?.sellerInfo?.location} />
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function ReadOnlyField({ icon: Icon, label, value }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-3 text-sm font-semibold text-slate-500">
        <Icon className="h-4 w-4 text-slate-400" />
        {value || "Not available"}
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          required
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pl-10 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
        />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="border-b border-slate-100 py-3 last:border-0">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-slate-900">
        {value || "Not available"}
      </p>
    </div>
  );
}