'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import client from '../sanityClient'

export default function Hero() {
  const [heroData, setHeroData] = useState({})
  const [isFixed, setIsFixed] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const mobileMenuRef = useRef(null)

  // Fetch Hero data from Sanity
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

      if (!showMobileMenu) {
        setShowNav(currentScrollY < lastScrollY)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, showMobileMenu])

  // Click outside to close mobile menu
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMobileMenu])

  const navBaseClasses =
    'top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 py-6 flex justify-between items-center font-[Roboto] text-white transition-all duration-300'
  const navPositionClass = isFixed
    ? `fixed ${showNav || showMobileMenu ? 'translate-y-0' : '-translate-y-full'} bg-[#213348]`
    : 'absolute bg-transparent'

  return (
    <section className="relative flex flex-col md:flex-row w-full min-h-screen font-sans">
      {/* Navbar */}
      <nav className={`${navBaseClasses} ${navPositionClass} font-sans`}>
        <div className="text-xl font-bold">
          <Link href="/">
            <img
              src={heroData.logo?.asset?.url || '/logo.png'}
              alt="Logo"
              className="h-10 w-20 md:h-12 md:w-24"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12 items-center text-lg font-semibold">
          <Link className="hover:text-[#FBAF43]" href="/">Home</Link>
          <Link className="hover:text-[#FBAF43]" href="/#about">About</Link>
          <Link className="hover:text-[#FBAF43]" href="/#solutions">Solutions</Link>
          <Link className="hover:text-[#FBAF43]" href="/#news">News & Trends</Link>
          <Link className="hover:text-[#FBAF43]" href="/#contact">Contact Us</Link>
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
          <Link href={heroData.signInLink || 'https://www.uzabulk.com/auth/login'}>
            <button className="bg-[#FBAF43] text-white px-4 py-2 rounded-md font-medium text-sm md:text-base">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation Items */}
      {showMobileMenu && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed top-[80px] left-0 w-full bg-[#213348] text-white z-40 px-6 py-4 flex flex-col items-start space-y-4"
        >
          <Link href="/#about" onClick={() => setShowMobileMenu(false)}>About Us</Link>
          <Link href="/#projects" onClick={() => setShowMobileMenu(false)}>Our Projects</Link>
          <Link href="/#why" onClick={() => setShowMobileMenu(false)}>Why Uza?</Link>
          <Link href="/#news" onClick={() => setShowMobileMenu(false)}>News</Link>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative w-full" style={{ minHeight: '100vh' }}>
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${heroData.backgroundImage?.asset?.url || '/hero.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(to right, #13212F 0%, #13212F00 100%)',
          }}
        ></div>
        
        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-start w-full h-full px-8 md:px-16 lg:px-24 py-20 sm:py-28">
          
          <div className="w-full max-w-lg text-left space-y-8 font-sans">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FBAF43] font-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              {heroData.heroTitle || (
                <>
                  <span className='text-white'>Connecting </span>
                  African Manufacturers <span className='text-white'>to Global </span>
                  Markets
                </>
              )}
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-white font-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              {heroData.heroDescription || `Uza Solutions Ltd connects African manufacturers with global markets, simplifying cross-border trade. Our platform offers direct access to raw materials and products, cutting costs by eliminating middlemen and ensuring competitive prices and reliable logistics.`}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
            >
              <Link href={heroData.primaryCtaLink || 'https://www.uzabulk.com/'}>
                <button className="bg-[#FBAF43] text-white px-6 py-3 rounded-md font-semibold text-base md:text-lg font-sans">
                  {heroData.primaryCtaText || 'Get Started'}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom Navigation and Partner Logos */}
        <div className="absolute bottom-8 left-8 z-20 text-white">
          <div className="bg-black/20 backdrop-blur-sm p-4 flex items-center space-x-3">
            <button className="text-white hover:text-[#FBAF43] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="text-white hover:text-[#FBAF43] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Partner Logos */}
        <div className="absolute bottom-8 right-8 z-20 text-white">
          <div className="bg-black/20 backdrop-blur-sm p-6">
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-left max-w-xs">
                Trusted by global giants and Entrepreneurs Across Africa
              </div>
              <div className="bg-white p-2 ">
                <img 
                  src="/alibaba.png" 
                  alt="Alibaba" 
                  className="h-10 md:h-12 opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="bg-white p-2 ">
                <img 
                  src="/maersk.png" 
                  alt="Maersk" 
                  className="h-10 md:h-12 opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
