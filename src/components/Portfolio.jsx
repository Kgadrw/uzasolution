'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Portfolio() {
  return (
    <section className="w-full bg-white text-gray-900">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="relative h-[520px] md:h-[640px]">
          <Image src="/mall.jpg" alt="Portfolio hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00142B]/95 via-[#00142B]/75 to-transparent" />
          <div className="relative z-10 h-full px-8 md:px-16 lg:px-24 flex items-center">
            <div className="max-w-3xl text-white">
              <div className="flex items-center mb-4">
                <span className="w-1.5 h-6 bg-[#FBAF43] rounded mr-3" />
                <span className="uppercase text-xs tracking-widest text-[#FBAF43] font-bold">Portfolio</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Building Africa’s modern supply engine</h1>
              <p className="mt-5 text-lg md:text-xl text-gray-200">
                Sourcing, logistics, and digital infrastructure for reliable imports and regional trade.
              </p>
              <div className="mt-8 flex gap-3">
                <a href="#work" className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-6 py-3 rounded-full transition-all">
                  Explore work <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full transition-all">
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating illustrations */}
        
      </div>

      {/* Stats strip */}
      <div className="px-8 md:px-16 lg:px-24 -mt-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '/globe.svg', label: 'Global factories', value: '10K+' },
            { icon: '/truck.jpg', label: 'Shipments managed', value: '350+' },
            { icon: '/file.svg', label: 'SKUs sourced', value: '5k+' },
          ].map((s) => (
            <div key={s.label} className="bg-white/80 backdrop-blur rounded-xl shadow-lg border border-gray-200/50 p-5 flex items-center gap-4">
              <div className="relative w-12 h-12 overflow-hidden rounded-md bg-[#F8FAFC]">
                <Image src={s.icon} alt={s.label} fill className="object-cover" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#213348]">{s.value}</p>
                <p className="text-sm text-gray-600">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Solutions grid (carded UI) */}
      <div id="work" className="py-16 px-8 md:px-16 lg:px-24 bg-[#F8FAFC]">
        <h2 className="text-3xl md:text-4xl font-bold text-[#213348]">Platforms & Solutions</h2>
        <p className="text-gray-600 mt-2">Tech-first products powering procurement and logistics.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(0,_1fr)]">
          {/* Feature card (left, spans 2 rows) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative bg-gradient-to-b from-[#0E2A44] to-[#1B3A54] text-white rounded-2xl p-8 overflow-hidden shadow-lg md:col-span-2 md:row-span-2 border border-white/10"
          >
            <span className="inline-block text-[10px] uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4">
              Integrations & AI
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold leading-snug max-w-xl">
              Embrace AI capabilities to help you in daily operations
            </h3>
            <p className="mt-3 text-sm md:text-base text-gray-200 max-w-lg">
              Automate RFQs, documents, and tracking with intelligent workflows, built into UZA platforms.
            </p>
            <a href="#" className="mt-6 inline-flex items-center gap-2 bg-white text-[#213348] hover:bg-[#FBAF43] hover:text-[#213348] font-semibold px-5 py-3 rounded-full transition-colors w-max">
              Work smarter <ArrowRight className="w-4 h-4" />
            </a>

            {/* Accent illustration */}
            <div className="pointer-events-none absolute -right-6 bottom-4 opacity-90 hidden md:block">
              <Image src="/1200x600wa.png" alt="abstract" width={260} height={260} className="drop-shadow-2xl" />
            </div>
          </motion.div>

          {/* Top-right card */}
          <motion.div whileHover={{ y: -4 }} className="relative bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md border border-gray-200/50">
            <span className="inline-block text-[10px] uppercase tracking-widest text-[#213348] bg-[#F8FAFC] border border-gray-200/60 rounded-full px-3 py-1">
              Secure workspace
            </span>
            <h4 className="mt-3 text-lg font-bold text-[#213348] leading-snug pr-24">
              Work safely without sacrificing productivity
            </h4>
            <a href="#" className="mt-3 inline-flex items-center gap-1 text-[#FBAF43] font-semibold text-sm">
              Work veilig <ArrowRight className="w-4 h-4" />
            </a>
            <div className="absolute right-4 top-6 w-20 h-20 md:w-24 md:h-24 opacity-90">
              <Image src="/images.png" alt="fingerprint" fill className="object-contain" />
            </div>
          </motion.div>

          {/* Bottom-right dark card */}
          <motion.div whileHover={{ y: -4 }} className="relative bg-[#0E1A28] text-white rounded-2xl p-6 shadow-md border border-white/10">
            <span className="inline-block text-[10px] uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-3 py-1">
              Successful adoption
            </span>
            <h4 className="mt-3 text-lg font-bold leading-snug">
              Software success depends on how well teams work with it
            </h4>
            <a href="#" className="mt-3 inline-flex items-center gap-1 text-[#FBAF43] font-semibold text-sm">
              Get started <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Capability feature */}
      <div className="py-16 px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#213348]">End‑to‑end procurement, simplified</h2>
            <p className="mt-3 text-gray-700">
              From RFQs and factory audits to shipping and last‑mile delivery, we orchestrate reliable supply using data and deep vendor networks.
            </p>
            <ul className="mt-6 space-y-3 text-gray-800">
              <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#FBAF43] rounded-full" /> Direct‑from‑factory sourcing</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#FBAF43] rounded-full" /> Customs, compliance, and QC</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#FBAF43] rounded-full" /> Ocean, air, and trucking logistics</li>
            </ul>
          </div>
          <div className="relative order-1 lg:order-2 h-80 rounded-2xl overflow-hidden shadow-xl">
            <Image src="/truck.jpg" alt="Logistics" fill className="object-cover" />
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow">
              <div className="flex items-center gap-2 text-sm text-[#213348]"><Image src="/window.svg" alt="UI" width={18} height={18} /> Live shipment tracking</div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="py-12 px-8 md:px-16 lg:px-24 bg-[#F8FAFC]">
        <p className="uppercase text-xs tracking-widest text-center text-gray-500">Trusted logistics and marketplace partners</p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-10 items-center justify-items-center opacity-90">
          {['/amazon.png','/ebay.png','/alibaba.png','/maersk.png'].map((logo) => (
            <div key={logo} className="relative w-40 h-14 md:w-52 md:h-16">
              <Image src={logo} alt="partner" fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="py-16 px-8 md:px-16 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-[#213348]">Recent work</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative h-64 rounded-xl overflow-hidden">
            <Image src="/news1.jpg" alt="work" fill className="object-cover" />
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden">
            <Image src="/news2.jpg" alt="work" fill className="object-cover" />
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden">
            <Image src="/news3.jpg" alt="work" fill className="object-cover" />
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden md:col-span-1">
            <Image src="/mockup.PNG" alt="mockup" fill className="object-cover" />
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden md:col-span-3">
            <Image src="/bulk.jpg" alt="bulk" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-8 md:px-16 lg:px-24 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-[#213348] text-white">
          <div className="absolute inset-0 opacity-20">
            <Image src="/bg.gif" alt="bg" fill className="object-cover" />
          </div>
          <div className="relative p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Ready to source at scale?</h3>
              <p className="mt-2 text-gray-200 max-w-xl">Let’s move from requirement to delivery with speed, compliance, and cost control.</p>
            </div>
            <a href="/contact" className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-6 py-3 rounded-full transition-all">
              Talk to us <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
