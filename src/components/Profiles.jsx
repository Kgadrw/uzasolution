'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Globe, Repeat, TrendingUp, ShieldCheck } from 'lucide-react'

const slides = [
  {
    backgroundImage: '/truck.jpg',
    title: 'UZA BULK',
    subtitle: 'Your Global Sourcing Partner',
    description:
      'A B2B wholesale platform connecting African businesses to 10,000+ vetted manufacturers — powered by exclusive Alibaba partnerships.',
    offerings: [
      {
        icon: <Globe className="w-6 h-6" />,
        title: 'Global Sourcing',
        desc: 'Raw to finished goods from China, Turkey, India & Europe — all at factory rates.',
      },
      {
        icon: <Repeat className="w-6 h-6" />,
        title: 'Intra-Africa Trade',
        desc: 'Empowers local manufacturers to trade seamlessly across the continent.',
      },
    ],
    quote:
      '“Cut sourcing costs by 40% and reduce lead times — with Maersk-backed logistics. One platform serving Rwandan coffee, Ugandan textiles, and Nigerian retail.”',
    buttonText: 'Visit the Website',
    buttonLink: 'https://your-website.com',
    themeColor: '#FBAF43',
  },
  {
    backgroundImage: '/mall.jpg',
    title: 'TRADE MADE EASY',
    subtitle: 'Effortless B2B Solutions',
    description:
      'From procurement to delivery — we simplify your cross-border operations with cutting-edge tools and local support.',
    offerings: [
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Analytics Driven',
        desc: 'Track all orders, suppliers, and costs from a unified dashboard.',
      },
      {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: 'End-to-End Support',
        desc: 'We manage everything — supplier vetting, shipping, and quality checks.',
      },
    ],
    quote:
      '“All-in-one trading solution designed to scale with your business. Trusted by over 500 SMEs in East Africa.”',
    buttonText: 'Start Trading',
    buttonLink: 'https://your-website.com/start',
    themeColor: '#00CC99',
  },
]

export default function UzabulkSlider(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animateContent, setAnimateContent] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateContent(false)
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length)
        setAnimateContent(true)
      }, 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-hidden relative h-screen w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <section
            key={idx}
            className="min-w-full relative bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-12 text-white"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-[#213348] opacity-90 z-0" />
            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              <div
                className={`transition-opacity duration-500 ${
                  idx === activeIndex && animateContent ? 'animate-fade-slide' : 'opacity-0'
                }`}
              >
                <h1
                  className="text-2xl sm:text-3xl font-extrabold font-[Monospace] mb-2"
                  style={{ color: slide.themeColor }}
                >
                  {slide.title}
                </h1>
                <p
                  className="text-md sm:text-lg font-semibold font-[Monospace] mb-3"
                  style={{ color: slide.themeColor }}
                >
                  {slide.subtitle}
                </p>
                <p className="text-sm sm:text-base font-[Monospace]">{slide.description}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 text-left justify-center">
                {slide.offerings.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm sm:text-base font-[Monospace]">
                    {item.icon}
                    <div>
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p>{item.desc}</p>
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
                    className="px-5 py-2 text-sm sm:text-base rounded-full font-[Monospace] shadow-lg text-white hover:scale-105 transition-transform duration-300"
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

      {/* Pagination Dots */}
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
