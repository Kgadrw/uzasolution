'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  const slides = [
    { image: '/hero.jpg' },
    { image: '/hero2.jpg' },
    { image: '/hero3.jpg' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

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
      {/* -------- Logo Top-Left with horizontal padding -------- */}
      <div className="absolute top-6 left-0 z-50 px-32">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={120} height={50} className="object-contain" />
        </Link>
      </div>

      {/* -------- Navbar Top-Right with horizontal padding -------- */}
      <nav className="absolute top-6 right-0 z-50 px-32">
        <div className="hidden md:flex items-center space-x-6 px-6 py-3 rounded-full shadow-lg bg-[#00142B]/100 text-white">
          <Link href="/" className="hover:text-[#FBAF43]">Home</Link>
          <Link href="/about" className="hover:text-[#FBAF43]">About</Link>
          <Link href="/portfolio" className="hover:text-[#FBAF43]">Portfolio</Link>
          <Link href="/campaigns" className="hover:text-[#FBAF43]">Campaigns</Link>
          <Link href="/news" className="hover:text-[#FBAF43]">News</Link>
          <Link href="/contact" className="hover:text-[#FBAF43]">Contact</Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden mt-2 px-6 py-4 rounded-full shadow-lg bg-[#00142B]/100 text-white">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle Menu"
            className="absolute top-3 right-3"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          {showMobileMenu && (
            <div className="flex flex-col space-y-3">
              <Link href="/" className="block hover:text-[#FBAF43]">Home</Link>
              <Link href="/about" className="block hover:text-[#FBAF43]">About</Link>
              <Link href="/portfolio" className="block hover:text-[#FBAF43]">Portfolio</Link>
              <Link href="/campaigns" className="block hover:text-[#FBAF43]">Campaigns</Link>
              <Link href="/news" className="block hover:text-[#FBAF43]">News</Link>
              <Link href="/contact" className="block hover:text-[#FBAF43]">Contact</Link>
            </div>
          )}
        </div>
      </nav>

      {/* -------- Hero Section -------- */}
      <div className="relative h-[700px] w-full overflow-hidden group">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#00142B]/95 via-[#00142B]/80 to-transparent" />

        {/* Hero Content Left-Aligned with full padding */}
        <div className="relative z-10 flex h-full items-center p-32">
          <div className="max-w-xl text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
              <span className="text-[#FBAF43]">Africa</span>’s Gateway to Global Trade
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200">{heroText.description}</p>
            <div className="mt-8">
              <Link href="#">
                <button className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl">
                  {heroText.cta}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* -------- Slider Arrows -------- */}
        <button
          onClick={handlePrevSlide}
          className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute top-1/2 right-6 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* -------- Slider Dots -------- */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {slides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                idx === currentIndex ? 'bg-[#FBAF43]' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
