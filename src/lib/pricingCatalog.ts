export type PricingCurrency = "USD" | "NGN" | "GHS" | "KES";
export type PricingCycle = "monthly" | "annual";

export type PricingCatalog = {
  offers: {
    id: `${"team" | "business"}-${PricingCycle}`;
    currency: PricingCurrency;
    amountMinor: number;
  }[];
  markets: { currency: PricingCurrency; country: string | null; label: string }[];
  testCheckout: boolean;
  checkoutMode?: "test" | "live" | "off";
};

export function cloudPricingOrigin() {
  return process.env.FLOWSTRIDE_CLOUD_ORIGIN || "https://cloud.flowstride.io";
}

export async function loadPricingCatalog(origin: string): Promise<PricingCatalog | null> {
  try {
    const response = await fetch(new URL("/api/billing/catalog", origin), {
      cache: "no-store", redirect: "error", signal: AbortSignal.timeout(3000),
    });
    if (response.ok) return await response.json();
  } catch {
    // Keep pricing reachable when Cloud's catalog is temporarily unavailable.
  }
  return null;
}
