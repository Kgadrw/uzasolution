'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutUs() {
  return (
    <section id="about" className="py-20 px-4 md:px-16 lg:px-24 bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="flex items-center mb-4">
              <span className="w-1 h-5 bg-[#FBAF43] rounded mr-3"></span>
              <p className="text-sm font-semibold text-[#FBAF43] uppercase tracking-wider">
                Our Solutions
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Tech-Driven Platforms to Power Africa's Digital Trade Future
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              UZA Solutions streamlines trade with platforms for sourcing, logistics, and cloud services, enabling business growth in the digital age.
            </p>
            <Link
              href="https://www.uzabulk.com/"
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
            className="relative bg-gradient-to-b from-[#0E2A44] to-[#1B3A54] text-white rounded-2xl p-8 overflow-hidden shadow-lg md:col-span-2 md:row-span-2 border border-white/10"
          >
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
            {/* Decorative blob instead of image */}
            <div className="pointer-events-none absolute -right-10 bottom-0 w-64 h-64 rounded-full bg-gradient-to-tr from-[#FBAF43] to-[#4fd1c5] opacity-20 blur-2xl hidden md:block" />
          </motion.div>

          {/* Secure workspace */}
          <motion.div whileHover={{ y: -4 }} className="relative bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md border border-gray-200/50">
            <span className="inline-block text-[10px] uppercase tracking-widest text-[#213348] bg-[#F8FAFC] border border-gray-200/60 rounded-full px-3 py-1">
              Secure workspace
            </span>
            <h4 className="mt-3 text-lg font-bold text-[#213348] leading-snug pr-24">
              Work safely without sacrificing productivity
            </h4>
            <Link href="#" className="mt-3 inline-flex items-center gap-1 text-[#FBAF43] font-semibold text-sm">
              Learn more <ArrowRight className="w-4 h-4" />
            </Link>

          </motion.div>

          {/* Adoption */}
          <motion.div whileHover={{ y: -4 }} className="relative bg-[#0E1A28] text-white rounded-2xl p-6 shadow-md border border-white/10">
            <span className="inline-block text-[10px] uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-3 py-1">
              Successful adoption
            </span>
            <h4 className="mt-3 text-lg font-bold leading-snug">
              Success lies in how teams use software effectively
            </h4>
            <Link href="#" className="mt-3 inline-flex items-center gap-1 text-[#FBAF43] font-semibold text-sm">
              Get started <ArrowRight className="w-4 h-4" />
            </Link>
                </motion.div>
              </div>

        {/* UZA Platforms imagery grid (with photos) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F8FAFC]">
          {[
            { title: 'UZA Bulk', desc: 'Direct-from-factory sourcing for scale and reliability.', href: 'https://www.uzabulk.com/', img: '/1.jpg' },
            { title: 'UZA Mall', desc: 'Curated B2B catalog with transparent pricing.', href: '#', img: '/3.jpg' },
            { title: 'UZA Logistics', desc: 'Ocean, air, and last-mile with live tracking.', href: '#', img: '/2.jpg' },
          ].map((item) => (
            <motion.a
              key={item.title}
              href={item.href}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl overflow-hidden border border-white/20 shadow-lg block"
            >
              <div className="relative h-56">
                <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00142B]/80 via-[#00142B]/30 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 p-5 text-white">
                  <span className="inline-block text-[10px] uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-2">
                    Platform
                  </span>
                  <h5 className="text-lg font-bold">{item.title}</h5>
                  <p className="text-xs text-gray-200 mt-1">{item.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[#FBAF43] font-semibold text-sm mt-3">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
