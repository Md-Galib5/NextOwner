import HeroBanner from "@/components/HeroBanner";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PopularCategories from "@/components/home/PopularCategories";
import SuccessStories from "@/components/home/SuccessStories";
import {
  getFeaturedProducts,
  getPopularCategories,
} from "@/lib/api/products";


export default async function HomePage() {
  const products = await getFeaturedProducts();
  const categories = await getPopularCategories();


  return (
    <div>
      <HeroBanner />

      <FeaturedProducts products={products} />
      <PopularCategories categories={categories} />
      <SuccessStories />
    </div>
  );
}

