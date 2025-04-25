'use client';
import React from 'react';
import {
  Globe,
  Repeat,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

export default function UzabulkIntroduction() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-12 px-4 sm:px-6 lg:px-8 text-white"
      style={{
        backgroundImage: `url('/truck.jpg')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#213348] opacity-90 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main Title */}
        <div className="mb-12 text-left font-[Monospace]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-[#FBAF43]">
            UZA BULK
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium mb-4 text-[#FBAF43]">
            Your Global Sourcing Partner
          </p>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl">
            A B2B wholesale platform connecting African businesses to 10,000+ vetted manufacturers — powered by exclusive Alibaba partnerships.
          </p>
        </div>

        {/* Offerings */}
        <div className="grid gap-10 sm:grid-cols-2 text-left">
          {[{
            icon: <Globe className="w-7 h-7 sm:w-8 sm:h-8 mt-1" />,
            title: "Global Sourcing",
            desc: "Raw to finished goods from China, Turkey, India & Europe — all at factory rates."
          }, {
            icon: <Repeat className="w-7 h-7 sm:w-8 sm:h-8 mt-1" />,
            title: "Intra-Africa Trade",
            desc: "Empowers local manufacturers to trade seamlessly across the continent."
          }, {
            icon: <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 mt-1" />,
            title: "Export Growth",
            desc: "Expand internationally with affordable pricing and logistics support."
          }, {
            icon: <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 mt-1" />,
            title: "Trusted Suppliers",
            desc: "Verified for quality, compliance, and authenticity — always."
          }].map(({ icon, title, desc }, index) => (
            <div className="flex items-start gap-4" key={index}>
              {icon}
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-1">{title}</h3>
                <p className="text-sm sm:text-base">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 text-center">
          <p className="italic font-semibold text-base sm:text-lg leading-relaxed max-w-3xl sm:max-w-4xl mx-auto mb-6 text-[#FBAF43]">
            “Cut sourcing costs by 40% and reduce lead times — with Maersk-backed logistics. One platform serving Rwandan coffee, Ugandan textiles, and Nigerian retail.”
          </p>

          {/* CTA Button */}
          <Link href="https://your-website.com" target="_blank">
            <button className="mt-4 px-6 sm:px-8 py-3 text-sm sm:text-lg bg-[#FBAF43] text-white font-semibold font-[Monospace] rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
              Visit the Website
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
