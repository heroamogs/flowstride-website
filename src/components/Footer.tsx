import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Dynamically pulls 2026

  return (
    <footer className="bg-black border-t border-gray-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Flex Container */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 xl:gap-16">
          {/* 1. Brand Column */}
          <div className="w-full lg:w-1/4 flex flex-col gap-6">
            <div className="flex items-center gap-3 cursor-pointer">
              <Image
                src="/logo.png"
                alt="Flowstride Icon"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-lg font-bold tracking-widest text-white mt-1">
                FLOWSTRIDE
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The next-gen testing framework for modern teams.
            </p>
          </div>

          {/* 2. Links Grid (4 Columns) */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Product */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm">Product</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Features
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Pricing
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Changelog
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Roadmap
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm">Resources</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-400">
                <li>
                  <a
                    href="https://docs.flowstride.io/guide/getting-started.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors cursor-pointer block"
                  >
                    Documentation
                  </a>
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Blog
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Examples
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Videos
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm">Community</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-400">
                <li>
                  <a
                    href="https://github.com/heroamogs/flowstride-os"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    GitHub
                  </a>
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Discord
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Twitter
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Contribute
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm">Company</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">
                  About
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Contact
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Privacy
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Terms
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Newsletter Column */}
          <div className="w-full lg:w-1/4 flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm">Stay updated</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Get the latest updates and announcements.
            </p>
            <div className="mt-2 flex items-center bg-[#0A0A0A] border border-gray-800 rounded-lg overflow-hidden focus-within:border-gray-600 transition-colors">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-sm text-white px-4 py-3 w-full focus:outline-none placeholder-gray-600"
              />
              <button className="bg-primary hover:bg-primary/90 p-3 px-5 transition-colors cursor-pointer flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
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
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-20 pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Flowstride. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
