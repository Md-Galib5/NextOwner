import HeroBanner from "@/components/HeroBanner";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { getFeaturedProducts } from "@/lib/api/products";


export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <div>
      <HeroBanner />

      <FeaturedProducts products={products} />
    </div>
  );
}