'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function GlobalImpactHero() {
  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Content Block */}
        <div className="space-y-6">
          {/* Title Tag */}
          <div className="flex items-center mb-2">
            <span className="w-1 h-5 bg-[#FBAF43] rounded mr-3"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FBAF43]">
              Global Impact
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#19283A] font-[Montserrat] leading-tight mb-2">
            Partnering with Industry Giants to{' '}
            <br className="hidden md:block" /> Revolutionize African Trade
          </h1>

          {/* Subtext */}
          <p className="text-sm md:text-base text-[#19283A] font-[Roboto] max-w-lg mb-6">
            With trusted global partners like Alibaba and Maersk, UZA Solutions is transforming the
            way African businesses trade globally.
          </p>

          {/* Stat Badges */}
          <div className="flex flex-col gap-4 mb-6">
            {/* Stat 1 */}
            <div className="flex items-center gap-3">
              <span className="relative flex items-center justify-center w-12 h-12">
                {/* SVG Arc 40% */}
                <svg className="absolute top-0 left-0 w-12 h-12" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                  <path
                    d="M20 2
                      a 18 18 0 1 1 0 36
                      a 18 18 0 1 1 0 -36"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="4"
                    strokeDasharray="113.097, 113.097"
                    strokeDashoffset="67.858" /* 40% */
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[#22C55E] font-bold text-base z-10">40%</span>
              </span>
              <span className="text-[#19283A] font-medium text-sm md:text-base">
                Cost reduction in sourcing through UZA Bulk
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3">
              <span className="relative flex items-center justify-center w-12 h-12">
                {/* SVG Arc 60% */}
                <svg className="absolute top-0 left-0 w-12 h-12" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                  <path
                    d="M20 2
                      a 18 18 0 1 1 0 36
                      a 18 18 0 1 1 0 -36"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="4"
                    strokeDasharray="113.097, 113.097"
                    strokeDashoffset="45.239" /* 60% */
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[#22C55E] font-bold text-base z-10">60%</span>
              </span>
              <span className="text-[#19283A] font-medium text-sm md:text-base">
                Faster shipping times with UZA Logistics
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="#"
            className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-[#19283A] font-semibold px-6 py-3 rounded-md transition-all duration-300 group shadow-md hover:shadow-lg text-base"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Right: Illustration */}
        <div className="flex justify-center items-center w-full relative">
          <div className="relative w-full max-w-lg" style={{ maxHeight: 340 }}>
            <Image
              src="/8.png"
              alt="Global logistics and trade illustration"
              width={600}
              height={340}
              loading="lazy"
              placeholder="blur"
              blurDataURL="/8-blur.png" // optional
              className="relative z-10 w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
