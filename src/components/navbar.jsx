'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navbar({ initialSolid = false }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(initialSolid)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const links = ['/', '/about', '/portfolio', '/news', '/contact']
  const linkNames = ['Home', 'About', 'Portfolio', 'News', 'Contact']

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
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle Menu"
          className="md:hidden"
        >
          {showMobileMenu ? (
            <X className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {showMobileMenu && (
        <div
          className={`md:hidden mt-2 px-6 py-4 rounded-full flex flex-col space-y-3 shadow-lg transition-all duration-300 ${
            scrolled ? 'bg-[#00142B] text-white' : 'bg-white/30 backdrop-blur-md text-white'
          }`}
        >
          {links.map((href, i) => (
            <Link
              key={i}
              href={href}
              className={`block hover:text-[#FBAF43] font-semibold ${
                isActive(href) ? 'text-[#FBAF43]' : 'text-white'
              }`}
            >
              {linkNames[i]}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
