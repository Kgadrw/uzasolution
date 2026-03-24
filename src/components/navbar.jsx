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
  const [showLogisticsModal, setShowLogisticsModal] = useState(false)
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

  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        setShowLogisticsModal(false)
      }
    }

    document.addEventListener('keydown', handleEscClose)
    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [])

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
          <button
            type="button"
            onClick={() => setShowLogisticsModal(true)}
            className="px-3 py-1.5 rounded-full font-medium text-sm transition-all duration-300 bg-[#FBAF43] hover:bg-[#e59e3b] text-white flex items-center space-x-2 hover:scale-105 hover:shadow-lg animate-pulse hover:animate-none group"
          >
            <span>UZA Logistics</span>
            <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
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
            <button
              type="button"
              onClick={() => {
                setShowMobileMenu(false)
                setShowLogisticsModal(true)
              }}
              className="mt-2 px-4 py-3 font-medium text-sm transition-all duration-300 bg-[#FBAF43] hover:bg-[#e59e3b] text-white flex items-center justify-center space-x-2 rounded-full hover:scale-105 hover:shadow-lg group"
            >
              <span>UZA Logistics</span>
              <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      )}

      {showLogisticsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setShowLogisticsModal(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-semibold text-[#00142B]">Join UZA Logistics</h2>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setShowLogisticsModal(false)}
                className="rounded-full p-2 text-[#00142B] transition-colors hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-700">
              Choose your role to continue. UZA Logistics helps your team communicate around shipments:
              clients submit and track shipment requests, while warehouse teams receive requests, update
              status, and coordinate fulfillment in real time.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a
                href="https://logistics.uzasolutions.com/client"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-200 p-4 text-left transition-all hover:border-[#FBAF43] hover:bg-[#fff8ed]"
              >
                <p className="text-sm font-semibold uppercase text-[#00142B]">Client</p>
                <p className="mt-1 text-xs text-gray-600">
                  Create shipment requests, follow progress, and receive updates.
                </p>
              </a>

              <a
                href="https://logistics.uzasolutions.com/warehouse/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-200 p-4 text-left transition-all hover:border-[#FBAF43] hover:bg-[#fff8ed]"
              >
                <p className="text-sm font-semibold uppercase text-[#00142B]">Warehouse</p>
                <p className="mt-1 text-xs text-gray-600">
                  Manage inbound requests, process shipments, and update delivery stages.
                </p>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
