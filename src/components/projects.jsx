'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function WhoAreWe() {
  const images = [
    { id: 1, src: '/21.jpg', alt: 'Businessman with a laptop' },
    { id: 2, src: '/22.jpg', alt: 'Two professionals discussing' },
    { id: 3, src: '/23.jpg', alt: 'Pharmacist or warehouse worker smiling' }
  ]

  return (
    <section
      id="who-are-we"
      className="relative py-0 px-8 md:px-16 lg:px-24 font-sans bg-[#F8FAFC]"
    >
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            {/* Small Title */}
            <div className="flex items-center">
              <span className="w-1 h-5 bg-[#FBAF43] rounded mr-3"></span>
              <p className="text-sm font-semibold text-[#FBAF43] uppercase tracking-wider">
                Who Are We
              </p>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent leading-tight antialiased">
              Your Trusted Partner in<br />
              <span className="text-[#FBAF43] antialiased">Transforming Africa's Trade</span>
            </h2>

            {/* Paragraph */}
            <p className="text-base md:text-lg text-gray-900 leading-relaxed antialiased">
              At UZA Solutions, we are driving Africa's trade revolution with innovative, tech-driven platforms that connect businesses to global markets.
              <br /><br />
              Our mission is to empower African entrepreneurs and companies with seamless access to sourcing, logistics, and cloud services creating a future of streamlined trade and growth.
            </p>

            {/* CTA Button */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Right Side - Image Grid */}
          <div className="relative" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
            {/* Background Pattern - Removed for performance */}

            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-2 h-80 md:h-[420px] relative z-10" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative overflow-hidden bg-white/40 rounded-lg"
                  style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    className="object-cover"
                    style={{ willChange: 'transform' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
