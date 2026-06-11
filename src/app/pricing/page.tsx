import Pricing from "@/components/Pricing";

export const metadata = {
  title: "Pricing | Flowstride Cloud",
  description: "Uncompromising test infrastructure. Priced for everyone.",
};

export default function PricingRoute() {
  return (
    <div className="pt-20 pb-12 bg-[#0B0A0F] min-h-screen">
      {/* pt-20 ensures it doesn't hide behind your global fixed Navbar */}
      <Pricing />
    </div>
  );
}
