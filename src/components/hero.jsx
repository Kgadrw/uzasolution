'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import client from '../sanityClient'

export default function Hero() {
  const [heroData, setHeroData] = useState({})
  const [isFixed, setIsFixed] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const mobileMenuRef = useRef(null)

  // Fetch Hero data
  useEffect(() => {
    const fetchHero = async () => {
      const query = `*[_type == "hero"][0]`
      const data = await client.fetch(query)
      setHeroData(data)
    }
    fetchHero()
  }, [])

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
      if (showMobileMenu && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
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
          <Link className="hover:text-[#FBAF43]" href="/">Home</Link>
          <Link className="hover:text-[#FBAF43]" href="/#about">About</Link>
          <Link className="hover:text-[#FBAF43]" href="/portfolio">Portfolio</Link>
          <Link className="hover:text-[#FBAF43]" href="/#news">News</Link>
          <Link className="hover:text-[#FBAF43]" href="/#contact">Contact</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} aria-label="Toggle menu">
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative w-full min-h-screen flex items-center px-8 md:px-16 lg:px-24 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${heroData.backgroundImage?.asset?.url || '/hero.jpg'})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#13212F] to-transparent"></div>

        {/* Left Hero Content */}
        <div className="relative z-10 max-w-lg text-left space-y-8">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            Africa’s Gateway to <span className="text-[#FBAF43]">Global Trade</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            We empower African businesses with tech-driven solutions that simplify
            sourcing, logistics, and scaling globally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <Link href={heroData.primaryCtaLink || 'https://www.uzabulk.com/'}>
              <motion.button
                className="relative px-8 py-3 font-semibold text-base md:text-lg rounded-full overflow-hidden text-white bg-[#FBAF43] shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-[#e59e3b]"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FBAF43] via-[#FDE68A] to-[#F59E0B] opacity-40 blur-2xl pointer-events-none"
                  animate={{
                    x: ['-10%', '10%', '-10%'],
                    y: ['-10%', '10%', '-10%'],
                    rotate: [0, 45, -45, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
                />
                <span className="relative z-10">Get Started</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right Mockup Image */}
        {/* Right Mockup Image */}
   
      </div>
    </section>
  )
}
