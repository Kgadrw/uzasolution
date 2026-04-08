'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, LogIn } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navbar({ initialSolid = false, overlay = false }) {
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

  const links = ['/', '/about', '/uzasempower']
  const linkNames = ['Home', 'About', 'UZA Empower']

  return (
    <nav
      className={`${
        overlay ? 'absolute top-2 sm:top-4 left-0 right-0' : 'relative mt-2 sm:mt-4'
      } ${pathname === '/about' ? 'bg-[#F8FAFC]' : ''} z-30 w-full`}
    >
      <div className="mx-auto w-[96%] sm:w-[95%] lg:w-[92%] xl:w-[90%] rounded-full bg-gradient-to-r from-[#00142B] via-[#0B2A5A] to-[#00142B] p-[2px] shadow-sm">
        <div
          className={`flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-2 transition-all duration-300 rounded-full overflow-hidden ${
            scrolled
              ? 'bg-white text-[#00142B] shadow-sm'
              : 'bg-white text-[#00142B]'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center -ml-3 sm:-ml-4 md:-ml-5 lg:-ml-7 xl:-ml-10">
            <Image 
              src="/uza.png" 
              alt="UZA Solutions Logo" 
              width={120} 
              height={60} 
              className="object-contain w-16 h-8 md:w-20 md:h-10 lg:w-24 lg:h-12" 
            />
          </Link>

          {/* Desktop Nav Links - Centered */}
          <div className="hidden lg:flex space-x-8">
            {links.map((href, i) => (
              <Link
                key={i}
                href={href}
                className={`font-medium text-sm uppercase transition-colors duration-200 ${
                  isActive(href) 
                    ? 'text-[#FBAF43]' 
                    : 'text-[#00142B] hover:text-[#FBAF43]'
                }`}
              >
                {linkNames[i]}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <a
              href="https://logistics.uzasolutions.com/client/login"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full font-medium text-sm transition-all duration-300 bg-[#FBAF43] hover:bg-[#e59e3b] text-white flex items-center space-x-2 hover:scale-105 hover:shadow-lg animate-pulse hover:animate-none group"
            >
              <span>Login</span>
              <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            ref={hamburgerRef}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle Menu"
            aria-expanded={showMobileMenu}
            className="lg:hidden p-2 hover:bg-gray-100 transition-colors"
          >
            {showMobileMenu ? (
              <X className="w-6 h-6 text-[#00142B]" />
            ) : (
              <Menu className="w-6 h-6 text-[#00142B]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {showMobileMenu && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-white shadow-lg border-t"
        >
          <div className="px-4 py-4 flex flex-col space-y-2">
            {links.map((href, i) => (
              <Link
                key={i}
                href={href}
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-3 font-medium text-sm uppercase transition-colors ${
                  isActive(href) 
                    ? 'text-[#FBAF43]' 
                    : 'text-[#00142B] hover:text-[#FBAF43] hover:bg-gray-50'
                }`}
              >
                {linkNames[i]}
              </Link>
            ))}
            
            {/* Login Button in Mobile Menu */}
            <a
              href="https://logistics.uzasolutions.com/client/login"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowMobileMenu(false)}
              className="mt-2 px-4 py-3 font-medium text-sm transition-all duration-300 bg-[#FBAF43] hover:bg-[#e59e3b] text-white flex items-center justify-center space-x-2 rounded-full hover:scale-105 hover:shadow-lg group"
            >
              <span>Login</span>
              <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      )}

    </nav>
  )
}
