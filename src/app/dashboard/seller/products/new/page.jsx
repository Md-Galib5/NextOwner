"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  Select,
  ListBox,
  Button,
} from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import {
  PackagePlus,
  ImagePlus,
  DollarSign,
  Boxes,
  Sparkles,
  AlertTriangle,
  X,
} from "lucide-react";
import { addproducts } from "@/lib/actions/products";
import { getUserByEmail } from "@/lib/api/user";
import { toast } from "react-toastify";

export default function AddProductPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [dbUser, setDbUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      if (!session?.user?.email) return;

      const user = await getUserByEmail(session.user.email);
      setDbUser(user);
      setUserLoading(false);
    };

    loadUser();
  }, [session]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length !== files.length) {
      toast.error("Only image files are allowed");
      return;
    }

    setImageFiles((prev) => [...prev, ...validFiles]);

    const previews = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImagesToImgBB = async () => {
    const uploadedUrls = [];

    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error("Image upload failed");
      }

      uploadedUrls.push(data.data.url);
    }

    return uploadedUrls;
  };

  if (isPending || userLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  if (!dbUser?.sellerProfileCompleted) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-bold text-red-700">
            Complete your seller profile first
          </h2>
        </div>

        <p className="mt-2 text-sm text-red-600">
          You must add phone, location, and photo before adding products.
        </p>

        <Button
          onClick={() => router.push("/dashboard/seller/profile")}
          className="mt-5 rounded-xl bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
        >
          Complete Profile
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const newErrors = {};

    if (!data.title) newErrors.title = "Product title is required";
    if (!data.category) newErrors.category = "Category is required";
    if (!data.condition) newErrors.condition = "Condition is required";
    if (!data.price) newErrors.price = "Price is required";
    if (!data.stock) newErrors.stock = "Stock quantity is required";
    if (!data.description) newErrors.description = "Description is required";
    if (imageFiles.length === 0) newErrors.images = "At least one image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsUploading(true);

    try {
      const uploadedImages = await uploadImagesToImgBB();

      const productPayload = {
        title: data.title,
        category: data.category,
        condition: data.condition,
        price: Number(data.price),
        stock: Number(data.stock),
        images: uploadedImages,
        description: data.description,
        sellerInfo: {
          userId: dbUser?._id,
          name: dbUser?.name,
          email: dbUser?.email,
          phone: dbUser?.phone,
          location: dbUser?.location,
          photo: dbUser?.photo,
        },
        status: "available",
        createdAt: new Date(),
      };

      const res = await addproducts(productPayload);

      if (res.insertedId) {
        toast.success("Product added successfully");

        form.reset();
        formRef.current?.reset();
        setImageFiles([]);
        setImagePreviews([]);
        setErrors({});

        setTimeout(() => {
          router.push("/dashboard/seller");
        }, 1500);
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <PackagePlus className="h-7 w-7" />
          </div>

          <div>
            <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Seller Product Listing
            </div>

            <h1 className="text-2xl font-black text-slate-950">
              Add New Product
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Upload product images and create a trusted listing.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-8"
          validationErrors={errors}
          validationBehavior="aria"
        >
          <Fieldset className="w-full space-y-6">
            <legend className="mb-2 w-full border-b border-slate-100 pb-3 text-lg font-bold text-slate-900">
              Product Information
            </legend>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextField name="title" isInvalid={!!errors.title}>
                <Label className="text-sm font-semibold text-slate-700">
                  Product Title
                </Label>
                <Input
                  name="title"
                  placeholder="e.g. Used Dell Inspiron 15 Laptop"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500"
                />
                {errors.title && (
                  <p className="text-xs text-red-500">{errors.title}</p>
                )}
              </TextField>

              <Select name="category" isInvalid={!!errors.category}>
                <Label className="mb-1 block text-sm font-semibold text-slate-700">
                  Category
                </Label>
                <Select.Trigger className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm">
                  <Select.Value placeholder="Select category" />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover className="rounded-xl border bg-white p-1 shadow-xl">
                  <ListBox>
                    {[
                      "Electronics",
                      "Mobile Phones",
                      "Computers",
                      "Fashion",
                      "Furniture",
                      "Home Appliances",
                      "Sports",
                      "Books",
                      "Vehicles",
                      "Others",
                    ].map((item) => (
                      <ListBox.Item key={item} id={item} textValue={item}>
                        {item}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Select name="condition" isInvalid={!!errors.condition}>
                <Label className="mb-1 block text-sm font-semibold text-slate-700">
                  Condition
                </Label>
                <Select.Trigger className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm">
                  <Select.Value placeholder="Select condition" />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover className="rounded-xl border bg-white p-1 shadow-xl">
                  <ListBox>
                    {["Like New", "Excellent", "Good", "Fair", "Refurbished"].map(
                      (item) => (
                        <ListBox.Item key={item} id={item} textValue={item}>
                          {item}
                        </ListBox.Item>
                      )
                    )}
                  </ListBox>
                </Select.Popover>
              </Select>

              <div className="grid grid-cols-2 gap-4">
                <TextField name="price" isInvalid={!!errors.price}>
                  <Label className="text-sm font-semibold text-slate-700">
                    Price
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      name="price"
                      type="number"
                      placeholder="35000"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pl-9 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </TextField>

                <TextField name="stock" isInvalid={!!errors.stock}>
                  <Label className="text-sm font-semibold text-slate-700">
                    Stock
                  </Label>
                  <div className="relative">
                    <Boxes className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      name="stock"
                      type="number"
                      placeholder="1"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pl-9 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </TextField>
              </div>
            </div>
          </Fieldset>

          <Fieldset className="w-full space-y-5">
            <legend className="mb-2 border-b border-slate-100 pb-3 text-lg font-bold text-slate-900">
              Product Images
            </legend>

            <label className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-6 text-center transition hover:bg-blue-50">
              <ImagePlus className="h-10 w-10 text-blue-600" />
              <p className="mt-3 text-sm font-bold text-slate-800">
                Click to upload product images
              </p>
              <p className="mt-1 text-xs text-slate-500">
                PNG, JPG, JPEG, WEBP supported
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {errors.images && (
              <p className="text-xs text-red-500">{errors.images}</p>
            )}

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {imagePreviews.map((src, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                  >
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="h-32 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white shadow"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Fieldset>

          <Fieldset className="w-full space-y-5">
            <legend className="mb-2 border-b border-slate-100 pb-3 text-lg font-bold text-slate-900">
              Description
            </legend>

            <TextField name="description" isInvalid={!!errors.description}>
              <Label className="text-sm font-semibold text-slate-700">
                Product Description
              </Label>
              <TextArea
                name="description"
                rows={5}
                placeholder="Product description..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-blue-500"
              />
            </TextField>
          </Fieldset>

          <div className="flex justify-end border-t border-slate-100 pt-6">
            <Button
              type="submit"
              isDisabled={isUploading}
              className="h-12 rounded-xl bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700"
            >
              {isUploading ? "Uploading..." : "Publish Product"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}