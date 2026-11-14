"use client";

import { useState } from "react";

type Currency = "USD" | "NGN" | "GHS" | "KES";
type Cycle = "monthly" | "annual";
type Plan = "personal" | "team" | "business" | "enterprise";

export type PricingCatalog = {
  offers: {
    id: `${"team" | "business"}-${Cycle}`;
    currency: Currency;
    amountMinor: number;
  }[];
  markets: { currency: Currency; country: string | null; label: string }[];
  testCheckout: boolean;
  checkoutMode?: "test" | "live" | "off";
};

const plans: {
  id: Plan;
  name: string;
  description: string;
  features: string[];
}[] = [
  {
    id: "personal",
    name: "Personal",
    description:
      "For individuals and small workspaces getting started with Cloud.",
    features: [
      "Up to 3 seats",
      "Up to 3 parallel workers",
      "14-day test log retention",
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "For QA teams running more tests and sharing results.",
    features: [
      "Up to 15 seats",
      "Up to 5 parallel workers",
      "30-day test log retention",
    ],
  },
  {
    id: "business",
    name: "Business",
    description:
      "For larger teams that need more seats and longer evidence retention.",
    features: [
      "Up to 70 seats",
      "Failed-run videos kept for 30 days",
      "180-day test log retention",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom deployment, security and support.",
    features: [],
  },
];

const plannedAllowances = {
  personal: ["1,000 runs reported to Cloud", "200 FlowMail OTP requests"],
  team: ["20,000 runs reported to Cloud", "10,000 FlowMail OTP requests"],
  business: ["100,000 runs reported to Cloud", "50,000 FlowMail OTP requests"],
};

function formatPrice(amountMinor: number, currency: Currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
  }).format(amountMinor / 100);
}

const CheckIcon = () => (
  <svg
    aria-hidden="true"
    className="mr-3 h-5 w-5 shrink-0 text-indigo-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function Pricing({
  cloudOrigin,
  catalog,
  defaultCurrency,
}: {
  cloudOrigin: string;
  catalog: PricingCatalog | null;
  defaultCurrency: Currency;
}) {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const [currency, setCurrency] = useState(defaultCurrency);
  const yearly = cycle === "annual";
  const checkoutMode = catalog?.checkoutMode ?? (catalog?.testCheckout ? "test" : "off");

  return (
    <section
      className="relative overflow-hidden bg-[#0B0A0F] py-24 text-white"
      id="pricing"
    >
      <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            Flowstride Cloud pricing
          </h1>
          <p className="text-lg text-gray-400">
            Start free and upgrade when your workspace needs more capacity.
          </p>
          {catalog && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div
                role="group"
                aria-label="Billing term"
                className="inline-flex rounded-lg border border-slate-700 bg-slate-900 p-1"
              >
                {(["monthly", "annual"] as const).map((option) => (
                  <button
                    type="button"
                    key={option}
                    aria-pressed={cycle === option}
                    onClick={() => setCycle(option)}
                    className={`rounded-md px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-indigo-300 ${cycle === option ? "bg-indigo-600 text-white" : "text-slate-300 hover:text-white"}`}
                  >
                    {option === "annual" ? "Yearly" : "Monthly"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <label htmlFor="pricing-currency">Currency</label>
                <select
                  id="pricing-currency"
                  value={currency}
                  onChange={(event) =>
                    setCurrency(event.target.value as Currency)
                  }
                  className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-white focus-visible:outline-2 focus-visible:outline-indigo-300"
                >
                  {catalog.markets.map((market) => (
                    <option value={market.currency} key={market.currency}>
                      {market.currency} · {market.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:gap-8">
          {plans.map(({ id, name, description, features }) => {
            const paid = id === "team" || id === "business";
            const price = catalog?.offers.find(
              (offer) =>
                offer.id === `${id}-${cycle}` && offer.currency === currency,
            );
            const monthly = catalog?.offers.find(
              (offer) =>
                offer.id === `${id}-monthly` && offer.currency === currency,
            );
            const savings =
              yearly && price && monthly
                ? monthly.amountMinor * 12 - price.amountMinor
                : 0;
            const amount =
              id === "personal"
                ? formatPrice(0, currency)
                : id === "enterprise"
                  ? "Custom"
                  : price
                    ? formatPrice(price.amountMinor, currency)
                    : "Pricing unavailable";
            const checkout = new URL("/billing/checkout", cloudOrigin);
            checkout.search = new URLSearchParams({
              plan: id,
              billing: cycle,
              currency,
            }).toString();
            const button =
              "mb-6 block w-full rounded-lg px-4 py-3 text-center text-sm font-medium focus-visible:outline-2 focus-visible:outline-indigo-300";

            return (
              <article
                key={id}
                aria-label={name}
                className={`flex flex-col rounded-2xl border p-6 xl:p-8 ${id === "business" ? "border-indigo-500 bg-indigo-900/10" : "border-slate-800 bg-slate-900/50"}`}
              >
                <h2 className="mb-2 text-xl font-semibold">{name}</h2>
                <p className="mb-6 text-sm leading-relaxed text-gray-400">
                  {description}
                </p>
                <div className="mt-auto mb-4">
                  <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span
                      className={
                        paid && !price
                          ? "text-xl font-bold"
                          : "text-3xl font-bold"
                      }
                    >
                      {amount}
                    </span>
                    {(id === "personal" || price) && (
                      <span className="text-sm text-gray-400">
                        / {paid && yearly ? "year" : "month"}
                      </span>
                    )}
                  </p>
                  {savings > 0 && (
                    <p className="mt-2 text-sm text-emerald-400">
                      Save {formatPrice(savings, currency)}/year on annual plan
                    </p>
                  )}
                </div>
                {id === "personal" && (
                  <a
                    href={new URL("/register", cloudOrigin).href}
                    className={`${button} bg-slate-800 hover:bg-slate-700`}
                  >
                    Get started free
                  </a>
                )}
                {paid &&
                  (price && (checkoutMode === "test" || checkoutMode === "live") ? (
                    <a
                      href={checkout.href}
                      className={`${button} bg-indigo-600 hover:bg-indigo-500`}
                    >
                      {checkoutMode === "test" ? `Test ${name} checkout` : `Start ${name} Plan`}
                    </a>
                  ) : (
                    <p className={`${button} bg-slate-900 text-slate-400`}>
                      Checkout paused
                    </p>
                  ))}
                {id === "enterprise" && (
                  <p className={`${button} bg-slate-900 text-slate-400`}>
                    Coming soon
                  </p>
                )}
                {features.length > 0 && (
                  <ul className="space-y-3 text-sm text-gray-300">
                    {features.map((feature) => (
                      <li className="flex items-center" key={feature}>
                        <CheckIcon />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                {id !== "enterprise" && catalog?.testCheckout && (
                  <div className="mt-5 border-t border-slate-700 pt-4 text-sm leading-relaxed text-slate-400">
                    <p className="mb-1 font-medium text-slate-300">
                      Planned allowances per 30 days
                    </p>
                    <ul>
                      {plannedAllowances[id].map((allowance) => (
                        <li key={allowance}>{allowance}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
