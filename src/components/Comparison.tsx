import Image from "next/image";

export default function Comparison() {
  return (
    // We are adding id="features" here so the Navbar link we built earlier will scroll right to it!
    <section
      id="features"
      className="bg-black py-20 md:py-32 border-b border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative w-full flex items-center justify-center">
          <Image
            src="/code-comparison.png"
            alt="Traditional Automation vs Flowstride Code Comparison"
            width={1200}
            height={800}
            className="w-full h-auto drop-shadow-2xl"
            quality={100} // Ensures the text in the image stays perfectly sharp
          />
        </div>
      </div>
    </section>
  );
}
