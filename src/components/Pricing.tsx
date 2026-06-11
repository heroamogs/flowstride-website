"use client";

import { useState } from "react";

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-indigo-400 flex-shrink-0 mr-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      className="py-24 bg-[#0B0A0F] text-white relative overflow-hidden"
      id="pricing"
    >
      {/* Background Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-3">
            Pricing
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Uncompromising power.
            <br />
            Priced for everyone.
          </h3>
          <p className="text-gray-400 text-lg">
            Start automating in minutes. Upgrade when your team needs more
            scale.
          </p>

          {/* Billing Toggle */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span
              className={`text-sm ${!isAnnual ? "text-white font-medium" : "text-gray-400"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-7 w-14 items-center rounded-full bg-slate-800 border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0B0A0F]"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-indigo-500 transition-transform duration-200 ease-in-out ${
                  isAnnual ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm flex items-center gap-2 ${isAnnual ? "text-white font-medium" : "text-gray-400"}`}
            >
              Special Offer
              <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                18 Months!
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {/* 1. Personal (Free) */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors flex flex-col">
            <h4 className="text-xl font-semibold text-white mb-2">Personal</h4>
            <p className="text-gray-400 text-sm mb-6">
              For individuals and small teams exploring Flowstride.
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-gray-500 ml-2">/ month</span>
            </div>
            <a
              href="http://localhost:3000/register?plan=personal"
              className="w-full block text-center py-3 px-4 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors mb-8 border border-slate-700"
            >
              Get Started Free
            </a>
            <div className="flex-1">
              <p className="text-sm font-medium text-white mb-4">Includes:</p>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center">
                  <CheckIcon /> Up to 70 Users
                </li>
                <li className="flex items-center">
                  <CheckIcon /> 1,000 test runs / month
                </li>
                <li className="flex items-center">
                  <CheckIcon /> 100 Email OTP Automations
                </li>
                <li className="flex items-center">
                  <CheckIcon /> Standard Support
                </li>
                <li className="flex items-center">
                  <CheckIcon /> Local Execution
                </li>
                <li className="flex items-center">
                  <CheckIcon /> CLI Integration to Cloud
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Team */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors flex flex-col">
            <h4 className="text-xl font-semibold text-white mb-2">Team</h4>
            <p className="text-gray-400 text-sm mb-6">
              For growing teams optimizing their QA velocity.
            </p>
            <div className="mb-2">
              <span className="text-4xl font-bold text-white">
                {isAnnual ? "$600" : "$50"}
              </span>
              <span className="text-gray-500 ml-2">
                {isAnnual ? "/ 18 months" : "/ month"}
              </span>
            </div>
            {isAnnual && (
              <p className="text-emerald-400 text-sm mb-4 font-medium">
                Save $300 upfront
              </p>
            )}
            {!isAnnual && <div className="h-[20px] mb-4" />}{" "}
            {/* Spacer for alignment */}
            <a
              href="http://localhost:3000/register?plan=team"
              className="w-full block text-center py-3 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors mb-8 shadow-lg shadow-indigo-500/25"
            >
              Start Team Plan
            </a>
            <div className="flex-1">
              <p className="text-sm font-medium text-white mb-4">
                Everything in Personal, plus:
              </p>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center">
                  <CheckIcon /> 20,000 test runs / month
                </li>
                <li className="flex items-center">
                  <CheckIcon /> AI Auto-Healing Engine
                </li>
                <li className="flex items-center">
                  <CheckIcon /> Unlimited Email OTPs
                </li>
                <li className="flex items-center">
                  <CheckIcon /> Cloud Execution
                </li>
                <li className="flex items-center">
                  <CheckIcon /> Parallel Execution
                </li>
                <li className="flex items-center">
                  <CheckIcon /> Slack Integration
                </li>
                <li className="flex items-center">
                  <CheckIcon /> Jira Integration
                </li>
                <li className="flex items-center">
                  <CheckIcon /> Priority Support
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Business */}
          <div className="bg-indigo-900/10 border-2 border-indigo-500 rounded-2xl p-8 relative shadow-[0_0_40px_rgba(99,102,241,0.15)] flex flex-col transform md:-translate-y-2">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg">
              BEST VALUE
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Business</h4>
            <p className="text-gray-400 text-sm mb-6">
              For organizations executing testing at scale.
            </p>
            <div className="mb-2">
              <span className="text-4xl font-bold text-white">
                {isAnnual ? "$3,000" : "$250"}
              </span>
              <span className="text-gray-500 ml-2">
                {isAnnual ? "/ 18 months" : "/ month"}
              </span>
            </div>
            {isAnnual && (
              <p className="text-emerald-400 text-sm mb-4 font-medium">
                Save $1,500 upfront
              </p>
            )}
            {!isAnnual && <div className="h-[20px] mb-4" />}{" "}
            {/* Spacer for alignment */}
            <a
              href="http://localhost:3000/register?plan=business"
              className="w-full block text-center py-3 px-4 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors mb-8 border border-slate-700"
            >
              Start Business Plan
            </a>
            <div className="flex-1">
              <p className="text-sm font-medium text-white mb-4">
                Everything in Team, plus:
              </p>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center">
                  <CheckIcon /> Up to 100 Users
                </li>
                <li className="flex items-center">
                  <CheckIcon /> Unlimited test runs / month
                </li>
                <li className="flex items-center">
                  <CheckIcon /> Dedicated Cloud Infrastructure
                </li>
                <li className="flex items-center">
                  <CheckIcon /> Static IP Whitelisting
                </li>
              </ul>
            </div>
          </div>

          {/* 4. Enterprise */}
          <div className="bg-[#0B0A0F] border border-slate-800 rounded-2xl p-8 flex flex-col relative overflow-hidden">
            {/* Dark overlay to indicate "coming soon" state */}
            <div className="absolute inset-0 bg-slate-950/40 z-0 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col h-full">
              <h4 className="text-xl font-semibold text-white mb-2 flex items-center justify-between">
                Enterprise
                <span className="text-[10px] uppercase tracking-wider bg-slate-800 text-slate-300 px-2 py-1 rounded">
                  Coming Soon
                </span>
              </h4>
              <p className="text-gray-400 text-sm mb-6">
                Custom deployment, security, and dedicated support.
              </p>
              <div className="mb-6 mt-auto">
                <span className="text-3xl font-bold text-white">Custom</span>
              </div>
              <button
                disabled
                className="w-full py-3 px-4 rounded-lg bg-slate-800/50 text-slate-400 font-medium cursor-not-allowed mb-8 border border-slate-800"
              >
                Join Waitlist
              </button>
              <div className="flex-1">
                <p className="text-sm font-medium text-white mb-4">
                  Planned Features:
                </p>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-center">
                    <CheckIcon /> SSO / SAML Authentication
                  </li>
                  <li className="flex items-center">
                    <CheckIcon /> Custom Invoicing & Contracts
                  </li>
                  <li className="flex items-center">
                    <CheckIcon /> Dedicated Account Manager
                  </li>
                  <li className="flex items-center">
                    <CheckIcon /> On-Premise Deployment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
