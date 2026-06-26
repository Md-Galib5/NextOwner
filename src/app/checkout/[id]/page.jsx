import PaymentClient from "./PaymentClient";

const getProductById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    { cache: "no-store" }
  );

  return res.json();
};

export default async function CheckoutPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  return <PaymentClient product={product} />;
}