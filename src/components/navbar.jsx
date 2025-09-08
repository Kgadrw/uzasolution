'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navbar({ initialSolid = false }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(initialSolid)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)
      if (currentScrollY > lastScrollY && currentScrollY > 100) setShowNavbar(false)
      else setShowNavbar(true)
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${
        scrolled ? 'bg-[#213348] text-white shadow-md' : 'bg-transparent text-white'
      } ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={100} height={50} className="object-contain" />
        </Link>

        <div className="hidden md:flex space-x-6 text-sm">
          <Link href="/" className={`hover:text-[#FBAF43] ${isActive('/') ? 'text-[#FBAF43] font-semibold' : ''}`}>Home</Link>
          <Link href="/about" className={`hover:text-[#FBAF43] ${isActive('/about') ? 'text-[#FBAF43] font-semibold' : ''}`}>About</Link>
          <Link href="/portfolio" className={`hover:text-[#FBAF43] ${isActive('/portfolio') ? 'text-[#FBAF43] font-semibold' : ''}`}>Portfolio</Link>
          <Link href="/news" className={`hover:text-[#FBAF43] ${isActive('/news') ? 'text-[#FBAF43] font-semibold' : ''}`}>News</Link>
          <Link href="/contact" className={`hover:text-[#FBAF43] ${isActive('/contact') ? 'text-[#FBAF43] font-semibold' : ''}`}>Contact</Link>
        </div>

        <button onClick={() => setShowMobileMenu(!showMobileMenu)} aria-label="Toggle Menu" className="md:hidden">
          {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {showMobileMenu && (
        <div className={`md:hidden px-6 pb-4 space-y-3 ${scrolled ? 'bg-[#213348]' : 'bg-[#00142B]/90'}`}>
          <Link href="/" className={`block hover:text-[#FBAF43] ${isActive('/') ? 'text-[#FBAF43] font-semibold' : ''}`}>Home</Link>
          <Link href="/about" className={`block hover:text-[#FBAF43] ${isActive('/about') ? 'text-[#FBAF43] font-semibold' : ''}`}>About</Link>
          <Link href="/portfolio" className={`block hover:text-[#FBAF43] ${isActive('/portfolio') ? 'text-[#FBAF43] font-semibold' : ''}`}>Portfolio</Link>
          <Link href="/news" className={`block hover:text-[#FBAF43] ${isActive('/news') ? 'text-[#FBAF43] font-semibold' : ''}`}>News</Link>
          <Link href="/contact" className={`block hover:text-[#FBAF43] ${isActive('/contact') ? 'text-[#FBAF43] font-semibold' : ''}`}>Contact</Link>
        </div>
      )}
    </nav>
  )
}


