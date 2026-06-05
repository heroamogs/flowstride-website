import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo and Text Link */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Logo container with white background */}
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-sm transform group-hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="Flowstride Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <span className="text-white font-bold tracking-wide text-lg">
            FLOWSTRIDE
          </span>
        </Link>

        {/* Middle: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#docs" className="hover:text-white transition-colors">
            Docs
          </Link>
          <Link href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="#blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <Link
            href="#changelog"
            className="hover:text-white transition-colors"
          >
            Changelog
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-5">
          {/* Stars */}
          {/* <div className="flex items-center gap-1.5 text-sm font-medium text-gray-300">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              ></path>
            </svg>
            <span>1.2k</span>
          </div> */}

          {/* GitHub Button */}
          <a
            href="https://github.com/heroamogs/flowstride-os"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-900 border border-gray-700 hover:border-gray-500 transition-all px-3 py-1.5 rounded-md"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
            </svg>
            GitHub
          </a>

          {/* Primary CTA */}
          <Link
            href="/get-started"
            className="bg-primary hover:bg-primary-light transition-colors text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1"
          >
            Get Started <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
