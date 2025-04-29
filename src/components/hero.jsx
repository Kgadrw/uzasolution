'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Hero() {
  const [isFixed, setIsFixed] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const mobileMenuRef = useRef(null) // Reference for mobile menu
  const mobileMenuToggleRef = useRef(null) // Reference for the mobile menu toggle button
  const touchStartX = useRef(0) // For detecting swipe gesture start

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight * 0.8

      setIsFixed(currentScrollY > heroHeight)
      setShowNav(currentScrollY < lastScrollY)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close the mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
        mobileMenuToggleRef.current && !mobileMenuToggleRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false)
      }
    }

    if (showMobileMenu) {
      window.addEventListener('click', handleClickOutside)
    }

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [showMobileMenu])

  // Handle swipe gesture for opening/closing the mobile menu
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const swipeThreshold = 100 // Minimum swipe distance to trigger menu open/close
    if (touchStartX.current - touchEndX > swipeThreshold) {
      setShowMobileMenu(true) // Swipe from right to left to open menu
    }
    if (touchEndX - touchStartX.current > swipeThreshold) {
      setShowMobileMenu(false) // Swipe from left to right to close menu
    }
  }

  const navBaseClasses =
    'top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center font-[Roboto] text-white transition-all duration-300'

  const navPositionClass = isFixed
    ? `fixed ${showNav ? 'translate-y-0' : '-translate-y-full'} bg-[#213348]`
    : 'absolute bg-transparent'

  return (
    <section className="relative flex flex-col md:flex-row w-full min-h-screen">
      {/* Navbar */}
      <nav className={`${navBaseClasses} ${navPositionClass}`} role="navigation">
        <div className="text-xl font-bold">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-10 w-20 md:h-12 md:w-24" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-20 items-center text-lg font-semibold">
          <Link className="hover:text-[#FBAF43]" href="/#about">About Us</Link>
          <Link className="hover:text-[#FBAF43]" href="/#projects">Our Projects</Link>
          <Link className="hover:text-[#FBAF43]" href="/#why">Why Uza?</Link>
          <Link className="hover:text-[#FBAF43]" href="/#news">News</Link>
        </div>

        {/* Mobile Menu Toggle + Sign In */}
        <div className="flex items-center space-x-4 md:space-x-0">
          <button
            ref={mobileMenuToggleRef} // Attach the ref here
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
            aria-expanded={showMobileMenu ? 'true' : 'false'}
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="https://www.uzabulk.com/auth/login">
            <button className="bg-[#FBAF43] text-white px-4 py-2 rounded-md font-medium text-sm md:text-base">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation Items */}
      {showMobileMenu && (
        <>
          {/* Overlay for outside clicks */}
          <div
            className="md:hidden fixed inset-0 bg-[#213348] bg-opacity-75 z-40"
            onClick={() => setShowMobileMenu(false)} // Close menu when clicking outside
          />

          {/* Mobile menu */}
          <div
            ref={mobileMenuRef}
            className="flex flex-col items-start px-6 py-4 space-y-4 absolute top-[80px] left-0 w-full z-50 bg-[#213348] text-white"
          >
            <Link href="/#about" onClick={() => setShowMobileMenu(false)}>About Us</Link>
            <Link href="/#projects" onClick={() => setShowMobileMenu(false)}>Our Projects</Link>
            <Link href="/#why" onClick={() => setShowMobileMenu(false)}>Why Uza?</Link>
            <Link href="/news" onClick={() => setShowMobileMenu(false)}>News</Link>
          </div>

          {/* Blur effect on the background */}
          <div className="fixed inset-0 bg-[#213348] bg-opacity-40 backdrop-blur-md z-30"></div>
        </>
      )}

      {/* Hero Content */}
      <div
        className="flex flex-col md:flex-row w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left Side */}
        <div
          className="w-full md:w-1/2 flex items-center justify-center bg-[#213348] text-white px-6 py-20 sm:py-28"
          style={{ minHeight: '100vh' }}
        >
          <div className="w-full max-w-lg text-center md:text-left space-y-8 md:space-y-8">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-[Montserrat] text-[#FBAF43]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <span className='text-white'>Connecting </span>
              African Manufacturers <span className='text-white'>to Global </span>
              Markets
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl font-[Roboto]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              Uza Solutions Ltd connects African manufacturers with global markets, simplifying cross-border trade. Our platform offers direct access to raw materials and products, cutting costs by eliminating middlemen and ensuring competitive prices and reliable logistics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
            >
              <Link href="https://www.uzabulk.com/">
                <button className="bg-[#FBAF43] text-white px-6 py-3 rounded-md font-medium text-base md:text-lg font-[Monospace]">
                  Get Started
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Side */}
        <div
          className="w-full md:w-1/2 hidden md:block"
          style={{
            backgroundImage: "url('/bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
          }}
        ></div>
      </div>
    </section>
  )
}
