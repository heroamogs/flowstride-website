import Image from "next/image";

export default function CallToAction() {
  return (
    <section className="bg-black py-24 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: "Built for modern engineering teams." */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Built for modern engineering teams.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-800">
            {/* Feature 1 */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 md:px-6 first:px-0">
              <div className="w-12 h-12 rounded-full border border-gray-700 flex flex-shrink-0 items-center justify-center bg-[#0A0A0A]">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">
                  Open Source
                </h4>
                <p className="text-gray-500 text-xs mt-1">MIT Licensed</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 md:px-6">
              <div className="w-12 h-12 rounded-full border border-gray-700 flex flex-shrink-0 items-center justify-center bg-[#0A0A0A]">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">
                  Developer First
                </h4>
                <p className="text-gray-500 text-xs mt-1">
                  Built by developers, for developers.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 md:px-6">
              <div className="w-12 h-12 rounded-full border border-gray-700 flex flex-shrink-0 items-center justify-center bg-[#0A0A0A]">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">
                  Active Community
                </h4>
                <p className="text-gray-500 text-xs mt-1">
                  Join our community and shape the future.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 md:px-6">
              <div className="w-12 h-12 rounded-full border border-gray-700 flex flex-shrink-0 items-center justify-center bg-[#0A0A0A]">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">
                  Secure & Reliable
                </h4>
                <p className="text-gray-500 text-xs mt-1">
                  Enterprise-ready and privacy focused.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: The Deep Purple CTA Card */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#2E0B5B] to-[#0B0118] border border-primary/20 p-8 md:p-12 shadow-[0_0_50px_-12px_rgba(139,92,246,0.25)]">
          {/* Subtle Abstract Background Pattern (Simulating the dots in your design) */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          ></div>

          <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-10">
            {/* Left Side: Logo & Text */}
            <div className="flex flex-col md:flex-row items-center md:items-start xl:items-center text-center md:text-left gap-8">
              {/* Logo Box */}
              <div className="w-24 h-24 rounded-2xl bg-black border border-gray-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/50 overflow-hidden relative">
                <Image
                  src="/logo.png"
                  alt="Flowstride Logo"
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Stop writing tests nobody can read.
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  Build faster. Debug smarter. Automate confidently with
                  Flowstride.
                </p>
              </div>
            </div>

            {/* Right Side: Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
              <button className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer">
                Get Started
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
              <button className="w-full sm:w-auto px-8 py-3 bg-[#111] hover:bg-[#222] border border-gray-700 text-white rounded-lg font-medium transition-colors cursor-pointer">
                View Docs
              </button>
              <button className="w-full sm:w-auto px-8 py-3 bg-[#111] hover:bg-[#222] border border-gray-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
