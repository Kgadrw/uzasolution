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
      className="relative bg-cover bg-center bg-no-repeat py-12 text-white"
      style={{
        backgroundImage: `url('/truck.jpg')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#213348] opacity-90 z-0" />

      {/* Content above overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Main Title */}
        <div className="mb-16 text-left font-[Monospace]">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-[#FBAF43]">UZA BULK</h1>
          <p className="text-xl md:text-2xl font-medium mb-4 text-[#FBAF43]">Your Global Sourcing Partner</p>
          <p className="text-lg md:text-xl max-w-3xl ">
            A B2B wholesale platform connecting African businesses to 10,000+ vetted manufacturers — powered by exclusive Alibaba partnerships.
          </p>
        </div>

        {/* Offerings */}
        <div className="grid md:grid-cols-2 gap-12 text-left">
          <div className="flex items-start gap-4">
            <Globe className="w-8 h-8 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-1">Global Sourcing</h3>
              <p>Raw to finished goods from China, Turkey, India & Europe — all at factory rates.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Repeat className="w-8 h-8 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-1">Intra-Africa Trade</h3>
              <p>Empowers local manufacturers to trade seamlessly across the continent.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <TrendingUp className="w-8 h-8 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-1">Export Growth</h3>
              <p>Expand internationally with affordable pricing and logistics support.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-1">Trusted Suppliers</h3>
              <p>Verified for quality, compliance, and authenticity — always.</p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-20 text-center">
          <p className="italic font-semibold text-lg leading-relaxed max-w-4xl mx-auto mb-8 text-[#FBAF43]">
            “Cut sourcing costs by 40% and reduce lead times — with Maersk-backed logistics. One platform serving Rwandan coffee, Ugandan textiles, and Nigerian retail.”
          </p>

          {/* CTA Button */}
          <Link href="https://your-website.com" target="_blank">
            <button className="mt-4 px-8 py-3 bg-[#FBAF43] text-white text-lg font-semibold font-[Monospace] rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
              Visit the Website
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
