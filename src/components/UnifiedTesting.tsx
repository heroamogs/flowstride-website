"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function UnifiedTesting() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    {
      title: "Real-Time Execution",
      description:
        "Watch your semantic flows execute in a live browser environment. See exactly what your test sees, step-by-step, as it happens in real time.",
      image: "/dashboard.png",
    },
    {
      title: "Full Network Visibility",
      description:
        "Inspect REST, GraphQL, and WebSocket traffic directly alongside your UI execution. Never guess if a failure was a frontend bug or a backend timeout again.",
      image: "/dashboard-with-logs.png",
    },
    {
      title: "Native API Debugger",
      description:
        "Dive deep into your API state. Inspect request headers, payloads, and responses in a dedicated playground without ever switching tools.",
      image: "/logsview-on-api-playground.png",
    },
    {
      title: "Executive-Ready Reports",
      description:
        "Generate clean, high-level execution summaries. Share multi-flow analysis that engineers, QA, and product managers can instantly read and trust.",
      image: "/flowstride-reports.png",
    },
    {
      title: "Granular Step Diagnostics",
      description:
        "Stop hunting for the root cause. Instantly view the visual state, network activity, and exact requirement proof at the precise millisecond a test fails.",
      image: "/report-with-step-diagnostics.png",
    },
    {
      title: "Time-Travel Debugging",
      description:
        "Click any step in your execution log to instantly rewind the browser. Inspect the historical visual and DOM state to see exactly what led to a failure.",
      image: "/viewing-historical-state.png",
    },
    {
      title: "Human-Readable Errors",
      description:
        "Ditch cryptic stack traces. When an assertion fails, Flowstride tells you exactly what went wrong in plain, actionable English.",
      image: "/logsview-with-readable-error.png",
    },
    {
      title: "Automated Compliance Docs",
      description:
        "Transform your test runs into formal test case documentation automatically. Map expected results to actual outcomes and export to PDF for instant auditing.",
      image: "/test-case-log.png",
    },
  ];

  // This observer detects which text block is currently in the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (ref) => ref === entry.target,
            );
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Triggers exactly at the vertical center of the viewport
      },
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-black text-white py-20 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            One unified testing experience.
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            From live execution to executive reports, everything you need is in
            one place. No more switching between fragmented tools.
          </p>
        </div>

        {/* ------------------------------------------------- */}
        {/* DESKTOP LAYOUT (Sticky Scroll)                    */}
        {/* ------------------------------------------------- */}
        <div className="hidden lg:flex relative items-start">
          {/* Left Column: Scrolling Text (Strict 45% width with padding to protect text) */}
          <div className="w-[45%] pr-12 pb-[30vh]">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className={`mb-[30vh] transition-all duration-700 ${
                  activeIndex === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-20 -translate-x-4"
                }`}
              >
                <div className="text-primary font-mono text-sm font-bold mb-3 tracking-widest">
                  0{index + 1}
                </div>
                <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                <p className="text-xl text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Image (Strict 55% width) */}
          <div className="w-[55%] sticky top-32">
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-gray-800 bg-[#0A0A0A] shadow-2xl">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

              {features.map((feature, index) => (
                <Image
                  key={index}
                  src={feature.image}
                  alt={feature.title}
                  fill
                  quality={100}
                  className={`object-contain transition-opacity duration-700 ease-in-out ${
                    activeIndex === index
                      ? "opacity-100 z-10 relative"
                      : "opacity-0 z-0 absolute"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------- */}
        {/* MOBILE LAYOUT (Stacked)                           */}
        {/* ------------------------------------------------- */}
        <div className="lg:hidden flex flex-col gap-24">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col gap-6">
              <div>
                <div className="text-primary font-mono text-sm font-bold mb-2 tracking-widest">
                  0{index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-gray-800 bg-[#0A0A0A]">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
