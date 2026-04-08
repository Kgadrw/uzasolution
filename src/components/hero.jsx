'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from './navbar'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(!!mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  return reduced
}

function useTypingText(fullText, { speedMs = 28, startDelayMs = 0 } = {}) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setIdx(fullText.length)
      return
    }

    setIdx(0)
    let timeoutId
    let intervalId

    timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setIdx((prev) => {
          if (prev >= fullText.length) {
            window.clearInterval(intervalId)
            return prev
          }
          return prev + 1
        })
      }, speedMs)
    }, startDelayMs)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [fullText, prefersReducedMotion, speedMs, startDelayMs])

  return fullText.slice(0, idx)
}

export default function HeroSection() {
  const heroText = {
    title: "Africa's Gateway to Global Trade",
    description:
      "We empower African businesses with tech-driven solutions that simplify sourcing, logistics, and scaling globally.",
    cta: "Get Started",
  }

  const titleSuffix = useMemo(() => heroText.title.replace(/^Africa/, ''), [heroText.title])
  const typedTitleSuffix = useTypingText(titleSuffix, { speedMs: 32, startDelayMs: 200 })
  const typedDescription = useTypingText(heroText.description, { speedMs: 14, startDelayMs: 650 })

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
              <span className="text-[#FBAF43]">Africa</span>
              <span>{typedTitleSuffix}</span>
              <span className="typing-cursor" aria-hidden="true">
                |
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
              <span>{typedDescription}</span>
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

      <style jsx>{`
        .typing-cursor {
          display: inline-block;
          margin-left: 2px;
          animation: cursorBlink 1s steps(2, start) infinite;
          opacity: 0.9;
        }

        @keyframes cursorBlink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .typing-cursor {
            display: none;
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
