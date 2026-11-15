import { headers } from "next/headers";
import Pricing from "@/components/Pricing";
import { cloudPricingOrigin, loadPricingCatalog } from "@/lib/pricingCatalog";

export const metadata = {
  title: "Pricing | Flowstride Cloud",
  description: "Compare Flowstride Cloud plans and see monthly and yearly workspace pricing.",
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
