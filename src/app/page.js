import HeroBanner from "@/components/HeroBanner";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PopularCategories from "@/components/home/PopularCategories";
import SuccessStories from "@/components/home/SuccessStories";
import MarketplaceStatistics from "@/components/home/MarketplaceStatistics";
import SustainabilityImpact from "@/components/home/SustainabilityImpact";
import TrustedSellersShowcase from "@/components/home/TrustedSellersShowcase";

import {
  getFeaturedProducts,
  getPopularCategories,
  getMarketplaceStats,
} from "@/lib/api/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getFeaturedProducts();
  const categories = await getPopularCategories();
  const stats = await getMarketplaceStats();

  return (
    <div>
      <HeroBanner />

      <FeaturedProducts products={products} />

      <PopularCategories categories={categories} />

      <MarketplaceStatistics stats={stats} />

      <TrustedSellersShowcase />

      <SustainabilityImpact />

      <SuccessStories />
    </div>
  );
}