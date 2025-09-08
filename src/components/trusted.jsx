'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function WhySection() {
  return (
    <section
      className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-fixed bg-cover bg-center font-sans"
      style={{
        backgroundImage: `url('/7.jpg')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#13212F]/80 z-0" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          Let’s Build Africa’s Trade Future Together
        </h1>
        <p className="text-white text-sm md:text-base lg:text-lg mb-8 max-w-xl leading-relaxed">
          Join us in revolutionizing trade for African businesses and creating global opportunities.
        </p>

        {/* CTA Button */}
        <button className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl">
          Partner with us
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </section>
  )
}
