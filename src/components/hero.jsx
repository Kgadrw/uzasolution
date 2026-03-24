'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, LogIn } from 'lucide-react'
import Navbar from './navbar'

export default function HeroSection() {
  const [showLogisticsModal, setShowLogisticsModal] = useState(false)
  const heroText = {
    title: "Africa's Gateway to Global Trade",
    description:
      "We empower African businesses with tech-driven solutions that simplify sourcing, logistics, and scaling globally.",
    cta: "Get Started",
  }

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

  return (
    <section className="relative w-full font-sans bg-transparent">
      {/* Navbar Component */}
      <Navbar initialSolid={false} overlay />

      {/* Hero Section */}
      <div className="relative h-[480px] sm:h-[600px] md:h-[680px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image src="/hero2.jpg" alt="Hero" fill className="object-cover" priority />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00142B]/90 via-[#00142B]/70 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
          <div className="max-w-2xl text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              <span className="text-[#FBAF43]">Africa</span>'s Gateway to Global Trade
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
              {heroText.description}
            </p>
            <div className="mt-6 sm:mt-8">
              <Link href="https://www.uzabulk.com/auth/login">
                <button className="bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg text-sm md:text-base">
                  {heroText.cta}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-[96%] sm:w-[95%] lg:w-[92%] xl:w-[90%] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 -mt-8 relative z-20">
        <button
          type="button"
          onClick={() => setShowLogisticsModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-[#FBAF43]/40 bg-white px-5 py-3 text-sm font-semibold text-[#00142B] shadow-lg transition-all hover:-translate-y-0.5 hover:border-[#FBAF43] hover:bg-[#fff8ed]"
        >
          <span className="inline-flex items-center rounded-full bg-[#FBAF43] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
            NEW
          </span>
          <span>Join UZA Logistics as Client or Warehouse</span>
          <LogIn className="h-4 w-4" />
        </button>
      </div>

      {showLogisticsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-[2px]"
          onClick={() => setShowLogisticsModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 sm:p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-semibold text-[#00142B]">UZA Logistics</h2>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setShowLogisticsModal(false)}
                className="rounded-full p-2 text-[#00142B] transition-colors hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-700">Choose role</p>

            <div className="mt-5 grid gap-3">
              <a
                href="https://logistics.uzasolutions.com/client"
                className="rounded-xl border border-gray-200 p-4 text-center font-semibold uppercase text-[#00142B] transition-all hover:border-[#FBAF43] hover:bg-[#fff8ed]"
              >
                Client
              </a>

              <a
                href="https://logistics.uzasolutions.com/warehouse/"
                className="rounded-xl border border-gray-200 p-4 text-center font-semibold uppercase text-[#00142B] transition-all hover:border-[#FBAF43] hover:bg-[#fff8ed]"
              >
                Warehouse
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
