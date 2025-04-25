'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Globe, Repeat, TrendingUp, ShieldCheck } from 'lucide-react';

const slides = [
  {
    backgroundImage: '/truck.jpg',
    title: 'UZA BULK',
    subtitle: 'Your Global Sourcing Partner',
    description:
      'A B2B wholesale platform connecting African businesses to 10,000+ vetted manufacturers — powered by exclusive Alibaba partnerships.',
    offerings: [
      {
        icon: <Globe className="w-7 h-7 sm:w-8 sm:h-8 mt-1" />,
        title: 'Global Sourcing',
        desc: 'Raw to finished goods from China, Turkey, India & Europe — all at factory rates.',
      },
      {
        icon: <Repeat className="w-7 h-7 sm:w-8 sm:h-8 mt-1" />,
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
        icon: <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 mt-1" />,
        title: 'Analytics Driven',
        desc: 'Track all orders, suppliers, and costs from a unified dashboard.',
      },
      {
        icon: <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 mt-1" />,
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
];

export default function UzabulkSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animateContent, setAnimateContent] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateContent(false); // reset animation
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
        setAnimateContent(true);
      }, 300); // delay before switching slides
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden relative h-[100vh]">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <section
            key={idx}
            className="min-w-full relative bg-cover bg-center bg-no-repeat py-24 px-4 sm:px-6 lg:px-8 text-white"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-[#213348] opacity-90 z-0" />
            <div className="relative z-10 max-w-6xl mx-auto">
              <div
                className={`mb-12 font-[Monospace] transition-opacity duration-500 ${
                  idx === activeIndex && animateContent ? 'animate-fade-slide' : 'opacity-0'
                }`}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4" style={{ color: slide.themeColor }}>
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl font-medium mb-4" style={{ color: slide.themeColor }}>
                  {slide.subtitle}
                </p>
                <p className="text-base sm:text-lg md:text-xl max-w-3xl">{slide.description}</p>
              </div>

              <div className="grid gap-10 sm:grid-cols-2 text-left">
                {slide.offerings.map((item, index) => (
                  <div className="flex items-start gap-4" key={index}>
                    {item.icon}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-sm sm:text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <p
                  className={`italic font-semibold text-base sm:text-lg leading-relaxed max-w-3xl sm:max-w-4xl mx-auto mb-6`}
                  style={{ color: slide.themeColor }}
                >
                  {slide.quote}
                </p>
                <Link href={slide.buttonLink} target="_blank">
                  <button
                    className="mt-4 px-6 sm:px-8 py-3 text-sm sm:text-lg text-white font-semibold font-[Monospace] rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
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
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
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
            className={`w-3 h-3 rounded-full ${idx === activeIndex ? 'bg-white' : 'bg-gray-400'} transition-all`}
          />
        ))}
      </div>
    </div>
  );
}
