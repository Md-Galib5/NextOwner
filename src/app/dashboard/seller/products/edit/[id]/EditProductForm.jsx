"use client";

import React, { useState } from "react";
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
import {
  PackagePlus,
  ImagePlus,
  DollarSign,
  Boxes,
  Sparkles,
  X,
  Save,
  ArrowLeft,
} from "lucide-react";
import { updateProduct } from "@/lib/actions/products";
import { toast } from "react-toastify";

export default function EditProductForm({ product }) {
  const router = useRouter();

  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState(product?.title || "");
  const [category, setCategory] = useState(product?.category || "");
  const [condition, setCondition] = useState(product?.condition || "");
  const [price, setPrice] = useState(product?.price || "");
  const [stock, setStock] = useState(product?.stock || "");
  const [description, setDescription] = useState(product?.description || "");
  const [existingImages, setExistingImages] = useState(product?.images || []);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
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
  ];

  const conditions = ["Like New", "Excellent", "Good", "Fair", "Refurbished"];

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length !== files.length) {
      toast.error("Only image files are allowed");
      return;
    }

    setImageFiles((prev) => [...prev, ...validFiles]);
    setImagePreviews((prev) => [
      ...prev,
      ...validFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!title) newErrors.title = "Product title is required";
    if (!category) newErrors.category = "Category is required";
    if (!condition) newErrors.condition = "Condition is required";
    if (!price) newErrors.price = "Price is required";
    if (!stock) newErrors.stock = "Stock quantity is required";
    if (!description) newErrors.description = "Description is required";

    if (existingImages.length === 0 && imageFiles.length === 0) {
      newErrors.images = "At least one product image is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsUploading(true);

    try {
      const uploadedImages =
        imageFiles.length > 0 ? await uploadImagesToImgBB() : [];

      const payload = {
        title,
        category,
        condition,
        price: Number(price),
        stock: Number(stock),
        images: [...existingImages, ...uploadedImages],
        description,
        status: product?.status || "available",
      };

      const res = await updateProduct(product._id, payload);

      if (res?.success || res?.modifiedCount > 0) {
  toast.success("Product updated successfully");

  router.replace("/dashboard/seller/products");
} else {
  toast.error(res?.message || "Failed to update product");
}
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-5 shadow-sm sm:p-6">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-200/40 blur-2xl" />
        <div className="absolute -bottom-12 left-20 h-32 w-32 rounded-full bg-cyan-200/40 blur-2xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <PackagePlus className="h-7 w-7" />
            </div>

            <div>
              <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Seller Product Manager
              </div>

              <h1 className="text-2xl font-black text-slate-950">
                Edit Product
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Update listing details, pricing, stock, and product images.
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => router.push("/dashboard/seller/products")}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <Form
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
              <TextField isInvalid={!!errors.title}>
                <Label className="text-sm font-semibold text-slate-700">
                  Product Title
                </Label>

                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Used Dell Inspiron 15 Laptop"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500"
                />

                {errors.title && (
                  <p className="text-xs text-red-500">{errors.title}</p>
                )}
              </TextField>

              <Select
                selectedKeys={category ? [category] : []}
                onSelectionChange={(keys) =>
                  setCategory(Array.from(keys) || "")
                }
                isInvalid={!!errors.category}
              >
                <Label className="mb-1 block text-sm font-semibold text-slate-700">
                  Category
                </Label>

                <Select.Trigger className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm">
                  <span className="truncate">
                    {category || "Select category"}
                  </span>
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover className="rounded-xl border bg-white p-1 shadow-xl">
                  <ListBox>
                    {categories.map((item) => (
                      <ListBox.Item
                        key={item}
                        id={item}
                        textValue={item}
                        className="whitespace-normal break-words py-2"
                      >
                        {item}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>

                {errors.category && (
                  <p className="text-xs text-red-500">{errors.category}</p>
                )}
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Select
                selectedKeys={condition ? [condition] : []}
                onSelectionChange={(keys) =>
                  setCondition(Array.from(keys) || "")
                }
                isInvalid={!!errors.condition}
              >
                <Label className="mb-1 block text-sm font-semibold text-slate-700">
                  Condition
                </Label>

                <Select.Trigger className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm">
                  <span className="truncate">
                    {condition || "Select condition"}
                  </span>
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover className="rounded-xl border bg-white p-1 shadow-xl">
                  <ListBox>
                    {conditions.map((item) => (
                      <ListBox.Item
                        key={item}
                        id={item}
                        textValue={item}
                        className="whitespace-normal break-words py-2"
                      >
                        {item}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>

                {errors.condition && (
                  <p className="text-xs text-red-500">{errors.condition}</p>
                )}
              </Select>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField isInvalid={!!errors.price}>
                  <Label className="text-sm font-semibold text-slate-700">
                    Price
                  </Label>

                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      placeholder="35000"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pl-9 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  {errors.price && (
                    <p className="text-xs text-red-500">{errors.price}</p>
                  )}
                </TextField>

                <TextField isInvalid={!!errors.stock}>
                  <Label className="text-sm font-semibold text-slate-700">
                    Stock
                  </Label>

                  <div className="relative">
                    <Boxes className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      type="number"
                      placeholder="1"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pl-9 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  {errors.stock && (
                    <p className="text-xs text-red-500">{errors.stock}</p>
                  )}
                </TextField>
              </div>
            </div>
          </Fieldset>

          <Fieldset className="w-full space-y-5">
            <legend className="mb-2 border-b border-slate-100 pb-3 text-lg font-bold text-slate-900">
              Product Images
            </legend>

            <label className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-6 text-center transition hover:border-blue-300 hover:bg-blue-50">
              <ImagePlus className="h-10 w-10 text-blue-600" />

              <p className="mt-3 text-sm font-bold text-slate-800">
                Click to upload more product images
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Existing images stay unless you remove them.
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

            {(existingImages.length > 0 || imagePreviews.length > 0) && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {existingImages.map((src, index) => (
                  <ImageCard
                    key={`existing-${index}`}
                    src={src}
                    label="Current"
                    onRemove={() => removeExistingImage(index)}
                  />
                ))}

                {imagePreviews.map((src, index) => (
                  <ImageCard
                    key={`new-${index}`}
                    src={src}
                    label="New"
                    onRemove={() => removeNewImage(index)}
                  />
                ))}
              </div>
            )}
          </Fieldset>

          <Fieldset className="w-full space-y-5">
            <legend className="mb-2 border-b border-slate-100 pb-3 text-lg font-bold text-slate-900">
              Description
            </legend>

            <TextField isInvalid={!!errors.description}>
              <Label className="text-sm font-semibold text-slate-700">
                Product Description
              </Label>

              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Product description..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-blue-500"
              />

              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </TextField>
          </Fieldset>

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <Button
              type="button"
              onClick={() => router.push("/dashboard/seller/products")}
              className="h-12 rounded-xl border border-slate-200 bg-white px-6 font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              isDisabled={isUploading}
              className="h-12 rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-lg shadow-blue-100 hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              {isUploading ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

function ImageCard({ src, label, onRemove }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
      <img
        src={src}
        alt={label}
        className="h-32 w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />

      <button
        type="button"
        onClick={onRemove}
        className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white shadow-lg transition hover:bg-red-700"
      >
        <X className="h-4 w-4" />
      </button>

      <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-slate-700 shadow-sm">
        {label}
      </span>
    </div>
  );
}