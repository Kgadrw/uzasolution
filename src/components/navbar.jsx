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
  const supportMessage = encodeURIComponent(
    'Hello UZA Support, I need help with the UZA platform. Please assist me.'
  )
  const whatsappSupportUrl = `https://wa.me/250788371081?text=${supportMessage}`

  return (
    <nav
      className={`${
        overlay ? 'absolute top-2 sm:top-4 left-0 right-0' : 'relative mt-2 sm:mt-4'
      } ${pathname === '/about' ? 'bg-[#F8FAFC]' : ''} z-30 w-full`}
    >
      <div
        className={`mx-auto w-[96%] sm:w-[95%] lg:w-[92%] xl:w-[90%] flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-2 transition-all duration-300 rounded-full overflow-hidden border border-gray-200 ${
          scrolled
            ? 'bg-white shadow-sm text-[#00142B]'
            : 'bg-white text-[#00142B]'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center -ml-2 sm:-ml-3 md:-ml-4 lg:-ml-6 xl:-ml-8">
          <Image 
            src="/uza.png" 
            alt="UZA Solutions Logo" 
            width={120} 
            height={60} 
            className="object-contain w-20 h-10 md:w-24 md:h-12 lg:w-28 lg:h-14" 
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

      <div className="sticky top-[calc(100vh-5rem)] z-40 flex justify-end pr-5">
        <a
          href={whatsappSupportUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact support on WhatsApp"
          title="Chat with support on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform duration-300 hover:scale-110 hover:bg-[#1ebe5d]"
        >
          <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
            <path d="M19.11 17.21c-.27-.14-1.57-.77-1.81-.86-.24-.09-.42-.14-.6.14-.18.27-.69.86-.85 1.03-.16.18-.31.2-.58.07-.27-.14-1.12-.41-2.14-1.32-.79-.7-1.33-1.57-1.49-1.84-.16-.27-.02-.42.12-.56.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.6-1.45-.83-1.98-.22-.53-.44-.46-.6-.47l-.51-.01c-.18 0-.47.07-.72.34s-.94.92-.94 2.24.96 2.59 1.09 2.77c.14.18 1.9 2.91 4.61 4.08.64.28 1.14.44 1.53.56.64.2 1.22.17 1.68.1.51-.08 1.57-.64 1.8-1.25.22-.61.22-1.13.16-1.24-.07-.11-.24-.18-.51-.31z" />
            <path d="M16.03 3.2c-7.03 0-12.74 5.72-12.74 12.75 0 2.24.58 4.42 1.69 6.34L3.2 28.8l6.66-1.75c1.84 1 3.91 1.53 6.17 1.53h.01c7.03 0 12.75-5.72 12.75-12.75 0-3.41-1.33-6.62-3.74-9.03-2.41-2.41-5.62-3.74-9.03-3.74zm0 23.23h-.01c-1.92 0-3.8-.51-5.44-1.47l-.39-.23-3.95 1.04 1.05-3.85-.25-.4a10.54 10.54 0 01-1.62-5.62c0-5.86 4.76-10.63 10.62-10.63 2.83 0 5.49 1.1 7.49 3.1a10.52 10.52 0 013.11 7.5c0 5.86-4.77 10.63-10.62 10.63z" />
          </svg>
        </a>
      </div>
    </nav>
  )
}
