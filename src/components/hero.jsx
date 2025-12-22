'use client'

import Link from 'next/link'
import Image from 'next/image'
import Navbar from './navbar'

export default function HeroSection() {
  const heroText = {
    title: "Africa's Gateway to Global Trade",
    description:
      "We empower African businesses with tech-driven solutions that simplify sourcing, logistics, and scaling globally.",
    cta: "Get Started",
  }

  return (
    <section className="relative w-full font-sans px-4 md:px-16 lg:px-24 bg-[#F8FAFC]">
      {/* Navbar Component */}
      <Navbar initialSolid={false} />

      {/* -------- Hero Section -------- */}
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full md:max-w-[90%] md:mx-auto overflow-hidden rounded-l-[3rem] rounded-tr-[3rem] rounded-br-[3rem] border-l-4 border-[#19486A]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image src="/hero2.jpg" alt="Hero" fill className="object-cover" priority />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00142B]/95 via-[#00142B]/80 to-transparent md:bg-gradient-to-r md:from-[#00142B]/95 md:via-[#00142B]/80 md:to-transparent" />

        {/* Hero Content Left-Aligned with responsive padding */}
        <div className="relative z-10 flex h-full items-center px-3 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-32 lg:py-32">
          <div className="max-w-xs sm:max-w-md md:max-w-xl text-left">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-white">
              <span className="text-[#FBAF43]">Africa</span>'s Gateway to Global Trade
            </h1>
            <p className="mt-2 sm:mt-4 md:mt-6 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-200 leading-relaxed">
              {heroText.description}
            </p>
            <div className="mt-3 sm:mt-6 md:mt-8">
              <Link href="https://www.uzabulk.com/auth/login">
                <button className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl text-xs sm:text-sm md:text-base touch-manipulation">
                  {heroText.cta}
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
