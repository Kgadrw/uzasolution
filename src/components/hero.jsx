'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [isFixed, setIsFixed] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight * 0.8

      setIsFixed(currentScrollY > heroHeight)

      if (currentScrollY < lastScrollY) {
        setShowNav(true)
      } else {
        setShowNav(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navBaseClasses =
    'top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center font-[Monospace] text-white transition-all duration-300'

  const navPositionClass = isFixed
    ? `fixed ${showNav ? 'translate-y-0' : '-translate-y-full'} bg-[#213348]`
    : 'absolute bg-transparent'

  return (
    <section className="relative min-h-[80vh] flex flex-col md:flex-row w-full">
      {/* Navbar */}
      <nav className={`${navBaseClasses} ${navPositionClass}`}>
        <div className="text-xl font-bold">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-10 w-20 md:h-12 md:w-24" />
          </Link>
        </div>

        <div className="hidden md:flex space-x-24 items-center text-lg font-semibold">
          <Link className="hover:text-[#FBAF43]" href="/marketplace">Marketplace</Link>
          <Link className="hover:text-[#FBAF43]" href="/how-it-works">How It Works</Link>
          <Link className="hover:text-[#FBAF43]" href="/solutions">Solutions</Link>
          <Link className="hover:text-[#FBAF43]" href="/tools">Tools</Link>
        </div>

        <div>
          <Link href="/signin">
            <button className="bg-[#FBAF43] text-white px-4 py-2 rounded-md font-medium text-sm md:text-base">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Left Side */}
      <div
        className="w-full md:w-1/2 flex items-center px-6 md:px-8 py-18 text-white bg-[#213348]"
        style={{ minHeight: '100vh' }}
      >
        <div className="px-16 py-24 md:p-8 rounded-lg max-w-xl">
          <h1 className="text-3xl md:text-5xl font-[Monospace] font-bold mb-10 md:mb-24">
            Empower Your Business with Smart Tools
          </h1>
          <p className="text-base md:text-xl mb-10 md:mb-16 font-[Monospace]">
            Discover how our platform helps you manage, grow, and optimize your digital workflow.
          </p>
          <Link href="/get-started">
            <button className="bg-[#FBAF43] text-white px-5 md:px-6 py-2.5 md:py-3 font-[Monospace] rounded-md font-medium text-base md:text-lg">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div
        className="hidden md:block w-full md:w-1/2"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      ></div>
    </section>
  )
}
