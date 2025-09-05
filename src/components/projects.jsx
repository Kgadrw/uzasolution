'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play } from 'lucide-react'

export default function WhoAreWe() {
  const images = [
    { id: 1, src: '/21.jpg', alt: 'Businessman with a laptop', className: 'col-span-1 row-span-1' },
    { id: 2, src: '/22.jpg', alt: 'Two professionals discussing', className: 'col-span-1 row-span-1' },
    { id: 3, src: '/23.jpg', alt: 'Person behind transparent interface', className: 'col-span-1 row-span-2 relative', hasVideo: true, videoSrc: '/24.mp4' },
    { id: 4, src: '/23.jpg', alt: 'Pharmacist or warehouse worker smiling', className: 'col-span-1 row-span-1' }
  ]

  return (
    <section
      id="who-are-we"
      className="relative py-20 px-8 md:px-16 lg:px-24 text-white bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('/hero.jpg')", // Replace with your fixed hero image
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#13212F]/80 z-0"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            {/* Small Title */}
            <div className="flex items-center">
              <span className="w-1 h-5 bg-[#FBAF43] rounded mr-3"></span>
              <p className="text-sm font-semibold text-[#FBAF43] uppercase tracking-wider">
                Who Are We
              </p>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-bold font-[Montserrat] leading-tight">
              Your Trusted Partner in<br />
              <span className="text-[#FBAF43]">Transforming Africa's Trade</span>
            </h2>

            {/* Paragraph */}
            <p className="text-lg text-gray-300 font-[Roboto] leading-relaxed">
              At UZA Solutions, we are driving Africa's trade revolution with innovative, tech-driven platforms that connect businesses to global markets.
              <br /><br />
              Our mission is to empower African entrepreneurs and companies with seamless access to sourcing, logistics, and cloud services creating a future of streamlined trade and growth.
            </p>

            {/* CTA Button */}
            <Link
              href="#"
              className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Right Side - Image Grid */}
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 gap-2 h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-[#FBAF43] rounded-full"></div>
                ))}
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 grid-rows-3 gap-4 h-96 md:h-[500px] relative z-10">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden rounded-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${image.className}`}
                >
                  {image.hasVideo ? (
                    <video
                      src={image.videoSrc}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* Video Play Button Overlay */}
                  {image.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-transparent rounded-full p-4 border-2 border-[#FBAF43] group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-[#FBAF43] ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
