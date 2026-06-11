import Hero from "@/components/Hero";
import Comparison from "@/components/Comparison";
import Features from "@/components/Features";
import UnifiedTesting from "@/components/UnifiedTesting";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <main>
      <Hero />
      <Comparison />
      <Features />
      <UnifiedTesting />
      <Pricing />
      <CallToAction />
      <Footer />
    </main>
  );
}
