'use client'

import React from 'react'
import Image from 'next/image'   // ✅ Next.js Image
import { Handshake, Globe, TrendingUp, Zap } from 'lucide-react'

export default function WhyChooseUZA() {
  const features = [
    {
      icon: <Handshake className="w-7 h-7 text-[#FBAF43]" />,
      title: 'Trusted Global Partnerships',
    },
    {
      icon: <Globe className="w-7 h-7 text-[#FBAF43]" />,
      title: 'End-to-End Solutions',
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-[#FBAF43]" />,
      title: 'Impact-Driven',
    },
    {
      icon: <Zap className="w-7 h-7 text-[#FBAF43]" />,
      title: 'Innovation in Africa',
    },
  ]

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <div className="w-full flex justify-center items-stretch">
          <div className="relative w-full max-w-lg min-h-[400px]">
            <Image
              src="/6.jpg"
              alt="Two professionals in a warehouse"
              fill
              loading="lazy"       // ✅ Lazy load
              placeholder="blur"   // ✅ Smooth blur-up effect
              blurDataURL="/6-blur.jpg" // optional small placeholder if you have one
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="space-y-8">
          {/* Eyebrow Title */}
          <div className="flex items-center">
            <span className="w-1 h-5 bg-[#FBAF43] rounded mr-3"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FBAF43]">
              Why Choose UZA Solutions?
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-[Montserrat] leading-tight">
            Transforming Africa’s Trade with{' '}
            <span className="text-[#FBAF43]">Seamless, Tech-Driven Solutions</span>
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-700 font-[Roboto] max-w-xl">
            We are revolutionizing Africa’s trade ecosystem with seamless, tech-driven solutions that
            empower businesses and travelers to reach global markets.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="bg-[#FBAF43]/20 rounded-lg p-3 flex items-center justify-center">
                  {feature.icon}
                </div>
                <span className="font-semibold text-gray-900 text-base md:text-lg font-[Montserrat]">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
