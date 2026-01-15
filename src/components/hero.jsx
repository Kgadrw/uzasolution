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
    <section className="relative w-full font-sans bg-[#F8FAFC]">
      {/* Navbar Component */}
      <Navbar initialSolid={false} />

      {/* Hero Section */}
      <div className="relative h-[350px] sm:h-[450px] md:h-[500px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image src="/hero2.jpg" alt="Hero" fill className="object-cover" priority />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00142B]/90 via-[#00142B]/70 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
          <div className="max-w-2xl text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              <span className="text-[#FBAF43]">Africa</span>'s Gateway to Global Trade
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
              {heroText.description}
            </p>
            <div className="mt-6 sm:mt-8">
              <Link href="https://www.uzabulk.com/auth/login">
                <button className="bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg text-sm md:text-base">
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
