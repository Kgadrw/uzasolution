'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import client from '../sanityClient'

export default function Hero() {
  const [heroData, setHeroData] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(null)
  const [isFixed, setIsFixed] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const mobileMenuRef = useRef(null)

  // Hero slides (backgrounds only now)
  const slides = [
    { image: '/hero.jpg' },
    { image: '/hero2.jpg' },
    { image: '/hero3.jpg' },
  ]

  // Static text (only from first slide)
  const heroText = {
    title: "Africa’s Gateway to Global Trade",
    description:
      "We empower African businesses with tech-driven solutions that simplify sourcing, logistics, and scaling globally.",
    cta: "Get Started",
  }

  // Fetch Hero data
  useEffect(() => {
    const fetchHero = async () => {
      const query = `*[_type == "hero"][0]`
      const data = await client.fetch(query)
      setHeroData(data)
    }
    fetchHero()
  }, [])

  // Background slider
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIdx = (currentIndex + 1) % slides.length
      setNextIndex(nextIdx)
    }, 3000) // switch every 3s
    return () => clearInterval(interval)
  }, [currentIndex])

  // Update currentIndex after slide
  useEffect(() => {
    if (nextIndex !== null) {
      const timeout = setTimeout(() => {
        setCurrentIndex(nextIndex)
        setNextIndex(null)
      }, 1000) // duration of slide animation
      return () => clearTimeout(timeout)
    }
  }, [nextIndex])

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight * 0.8
      setIsFixed(currentScrollY > heroHeight)
      if (!showMobileMenu) setShowNav(currentScrollY < lastScrollY)
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, showMobileMenu])

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showMobileMenu &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showMobileMenu])

  const navBaseClasses =
    'top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 py-2 flex justify-between items-center font-sans text-white transition-all duration-300 antialiased'
  const navPositionClass = isFixed
    ? `fixed ${showNav || showMobileMenu ? 'translate-y-0' : '-translate-y-full'} bg-[#213348]`
    : 'absolute bg-transparent'

  const currentSlide = slides[currentIndex]
  const nextSlide = nextIndex !== null ? slides[nextIndex] : null

  return (
    <section className="relative flex flex-col w-full min-h-screen font-sans">
      {/* Navbar */}
      <nav className={`${navBaseClasses} ${navPositionClass}`}>
        <div className="text-xl font-bold">
          <Link href="/">
            <Image
              src={heroData.logo?.asset?.url || '/logo.png'}
              alt="Logo"
              width={96}
              height={48}
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex ml-auto space-x-8 items-center text-base font-semibold antialiased">
          <Link className="hover:text-[#FBAF43]" href="/">
            Home
          </Link>
          <Link className="hover:text-[#FBAF43]" href="/#about">
            About
          </Link>
          <Link className="hover:text-[#FBAF43]" href="/portfolio">
            Portfolio
          </Link>
          <Link className="hover:text-[#FBAF43]" href="/#news">
            News
          </Link>
          <Link className="hover:text-[#FBAF43]" href="/#contact">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex items-center px-8 md:px-16 lg:px-24 overflow-hidden">
        {/* Current background */}
        <motion.div
          key={currentSlide.image}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentSlide.image})` }}
        />

        {/* Sliding next background */}
        {nextSlide && (
          <motion.div
            key={nextSlide.image}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${nextSlide.image})` }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-[#13212F] to-transparent"></div>

        {/* Fixed Hero Content (from first slide only) */}
        <div className="relative z-10 max-w-lg text-left space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            <span className="text-[#FBAF43]">
              {heroText.title.split(' ')[0]}{' '}
            </span>
            {heroText.title.split(' ').slice(1).join(' ')}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white">
            {heroText.description}
          </p>

          <Link href={heroData.primaryCtaLink || '#'}>
            <button className="relative px-8 py-3 font-semibold text-base md:text-lg rounded-full overflow-hidden text-white bg-[#FBAF43] shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-[#e59e3b]">
              {heroText.cta}
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
