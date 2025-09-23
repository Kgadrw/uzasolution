'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from './navbar'

export default function HeroSection() {
  const slides = [
    { image: '/hero.jpg' },
    { image: '/hero2.jpg' },
    { image: '/hero3.jpg' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const heroText = {
    title: "Africa’s Gateway to Global Trade",
    description:
      "We empower African businesses with tech-driven solutions that simplify sourcing, logistics, and scaling globally.",
    cta: "Get Started",
  }

  // Automatic slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleNextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length)
  const handlePrevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative w-full font-sans">
      {/* Navbar Component */}
      <Navbar initialSolid={false} />

      {/* -------- Hero Section -------- */}
      <div className="relative h-[500px] sm:h-[600px] md:h-[700px] w-full overflow-hidden group">
        {/* Background Image */}
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image src={slides[currentIndex].image} alt="Hero Slide" fill className="object-cover" priority />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00142B]/95 via-[#00142B]/80 to-transparent md:bg-gradient-to-r md:from-[#00142B]/95 md:via-[#00142B]/80 md:to-transparent" />

        {/* Hero Content Left-Aligned with responsive padding */}
        <div className="relative z-10 flex h-full items-center px-4 py-16 sm:px-8 sm:py-20 md:px-32 md:py-32">
          <div className="max-w-xs sm:max-w-md md:max-w-xl text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight text-white">
              <span className="text-[#FBAF43]">Africa</span>'s Gateway to Global Trade
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed">
              {heroText.description}
            </p>
            <div className="mt-6 sm:mt-8">
              <Link href="#">
                <button className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl text-sm sm:text-base touch-manipulation">
                  {heroText.cta}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* -------- Slider Arrows -------- */}
        <button
          onClick={handlePrevSlide}
          className="absolute top-1/2 left-2 sm:left-4 md:left-6 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity touch-manipulation"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute top-1/2 right-2 sm:right-4 md:right-6 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity touch-manipulation"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* -------- Slider Dots -------- */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          {slides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all touch-manipulation ${
                idx === currentIndex ? 'bg-[#FBAF43]' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
