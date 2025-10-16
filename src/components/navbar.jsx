'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Mail } from 'lucide-react'
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

  const links = ['/', '/about', '/portfolio', '/uzasempower', '/news']
  const linkNames = ['Home', 'About', 'Portfolio', 'UZA Empower', 'News']

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 w-full">
      <div
        className={`flex justify-between items-center px-32 py-3 shadow-xl border-b border-gray-100 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md text-[#00142B]'
            : 'bg-white/95 backdrop-blur-md text-[#00142B]'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
          <Image src="/uza.png" alt="UZA Solutions Logo" width={120} height={60} className="object-contain filter drop-shadow-sm" />
        </Link>

        {/* Desktop Nav Links - Centered */}
        <div className="hidden md:flex space-x-8">
          {links.map((href, i) => (
            <Link
              key={i}
              href={href}
              className={`relative font-semibold text-sm tracking-wider uppercase transition-all duration-300 group font-quicksand ${
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

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="group relative px-4 py-1.5 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 transform hover:scale-105 shadow-lg bg-[#FBAF43] hover:bg-[#00142B] text-white flex items-center justify-center space-x-2 overflow-hidden"
          >
            {/* Toggle switch effect background */}
            <div className="absolute inset-0 bg-[#FBAF43] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
            <span className="relative z-10 group-hover:text-[#00142B] transition-colors duration-300">Contact Us</span>
            {/* Contact icon in circular badge */}
            <div className="relative z-10 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-[#FBAF43] group-hover:border-[#DDA63A] transition-colors duration-300">
              <Mail className="w-3 h-3 text-[#FBAF43] group-hover:text-[#00142B] transition-colors duration-300" />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          ref={hamburgerRef}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle Menu"
          className="md:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 touch-manipulation group"
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
        className={`md:hidden absolute top-full left-6 right-6 mt-3 transition-all duration-500 ease-out transform ${
          showMobileMenu 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-6 scale-95 pointer-events-none'
        }`}
      >
        <div
          className={`px-6 py-5 rounded-2xl flex flex-col space-y-2 shadow-2xl backdrop-blur-xl border border-gray-200/50 bg-white/95 ${
            scrolled ? 'text-[#00142B]' : 'text-[#00142B]'
          }`}
        >
          {links.map((href, i) => (
            <Link
              key={i}
              href={href}
              onClick={() => setShowMobileMenu(false)}
              className={`block px-5 py-4 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 touch-manipulation group relative font-quicksand ${
                isActive(href) 
                  ? 'text-[#FBAF43] bg-gradient-to-r from-[#FBAF43]/10 to-[#FFD700]/10 font-bold' 
                  : 'text-[#00142B] hover:text-[#FBAF43] hover:bg-gray-50'
              }`}
            >
              <span className="relative z-10">{linkNames[i]}</span>
              {isActive(href) && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FBAF43] to-[#FFD700] rounded-r-full"></div>
              )}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FBAF43] to-[#FFD700] rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
