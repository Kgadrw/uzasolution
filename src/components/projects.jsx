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
        desc: 'Direct access to raw materials, semi-finished, and finished products from China, Turkey, India, and Europe at manufacturer prices.',
      },
      {
        icon: <Repeat className="w-6 h-6" />,
        title: 'Intra-Africa Trade',
        desc: 'Enables African manufacturers to trade seamlessly across the continent, boosting local economies.',
      },
    ],
    quote:
      '“UZA Bulk slashes sourcing costs by 40% and cuts lead times by partnering with Maersk for streamlined shipping. Rwandan coffee exporters, Ugandan textile makers, and Nigerian retailers all benefit from one unified platform.”',
    buttonText: 'Visit the Website',
    buttonLink: 'https://uzabulk.com',
    themeColor: '#FBAF43',
  },
  {
    backgroundImage: '/logistics.jpg',
    title: 'UZA LOGISTICS',
    subtitle: 'End-to-End Trade Enabler',
    description:
      'Integrated logistics solutions powered by Maersk, handling shipping, warehousing, and last-mile delivery across Africa.',
    offerings: [
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Door-to-Door Shipping',
        desc: 'Air, sea, and land freight with real-time tracking.',
      },
      {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: 'Customs Clearance',
        desc: 'Dedicated support for cross-border trade.',
      },
      {
        icon: <Repeat className="w-6 h-6" />,
        title: 'Cost Efficiency',
        desc: 'Bulk discounts negotiated through Maersk partnership.',
      },
    ],
    quote:
      '“A Kampala-based electronics importer reduced delivery times from 60 to 18 days using UZA Logistics.”',
    buttonText: 'Start Shipping',
    buttonLink: 'https://uzalogistics.com',
    themeColor: '#FBAF43',
  },
  {
    backgroundImage: '/mall.jpg',
    title: 'UZA MALL',
    subtitle: 'Africa’s Consumer Marketplace',
    description:
      'A B2C e-commerce platform offering retail products with door-to-door delivery, bridging global brands to African consumers.',
    offerings: [
      {
        icon: <Globe className="w-6 h-6" />,
        title: 'Local & International Sellers',
        desc: 'From Rwandan handicrafts to Chinese electronics.',
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Affordable Logistics',
        desc: 'Leveraging UZA Logistics’ network for cost-effective shipping.',
      },
      {
        icon: <Repeat className="w-6 h-6" />,
        title: 'Mobile-First Design',
        desc: 'Designed for Africa’s smartphone-driven markets.',
      },
    ],
    quote:
      '“Imagine ‘Amazon for Africa’—where a farmer in Kenya buys farming tools, and a student in Lagos orders textbooks, all with one-click payments.”',
    buttonText: 'Start Shopping',
    buttonLink: 'https://uzamall.com',
    themeColor: '#FBAF43',
  },
  {
    backgroundImage: '/cloud.jpg',
    title: 'UZA CLOUD',
    subtitle: 'Scale with Smart Tech',
    description:
      'A cloud services platform in partnership with Alibaba Cloud, offering data storage, SaaS tools, and hybrid cloud services for African SMEs.',
    offerings: [
      {
        icon: <Globe className="w-6 h-6" />,
        title: 'Data Storage',
        desc: 'Secure, scalable, and affordable storage solutions.',
      },
      {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: 'SaaS Tools',
        desc: 'Inventory management, ERP, and AI-driven analytics.',
      },
      {
        icon: <Repeat className="w-6 h-6" />,
        title: 'Hybrid Cloud',
        desc: 'Tailored solutions for African SMEs transitioning to digital.',
      },
    ],
    quote:
      '“UZA Cloud brings enterprise-grade tech to small businesses—like a Lagos fashion startup using our tools to predict inventory demand.”',
    buttonText: 'Learn More',
    buttonLink: 'https://uzacloud.com',
    themeColor: '#FBAF43',
  },
]

export default function UzabulkSlider() {
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
    <div id="projects" className="overflow-hidden relative h-screen w-full">
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
                {slide.offerings.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm sm:text-base font-[Montserrat]">
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
