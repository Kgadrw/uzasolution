'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, LogIn } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navbar({ initialSolid = false }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(initialSolid)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const mobileMenuRef = useRef(null)
  const hamburgerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showMobileMenu &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMobileMenu])

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false)
  }, [pathname])

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const links = ['/', '/about', '/uzasempower', '/news']
  const linkNames = ['Home', 'About', 'UZA Empower', 'News']

  return (
    <nav className="relative z-30 w-full">
      <div
        className={`flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-2 sm:py-2.5 md:py-3 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F8FAFC]/95 backdrop-blur-md text-[#00142B]'
            : 'bg-[#F8FAFC]/95 backdrop-blur-md text-[#00142B]'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
          <Image 
            src="/X-logo.png" 
            alt="UZA Solutions Logo" 
            width={120} 
            height={60} 
            className="object-contain filter drop-shadow-sm w-20 h-10 sm:w-24 sm:h-12 md:w-28 md:h-14 lg:w-32 lg:h-16 xl:w-[120px] xl:h-[60px]" 
          />
        </Link>

        {/* Desktop Nav Links - Centered */}
        <div className="hidden lg:flex space-x-8 xl:space-x-12">
          {links.map((href, i) => (
            <Link
              key={i}
              href={href}
              className={`relative font-semibold text-xs xl:text-sm tracking-wider uppercase transition-all duration-300 group font-quicksand ${
                isActive(href) 
                  ? 'text-[#FBAF43] font-bold' 
                  : 'text-[#00142B] hover:text-[#FBAF43]'
              }`}
            >
              <span className="relative z-10">{linkNames[i]}</span>
              {isActive(href) && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FBAF43] to-[#FFD700] rounded-full"></div>
              )}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FBAF43] to-[#FFD700] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <div className="hidden lg:block">
          <Link
            href="/uzasempower/login"
            className="group relative px-3 xl:px-4 py-1.5 rounded-full font-bold text-[10px] xl:text-xs tracking-wider uppercase transition-all duration-300 transform hover:scale-105 shadow-lg bg-[#FBAF43] hover:bg-[#00142B] text-white flex items-center justify-center space-x-2 overflow-hidden"
          >
            {/* Toggle switch effect background */}
            <div className="absolute inset-0 bg-[#FBAF43] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
            <span className="relative z-10 group-hover:text-[#00142B] transition-colors duration-300 whitespace-nowrap">Login</span>
            {/* Login icon in circular badge */}
            <div className="relative z-10 w-5 h-5 xl:w-6 xl:h-6 bg-white rounded-full flex items-center justify-center border border-[#FBAF43] group-hover:border-[#DDA63A] transition-colors duration-300">
              <LogIn className="w-2.5 h-2.5 xl:w-3 xl:h-3 text-[#FBAF43] group-hover:text-[#00142B] transition-colors duration-300" />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          ref={hamburgerRef}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle Menu"
          aria-expanded={showMobileMenu}
          className="lg:hidden p-2.5 sm:p-3 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 touch-manipulation group min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <div className="relative w-6 h-6">
            <Menu 
              className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
                showMobileMenu ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
              } text-[#00142B] group-hover:text-[#FBAF43]`} 
            />
            <X 
              className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
                showMobileMenu ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
              } text-[#00142B] group-hover:text-[#FBAF43]`} 
            />
          </div>
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden absolute top-full left-4 right-4 sm:left-6 sm:right-6 mt-2 sm:mt-3 transition-all duration-500 ease-out transform ${
          showMobileMenu 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-6 scale-95 pointer-events-none'
        }`}
      >
        <div
          className={`px-4 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl flex flex-col space-y-2 shadow-2xl backdrop-blur-xl border border-gray-200/50 bg-[#F8FAFC]/95 max-h-[calc(100vh-100px)] overflow-y-auto ${
            scrolled ? 'text-[#00142B]' : 'text-[#00142B]'
          }`}
        >
          {links.map((href, i) => (
            <Link
              key={i}
              href={href}
              onClick={() => setShowMobileMenu(false)}
              className={`block px-4 sm:px-5 py-3.5 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 touch-manipulation group relative font-quicksand min-h-[48px] flex items-center ${
                isActive(href) 
                  ? 'text-[#FBAF43] bg-gradient-to-r from-[#FBAF43]/10 to-[#FFD700]/10 font-bold' 
                  : 'text-[#00142B] hover:text-[#FBAF43] active:bg-gray-50 hover:bg-gray-50'
              }`}
            >
              <span className="relative z-10">{linkNames[i]}</span>
              {isActive(href) && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FBAF43] to-[#FFD700] rounded-r-full"></div>
              )}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FBAF43] to-[#FFD700] rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
            </Link>
          ))}
          
          {/* Login Button in Mobile Menu */}
          <Link
            href="/uzasempower/login"
            onClick={() => setShowMobileMenu(false)}
            className="mt-2 group relative px-5 py-3.5 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 transform active:scale-95 shadow-lg bg-[#FBAF43] hover:bg-[#00142B] text-white flex items-center justify-center space-x-2 overflow-hidden touch-manipulation min-h-[48px]"
          >
            <span className="relative z-10">Login</span>
            <div className="relative z-10 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-white/20">
              <LogIn className="w-3 h-3 text-[#FBAF43] group-hover:text-[#00142B] transition-colors duration-300" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}
