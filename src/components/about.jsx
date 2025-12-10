'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Noise from './Noise'

export default function AboutUs() {
  return (
    <section id="about" className="py-20 px-4 md:px-16 lg:px-24 bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto">
        {/* UZA Platforms Section - Moved to Top */}
        <div className="mb-20">
          <div className="text-center mb-12">
            
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent leading-tight mb-4">
              Discover Our Tech-Driven Solutions
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              UZA Solutions streamlines trade with platforms for sourcing, logistics, and cloud services, enabling business growth in the digital age.
            </p>
          </div>

          {/* UZA Platforms imagery grid (with photos) - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'UZA Bulk', desc: 'Direct-from-factory sourcing for scale and reliability.', href: 'https://www.uzabulk.com/', img: '/1.jpg' },
              { title: 'UZA Mall', desc: 'Curated B2B catalog with transparent pricing.', href: '/comingsoon', img: '/3.jpg' },
              { title: 'UZA Logistics', desc: 'Ocean, air, and last-mile with live tracking.', href: '/comingsoon', img: '/2.jpg' },
            ].map((item) => (
              <motion.a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl overflow-hidden border border-white/20 block transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00142B]/90 via-[#00142B]/40 to-transparent" />
                  <div className="absolute left-0 right-0 bottom-0 p-6 text-white">
                    <span className="inline-block text-[10px] uppercase tracking-widest bg-[#FBAF43] text-[#00142B] rounded-full px-3 py-1 mb-3 font-bold">
                      Platform
                    </span>
                    <h5 className="text-xl font-bold mb-2">{item.title}</h5>
                    <p className="text-sm text-gray-200 mb-4 leading-relaxed">{item.desc}</p>
                    <span className="inline-flex items-center gap-2 bg-white/20 hover:bg-[#FBAF43] hover:text-[#00142B] text-white font-semibold text-sm px-4 py-2 rounded-full transition-all duration-300 group-hover:translate-x-1">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="flex items-center mb-4">
              <span className="w-1 h-5 bg-[#FBAF43] rounded mr-3"></span>
              <p className="text-sm font-semibold text-[#FBAF43] uppercase tracking-wider">
                Our Solutions
              </p>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent leading-tight">
              Tech-Driven Platforms to Power Africa's Digital Trade Future
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              UZA Solutions streamlines trade with platforms for sourcing, logistics, and cloud services, enabling business growth in the digital age.
            </p>
            <Link
              href="https://www.uzabulk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              Explore
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Carded Solutions Grid (Homepage) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(0,_1fr)]">
          {/* Feature card */}
            <motion.div
            whileHover={{ y: -4 }}
            className="relative text-white rounded-2xl p-8 overflow-hidden md:col-span-2 md:row-span-2 border border-white/10"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image 
                src="/ai.jpg" 
                alt="AI Technology Background" 
                fill 
                className="object-cover opacity-30"
              />
              {/* Dark overlay for text readability - solid overlay without right gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0E2A44]/95 via-[#0E2A44]/95 to-[#1B3A54]/95"></div>
              {/* Noise effect */}
              <Noise
                patternSize={250}
                patternScaleX={1}
                patternScaleY={1}
                patternRefreshInterval={2}
                patternAlpha={15}
              />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <span className="inline-block text-[10px] uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4">
                Integrations & AI
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold leading-snug max-w-xl">
                Embrace AI to help you work smarter every day
              </h3>
              <p className="mt-3 text-sm md:text-base text-gray-200 max-w-lg">
                Automate sourcing workflows, QC docs, and shipment tracking inside our platforms.
              </p>
              <Link href="https://www.uzabulk.com/" className="mt-6 inline-flex items-center gap-2 bg-white text-[#213348] hover:bg-[#FBAF43] hover:text-[#213348] font-semibold px-5 py-3 rounded-full transition-colors w-max">
                Start now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Secure workspace */}
          <motion.div whileHover={{ y: -4 }} className="relative rounded-2xl p-6 border border-gray-200/50 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image 
                src="/7.jpg" 
                alt="Secure Workspace Background" 
                fill 
                className="object-cover opacity-20"
              />
              {/* Light overlay for text readability */}
              <div className="absolute inset-0 bg-white/90"></div>
              {/* Noise effect */}
              <Noise
                patternSize={250}
                patternScaleX={1}
                patternScaleY={1}
                patternRefreshInterval={2}
                patternAlpha={15}
              />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <span className="inline-block text-[10px] uppercase tracking-widest text-[#213348] bg-[#F8FAFC] border border-gray-200/60 rounded-full px-3 py-1">
                Secure workspace
              </span>
              <h4 className="mt-3 text-lg font-bold text-[#213348] leading-snug pr-24">
                Work safely without sacrificing productivity
              </h4>
            </div>
          </motion.div>

          {/* Adoption */}
          <motion.div whileHover={{ y: -4 }} className="relative text-white rounded-2xl p-6 border border-white/10 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image 
                src="/art.jpg" 
                alt="Successful Adoption Background" 
                fill 
                className="object-cover opacity-30"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0E1A28]/95 via-[#0E1A28]/90 to-[#0E1A28]/95"></div>
              {/* Noise effect */}
              <Noise
                patternSize={250}
                patternScaleX={1}
                patternScaleY={1}
                patternRefreshInterval={2}
                patternAlpha={15}
              />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <span className="inline-block text-[10px] uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-3 py-1">
                Successful adoption
              </span>
              <h4 className="mt-3 text-lg font-bold leading-snug">
                Success lies in how teams use software effectively
              </h4>
            </div>
                </motion.div>
              </div>

      </div>
    </section>
  )
}
