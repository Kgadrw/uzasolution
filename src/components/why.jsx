'use client'

import React, { useState } from 'react'
import { Handshake, Globe, TrendingUp, Zap } from 'lucide-react'

export default function WhyChooseUZA() {
  const features = [
    {
      icon: <Handshake className="w-7 h-7 text-[#FBAF43]" />,
      title: 'Trusted Global Partnerships',
    },
    {
      icon: <Globe className="w-7 h-7 text-[#FBAF43]" />,
      title: 'End-to-End Solutions',
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-[#FBAF43]" />,
      title: 'Impact-Driven',
    },
    {
      icon: <Zap className="w-7 h-7 text-[#FBAF43]" />,
      title: 'Innovation in Africa',
    },
  ]

  const [play, setPlay] = useState(false)

  const handlePlay = () => {
    if (!play) setPlay(true)
  }

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: YouTube Video */}
        <div className="w-full flex justify-center items-stretch">
          <div
            className="relative w-full max-w-2xl min-h-[450px] rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white/40 backdrop-blur border border-white/30"
            onClick={handlePlay}
          >
            <iframe
            className="w-full h-full rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/xVJa3Lypjww"
            title="UZA Solutions Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          </div>
        </div>

        {/* Right: Content */}
        <div className="space-y-6">
          <div className="flex items-center">
            <span className="w-1 h-5 bg-[#FBAF43] rounded mr-3"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FBAF43]">
              Why Choose UZA Solutions?
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent leading-tight">
            Transforming Africa's Trade with{' '}
            <span className="text-[#FBAF43]">Seamless, Tech-Driven Solutions</span>
          </h2>

          <p className="text-base md:text-lg text-gray-700 max-w-xl leading-relaxed">
            We are revolutionizing Africa’s trade ecosystem with seamless, tech-driven solutions that
            empower businesses and travelers to reach global markets.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white/70 backdrop-blur rounded-xl p-3 border border-gray-200/50">
                <div className="bg-[#FBAF43]/20 rounded-lg p-2 flex items-center justify-center">
                  {feature.icon}
                </div>
                <span className="font-semibold text-gray-900 text-base md:text-lg">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
