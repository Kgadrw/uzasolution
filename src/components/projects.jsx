'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Globe, Repeat, TrendingUp, ShieldCheck } from 'lucide-react'
import Client, { urlFor } from '../sanityClient'

const iconMap = {
  Globe: <Globe className="w-6 h-6" />,
  Repeat: <Repeat className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
}

export default function UzabulkSlider() {
  const [slides, setSlides] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [animateContent, setAnimateContent] = useState(true)
  const [startTouch, setStartTouch] = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Client.fetch(
          `*[_type == "uzabulkSlider"][0].slides[]{
            title,
            subtitle,
            description,
            quote,
            buttonText,
            buttonLink,
            themeColor,
            backgroundImage,
            offerings[] {
              icon,
              title,
              description
            }
          }`
        )
        setSlides(data || [])
      } catch (err) {
        console.error('Sanity fetch error:', err)
        setSlides([]) // fallback
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (slides.length === 0) return

    const interval = setInterval(() => {
      setAnimateContent(false)
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length)
        setAnimateContent(true)
      }, 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides])

  const handleTouchStart = (e) => setStartTouch(e.touches[0].clientX)

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX
    const diff = startTouch - touchEnd
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % slides.length)
      } else {
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
      }
    }
  }

  if (slides.length === 0) return <p className="text-center mt-10">Loading...</p>

  return (
    <div id="projects" className="overflow-hidden relative h-screen w-full">
      <div
        ref={sliderRef}
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, idx) => (
          <section
            key={idx}
            className="min-w-full relative bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-12 text-white"
            style={{
              backgroundImage: `url(${urlFor(slide.backgroundImage).url()})`,
            }}
          >
            <div className="absolute inset-0 bg-[#213348] opacity-90 z-0" />
            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              <div
                className={`transition-opacity duration-500 ${
                  idx === activeIndex && animateContent ? 'animate-fade-slide' : 'opacity-0'
                }`}
              >
                <h1
                  className="text-2xl sm:text-3xl font-extrabold font-[Montserrat] mb-2"
                  style={{ color: slide.themeColor }}
                >
                  {slide.title}
                </h1>
                <p
                  className="text-md sm:text-lg font-semibold font-[Montserrat] mb-3"
                  style={{ color: slide.themeColor }}
                >
                  {slide.subtitle}
                </p>
                <p className="text-sm sm:text-base font-[Montserrat]">{slide.description}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 text-left justify-center">
                {slide.offerings?.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm sm:text-base font-[Montserrat]"
                  >
                    {iconMap[item.icon] || null}
                    <div>
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <p
                  className="italic font-semibold text-sm sm:text-base leading-relaxed mb-4 font-[Monospace]"
                  style={{ color: slide.themeColor }}
                >
                  {slide.quote}
                </p>
                <Link href={slide.buttonLink} target="_blank">
                  <button
                    className="px-5 py-2 text-sm sm:text-base rounded-full font-[Montserrat] shadow-lg text-white hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: slide.themeColor }}
                  >
                    {slide.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setAnimateContent(false)
              setTimeout(() => {
                setActiveIndex(idx)
                setAnimateContent(true)
              }, 300)
            }}
            className={`w-3.5 h-3.5 rounded-full border border-white ${
              idx === activeIndex ? 'bg-white' : 'bg-transparent'
            } transition-all`}
          />
        ))}
      </div>
    </div>
  )
}
