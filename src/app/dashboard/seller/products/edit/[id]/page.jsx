import { getProductById } from "@/lib/actions/products";
import EditProductForm from "./EditProductForm";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  return <EditProductForm product={product} />;
}