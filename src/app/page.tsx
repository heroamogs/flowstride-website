import Hero from "@/components/Hero";
import ReleasePreview from "@/components/ReleasePreview";
import Features from "@/components/Features";
import UnifiedTesting from "@/components/UnifiedTesting";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ReleasePreview />
      <Features />
      <UnifiedTesting />
      <CallToAction />
      <Footer />
    </main>
  );
}
