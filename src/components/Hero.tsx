"use client";

import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npm install -g flowstride");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section className="relative pt-24 pb-32 overflow-hidden bg-black text-white border-b border-gray-800">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Column: Copy & CTAs */}
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary tracking-wide uppercase">
            Next-Gen QA Automation
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            Uncompromising power.
            <br />
            <span className="text-primary">Human-readable simplicity.</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-lg">
            The next-gen testing framework that lets your team automate in
            minutes, not hours.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.npmjs.com/package/flowstride"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary-light transition-colors text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center gap-2"
            >
              Get Started <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              href="https://docs.flowstride.io/guide/getting-started.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border border-gray-700 hover:bg-gray-900 transition-colors text-white px-6 py-3 rounded-md font-semibold inline-block text-center"
            >
              View Documentation
            </a>
          </div>

          {/* Install Command */}
          <div className="flex flex-col gap-4 max-w-md">
            <div className="flex items-center justify-between bg-gray-950 border border-gray-800 rounded-md p-3">
              <code className="text-sm text-gray-300 font-mono">
                npm install -g flowstride
              </code>
              <button
                onClick={handleCopy}
                className={`text-xs px-3 py-1.5 rounded transition-colors flex items-center gap-2 border ${
                  isCopied
                    ? "bg-primary/20 text-primary border-transparent hover:bg-primary hover:text-white"
                    : "bg-transparent text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {isCopied ? (
                  <>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Mini Features */}
            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-700"></span>{" "}
                AI-Powered
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-700"></span>{" "}
                WAF-Proof
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-700"></span>{" "}
                Unified
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-700"></span> Open
                Source (MIT)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Fidelity Image */}
        <div className="relative w-full aspect-square md:aspect-auto md:h-[700px] lg:scale-[1.15] xl:scale-125 origin-right flex items-center justify-center [mask-image:linear-gradient(to_right,transparent_0%,black_15%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_15%)]">
          <Image
            src="/hero-image.png"
            alt="Flowstride QA Automation Dashboard and Code Editor"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
