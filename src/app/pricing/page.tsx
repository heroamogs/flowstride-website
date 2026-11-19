import { headers } from "next/headers";
import Pricing from "@/components/Pricing";
import { cloudPricingOrigin, loadPricingCatalog } from "@/lib/pricingCatalog";

export const metadata = {
  title: "Pricing | Flowstride Pro",
  description: "Compare Personal, Team, and Business workspace plans for Flowstride Pro. See monthly and yearly pricing and manage billing in Flowstride Cloud.",
};

export default async function PricingRoute() {
  const origin = cloudPricingOrigin();
  const [requestHeaders, catalog] = await Promise.all([headers(), loadPricingCatalog(origin)]);
  const country = requestHeaders.get("x-vercel-ip-country");
  const defaultCurrency = catalog?.markets.find(market => country && market.country === country)?.currency ?? "USD";
  return (
    <div className="pt-20 pb-12 bg-[#0B0A0F] min-h-screen">
      <Pricing cloudOrigin={origin} catalog={catalog} defaultCurrency={defaultCurrency} />
    </div>
  );
}
