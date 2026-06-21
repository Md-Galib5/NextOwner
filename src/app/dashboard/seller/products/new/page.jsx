"use client";

import React, { useRef, useState } from "react";
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
} from "lucide-react";
import { addproducts } from "@/lib/actions/products";
import { toast } from "react-toastify";

export default function AddProductPage() {
  const { data: session, isPending } = useSession();

  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [imageUrls, setImageUrls] = useState([""]);

  if (isPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  const user = session?.user;

  const addImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const updateImageUrl = (index, value) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  };

  const removeImageField = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

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

    const cleanImages = imageUrls.filter((url) => url.trim() !== "");

    if (cleanImages.length === 0) {
      newErrors.images = "At least one product image URL is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const productPayload = {
      title: data.title,
      category: data.category,
      condition: data.condition,
      price: Number(data.price),
      stock: Number(data.stock),
      images: cleanImages,
      description: data.description,
      sellerInfo: {
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone || "",
      },
      status: "available",
      createdAt: new Date(),
    };

    try {
      const res = await addproducts(productPayload);

      if (res.insertedId) {
        toast.success("Products added successfully");

        form.reset();
        formRef.current?.reset();
        setImageUrls([""]);
        setErrors({});
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
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
              Create a trusted second-hand product listing for NextOwner.
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
              <TextField name="title" isInvalid={!!errors.title} className="flex w-full flex-col gap-1">
                <Label className="text-sm font-semibold text-slate-700">
                  Product Title
                </Label>
                <Input
                  name="title"
                  placeholder="e.g. Used Dell Inspiron 15 Laptop"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                />
                {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
              </TextField>

              <Select name="category" isInvalid={!!errors.category}>
                <Label className="mb-1 block text-sm font-semibold text-slate-700">
                  Category
                </Label>

                <Select.Trigger className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition data-[focused=true]:border-blue-500">
                  <Select.Value placeholder="Select category" />
                  <Select.Indicator />
                </Select.Trigger>

                {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}

                <Select.Popover className="rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
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
                      <ListBox.Item
                        key={item}
                        id={item}
                        textValue={item}
                        className="cursor-pointer rounded-lg p-2 text-sm hover:bg-blue-50"
                      >
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

                <Select.Trigger className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition data-[focused=true]:border-blue-500">
                  <Select.Value placeholder="Select condition" />
                  <Select.Indicator />
                </Select.Trigger>

                {errors.condition && <p className="mt-1 text-xs text-red-500">{errors.condition}</p>}

                <Select.Popover className="rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                  <ListBox>
                    {["Like New", "Excellent", "Good", "Fair", "Refurbished"].map((item) => (
                      <ListBox.Item
                        key={item}
                        id={item}
                        textValue={item}
                        className="cursor-pointer rounded-lg p-2 text-sm hover:bg-blue-50"
                      >
                        {item}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              <div className="grid grid-cols-2 gap-4">
                <TextField name="price" isInvalid={!!errors.price} className="flex w-full flex-col gap-1">
                  <Label className="text-sm font-semibold text-slate-700">Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      name="price"
                      type="number"
                      placeholder="35000"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pl-9 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
                </TextField>

                <TextField name="stock" isInvalid={!!errors.stock} className="flex w-full flex-col gap-1">
                  <Label className="text-sm font-semibold text-slate-700">Stock</Label>
                  <div className="relative">
                    <Boxes className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      name="stock"
                      type="number"
                      placeholder="1"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pl-9 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  {errors.stock && <p className="text-xs text-red-500">{errors.stock}</p>}
                </TextField>
              </div>
            </div>
          </Fieldset>

          <Fieldset className="w-full space-y-5">
            <legend className="mb-2 w-full border-b border-slate-100 pb-3 text-lg font-bold text-slate-900">
              Product Images
            </legend>

            <div className="space-y-3">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex gap-3">
                  <div className="relative flex-1">
                    <ImagePlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="url"
                      value={url}
                      onChange={(e) => updateImageUrl(index, e.target.value)}
                      placeholder="https://example.com/images/product.jpg"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pl-9 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  {imageUrls.length > 1 && (
                    <Button
                      type="button"
                      variant="bordered"
                      className="h-12 rounded-xl border-red-200 text-red-600"
                      onClick={() => removeImageField(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}

              {errors.images && <p className="text-xs text-red-500">{errors.images}</p>}

              <Button
                type="button"
                variant="bordered"
                className="rounded-xl border-blue-200 text-blue-600"
                onClick={addImageField}
              >
                Add Another Image
              </Button>
            </div>
          </Fieldset>

          <Fieldset className="w-full space-y-5">
            <legend className="mb-2 w-full border-b border-slate-100 pb-3 text-lg font-bold text-slate-900">
              Description
            </legend>

            <TextField name="description" isInvalid={!!errors.description} className="flex w-full flex-col gap-1">
              <Label className="text-sm font-semibold text-slate-700">
                Product Description
              </Label>

              <TextArea
                name="description"
                rows={5}
                placeholder="Dell Inspiron 15, Core i5 10th Gen, 8GB RAM, 512GB SSD. Used for 2 years."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />

              {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
            </TextField>
          </Fieldset>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <Button type="button" variant="bordered" className="h-12 rounded-xl border-slate-200 px-6 font-semibold text-slate-600">
              Cancel
            </Button>

            <Button type="submit" className="h-12 rounded-xl bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700">
              Publish Product
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}