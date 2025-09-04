'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'   // ✅ Import Next.js Image
import { ArrowRight, Package, Truck, ShoppingCart, Cloud } from 'lucide-react'

export default function AboutUs() {
  const platforms = [
    {
      id: 1,
      title: 'UZA Bulk',
      description: 'Bulk sourcing platform for raw materials and commodities',
      icon: Package,
      image: '/1.jpg',
      link: '#'
    },
    {
      id: 2,
      title: 'UZA Logistics',
      description: 'End-to-end logistics and supply chain solutions',
      icon: Truck,
      image: '/2.jpg',
      link: '#'
    },
    {
      id: 3,
      title: 'UZA Mall',
      description: 'Digital marketplace for African businesses',
      icon: ShoppingCart,
      image: '/3.jpg',
      link: '#'
    },
    {
      id: 4,
      title: 'UZA Cloud',
      description: 'Cloud infrastructure and digital services',
      icon: Cloud,
      image: '/4.jpg',
      link: '#'
    }
  ]

  return (
    <section id="about" className="py-20 px-8 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Title */}
          <div>
            <div className="flex items-center mb-4">
              <span className="w-1 h-5 bg-[#FBAF43] rounded mr-3"></span>
              <p className="text-sm font-semibold text-[#FBAF43] uppercase tracking-wider">
                Our Solutions
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-[Montserrat] leading-tight">
              Tech-Driven Platforms to Power Africa's Digital Trade Future
            </h2>
          </div>

          {/* Right Side - Description & Button */}
          <div className="space-y-6">
            <p className="text-lg text-gray-600 font-[Roboto] leading-relaxed">
              UZA Solutions streamlines trade with platforms for sourcing, logistics, and cloud services, enabling business growth in the digital age.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300 group"
            >
              Explore
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform) => {
            return (
              <div
                key={platform.id}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-[#FBAF43] transition-all duration-300 cursor-pointer relative"
              >
                {/* Platform Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={platform.image}
                    alt={platform.title}
                    fill
                    loading="lazy" // ✅ Lazy load
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Bottom Blurred Panel */}
                <div className="absolute bottom-0 left-0 w-full px-4 py-3 flex flex-col gap-2 backdrop-blur-[3px] bg-black/40 text-white z-10">
                  <h3 className="text-lg font-bold font-[Montserrat] group-hover:text-[#FBAF43] transition-colors duration-300">
                    {platform.title}
                  </h3>
                  <Link
                    href={platform.link}
                    className="inline-flex items-center gap-1 text-white font-semibold text-sm hover:text-[#FBAF43] transition-colors duration-300 group/link"
                  >
                    Learn More
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
