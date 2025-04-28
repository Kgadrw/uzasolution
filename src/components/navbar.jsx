'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isFixed, setIsFixed] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight * 0.8

      setIsFixed(currentScrollY > heroHeight) // Fix navbar after hero section
      setShowNav(currentScrollY < lastScrollY) // Show navbar when scrolling up
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navBaseClasses =
    'top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center font-[Roboto] text-white transition-all duration-300 fixed'

  const navPositionClass = isFixed
    ? `fixed ${showNav ? 'translate-y-0' : '-translate-y-full'} bg-[#213348]` // Fixed navbar with scroll effect
    : 'absolute bg-[#213348]'

  return (
    <nav className={`${navBaseClasses} ${navPositionClass}`}>
      <div className="text-xl font-bold">
        <Link href="/">
          <img src="/logo.png" alt="Logo" className="h-10 w-20 md:h-12 md:w-24" />
        </Link>
      </div>

      <div className="hidden md:flex space-x-32 items-center text-lg font-semibold">
        <Link className="hover:text-[#FBAF43]" href="/marketplace">About us</Link>
        <Link className="hover:text-[#FBAF43]" href="/how">How It Works</Link>
        <Link className="hover:text-[#FBAF43]" href="/team">Our Team</Link>
        <Link className="hover:text-[#FBAF43]" href="/tools">Tools</Link>
      </div>

      <div>
        <Link href="https://www.uzabulk.com/auth/login">
          <button className="bg-[#FBAF43] text-white px-4 py-2 rounded-md font-medium text-sm md:text-base">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  )
}
