'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
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

  const links = ['/', '/about', '/portfolio', '/campaigns', '/news', '/contact']
  const linkNames = ['Home', 'About', 'Portfolio', 'Campaigns', 'News', 'Contact']

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-4xl">
      <div
        className={`flex justify-between items-center px-12 rounded-full shadow-lg transition-all duration-300 ${
          scrolled
            ? 'bg-[#00142B] py-2 text-white'
            : 'bg-white/4 backdrop-blur-sm py-3 text-white'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center mr-12">
          <Image src="/logo.png" alt="Logo" width={100} height={50} className="object-contain" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 text-sm">
          {links.map((href, i) => (
            <Link
              key={i}
              href={href}
              className={`hover:text-[#FBAF43] font-semibold ${
                isActive(href) ? 'text-[#FBAF43]' : 'text-white'
              }`}
            >
              {linkNames[i]}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          ref={hamburgerRef}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle Menu"
          className="md:hidden p-2 -mr-2 rounded-lg hover:bg-white/10 transition-colors duration-200 touch-manipulation"
        >
          <div className="relative w-6 h-6">
            <Menu 
              className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                showMobileMenu ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
              } ${scrolled ? 'text-white' : 'text-white'}`} 
            />
            <X 
              className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                showMobileMenu ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
              } ${scrolled ? 'text-white' : 'text-white'}`} 
            />
          </div>
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden absolute top-full left-0 right-0 mt-2 mx-4 transition-all duration-300 ease-in-out transform ${
          showMobileMenu 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div
          className={`px-6 py-4 rounded-2xl flex flex-col space-y-1 shadow-xl backdrop-blur-md border border-white/20 ${
            scrolled ? 'bg-[#00142B]/95 text-white' : 'bg-white/20 text-white'
          }`}
        >
          {links.map((href, i) => (
            <Link
              key={i}
              href={href}
              onClick={() => setShowMobileMenu(false)}
              className={`block px-4 py-3 rounded-xl hover:bg-white/10 hover:text-[#FBAF43] font-semibold transition-all duration-200 touch-manipulation ${
                isActive(href) ? 'text-[#FBAF43] bg-white/5' : 'text-white'
              }`}
            >
              {linkNames[i]}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
