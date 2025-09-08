'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import client from '../sanityClient'

export default function Hero() {
  const [heroData, setHeroData] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const mobileMenuRef = useRef(null)

  // slides
  const slides = [
    { image: '/hero.jpg' },
    { image: '/hero2.jpg' },
    { image: '/hero3.jpg' },
  ]

  const heroText = {
    title: "Africa’s Gateway to Global Trade",
    description:
      "We empower African businesses with tech-driven solutions that simplify sourcing, logistics, and scaling globally.",
    cta: "Get Started",
  }

  // fetch hero sanity data
  useEffect(() => {
    const fetchHero = async () => {
      const query = `*[_type == "hero"][0]`
      const data = await client.fetch(query)
      setHeroData(data)
    }
    fetchHero()
  }, [])

  // background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIdx = (currentIndex + 1) % slides.length
      setNextIndex(nextIdx)
    }, 4000)
    return () => clearInterval(interval)
  }, [currentIndex])

  useEffect(() => {
    if (nextIndex !== null) {
      const timeout = setTimeout(() => {
        setCurrentIndex(nextIndex)
        setNextIndex(null)
      }, 800)
      return () => clearTimeout(timeout)
    }
  }, [nextIndex])

  // navbar scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // change background when scrolled
      if (currentScrollY > 50) setScrolled(true)
      else setScrolled(false)

      // detect scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) setShowNavbar(false)
      else setShowNavbar(true)

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const currentSlide = slides[currentIndex]

  return (
    <section className="relative w-full font-sans">
      {/* -------- Main Nav -------- */}
      <nav
        className={`fixed top-0 left-0 w-full z-20 transition-all duration-300 ${
          scrolled ? 'bg-[#213348] text-white shadow-md' : 'bg-transparent text-white'
        } ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={heroData.logo?.asset?.url || '/logo.png'}
              alt="Logo"
              width={100}
              height={50}
              className="object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 font-regular text-sm">
            <Link href="/" className="hover:text-[#FBAF43]">Home</Link>
            <Link href="/#about" className="hover:text-[#FBAF43]">About</Link>
            <Link href="/portfolio" className="hover:text-[#FBAF43]">Portfolio</Link>
            <Link href="/#news" className="hover:text-[#FBAF43]">News</Link>
            <Link href="/#contact" className="hover:text-[#FBAF43]">Contact</Link>
          </div>

          {/* Mobile Nav */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle Menu"
            className="md:hidden"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {showMobileMenu && (
          <div
            ref={mobileMenuRef}
            className={`md:hidden px-6 pb-4 space-y-3 ${
              scrolled ? 'bg-[#213348]' : 'bg-[#00142B]/90'
            }`}
          >
            <Link href="/" className="block hover:text-[#FBAF43]">Home</Link>
            <Link href="/#about" className="block hover:text-[#FBAF43]">About</Link>
            <Link href="/portfolio" className="block hover:text-[#FBAF43]">Portfolio</Link>
            <Link href="/#news" className="block hover:text-[#FBAF43]">News</Link>
            <Link href="/#contact" className="block hover:text-[#FBAF43]">Contact</Link>
          </div>
        )}
      </nav>

      {/* -------- Hero Section -------- */}
      <div className="relative h-[700px] w-full overflow-hidden">
        {/* Background Image */}
        <motion.div
          key={currentSlide.image}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={currentSlide.image}
            alt="Hero Slide"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00142B]/95 via-[#00142B]/80 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center pl-[150px] pr-6">
          <div className="max-w-xl text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
              <span className="text-[#FBAF43]">Africa</span>’s Gateway to Global Trade
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200">
              {heroText.description}
            </p>
            <div className="mt-8">
              <Link href={heroData.primaryCtaLink || '#'}>
                <button className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl">
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
