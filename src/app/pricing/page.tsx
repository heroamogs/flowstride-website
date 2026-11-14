import { headers } from "next/headers";
import Pricing, { type PricingCatalog } from "@/components/Pricing";

export const metadata = {
  title: "Pricing | Flowstride Cloud",
  description: "Compare Flowstride Cloud plans and see monthly and yearly workspace pricing.",
};

const productionOrigin = "https://cloud.flowstride.io";

async function loadCatalog(origin: string): Promise<PricingCatalog | null> {
  try {
    const response = await fetch(new URL("/api/billing/catalog", origin), {
      cache: "no-store", redirect: "error", signal: AbortSignal.timeout(3000),
    });
    if (response.ok) return await response.json();
  } catch {
    // Keep the pricing page reachable when Cloud's catalog is unavailable.
  }
  return null;
}

export default async function PricingRoute() {
  const origin = process.env.FLOWSTRIDE_CLOUD_ORIGIN || productionOrigin;
  const [requestHeaders, catalog] = await Promise.all([headers(), loadCatalog(origin)]);
  const country = requestHeaders.get("x-vercel-ip-country");
  const defaultCurrency = catalog?.markets.find(market => country && market.country === country)?.currency ?? "USD";
  return (
    <div className="pt-20 pb-12 bg-[#0B0A0F] min-h-screen">
      <Pricing cloudOrigin={origin} catalog={catalog} defaultCurrency={defaultCurrency} />
    </div>
  );
}
