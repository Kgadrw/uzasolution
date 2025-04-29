'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'


export default function Hero() {
  const [isFixed, setIsFixed] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

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

  const navBaseClasses =
    'top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center font-[Roboto] text-white transition-all duration-300'

  const navPositionClass = isFixed
    ? `fixed ${showNav ? 'translate-y-0' : '-translate-y-full'} bg-[#213348]`
    : 'absolute bg-transparent'

  return (
    <section className="relative flex flex-col md:flex-row w-full min-h-screen">
      {/* Navbar */}
      <nav className={`${navBaseClasses} ${navPositionClass}`}>
        <div className="text-xl font-bold">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-10 w-20 md:h-12 md:w-24" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-32 items-center text-lg font-semibold">
          <Link className="hover:text-[#FBAF43]" href="/about">About us</Link>
          <Link className="hover:text-[#FBAF43]" href="/how">How It Works</Link>
          <Link className="hover:text-[#FBAF43]" href="/team">Our Team</Link>
          <Link className="hover:text-[#FBAF43]" href="/tools">Tools</Link>
        </div>

        {/* Mobile Menu Toggle + Sign In */}
        <div className="flex items-center space-x-4 md:space-x-0">
          <button
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
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
        <div className="md:hidden bg-[#213348] text-white flex flex-col items-start px-6 py-4 space-y-4 absolute top-[80px] left-0 w-full z-40">
          <Link href="/about" onClick={() => setShowMobileMenu(false)}>About us</Link>
          <Link href="/how" onClick={() => setShowMobileMenu(false)}>How It Works</Link>
          <Link href="/team" onClick={() => setShowMobileMenu(false)}>Our Team</Link>
          <Link href="/tools" onClick={() => setShowMobileMenu(false)}>Tools</Link>
        </div>
      )}

      {/* Hero Content */}
      <div className="flex flex-col md:flex-row w-full">
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
