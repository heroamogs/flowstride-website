import { cloudPricingOrigin, loadPricingCatalog } from "@/lib/pricingCatalog";

export async function GET() {
  const catalog = await loadPricingCatalog(cloudPricingOrigin());
  return Response.json(catalog ?? { error: "Prices are temporarily unavailable." }, {
    status: catalog ? 200 : 503,
    headers: { "Cache-Control": "no-store" },
  });
}
