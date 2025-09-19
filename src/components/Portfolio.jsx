'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Portfolio() {
  const clients = [
    { name: "IRIBA Water Group Ltd", logo: "/iriba.png" },
    { name: "Lindo Care", logo: "/lindo.png" },
    { name: "Home Foods", logo: "/homefood.png" },
    { name: "Elite Restaurant", logo: "/elite.jpeg" },
    { name: "ORVIA Group Ltd", logo: "/orvia.jpg" },
    { name: "Fuji Elevators", logo: "/fuji.jpeg" },
    { name: "Maersk", logo: "/maersk.png" },
   
  ];

  // FAQ data
  const faqs = [
    {
      question: "Company Overview",
      answer: (
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Name:</strong> UZA Solutions Ltd</li>
          <li><strong>HK:</strong> New City, 2 Lei Yue Mun Rd</li>
          <li><strong>Rwanda:</strong> Nyarurembo, Kiyovu, Kigali</li>
          <li><strong>TIN:</strong> 122907893</li>
        </ul>
      ),
    },
    {
      question: "Banking – HK",
      answer: (
        <>
          JP Morgan Chase HK <br />
          Acc: UZA SOLUTIONS Limited <br />
          No: 63115235394 <br />
          SWIFT: CHASHKHHXXX <br />
          Charter House, 8 Connaught Rd
        </>
      ),
    },
    {
      question: "Banking – Rwanda",
      answer: (
        <>
          Equity Bank <br />
          Acc: UZA SOLUTIONS Ltd <br />
          No (USD): 4013201237332
        </>
      ),
    },
    {
      question: "Products",
      answer: (
        <>
          <strong>Construction:</strong> Steel, Cement, Tiles, Pipes <br />
          <strong>Finishing:</strong> Cabinets, Wardrobes, Lighting <br />
          <strong>Industrial:</strong> Mixers, Pumps, Generators, Fuji Elevators
        </>
      ),
    },
    {
      question: "Why Choose Us",
      answer: (
        <>
          Direct from manufacturers <br />
          Any order size <br />
          Customization & branding <br />
          Proven supply <br />
          Trusted logistics
        </>
      ),
    },
    {
      question: "Experience",
      answer: (
        <>
          Delivered construction equipment, finishing products & machines in Rwanda.  
          Fuji Elevators partnership for high-value orders.
        </>
      ),
    },
    {
      question: "Contact",
      answer: (
        <>
          info@uzasolutionsltd.com <br />
          +250 788 371 081 <br />
          uzasolutionsltd.com • uzabulk.com <br />
          Kigali, Rwanda
        </>
      ),
    },
    {
      question: "Legal",
      answer: (
        <>
          Registered in Rwanda <br />
          Tax compliant (TIN: 122907893) <br />
          Meets quality standards <br />
          CoC, warranties, compliance docs
        </>
      ),
    },
  ];

  // independent toggle state for each FAQ
  const [openMap, setOpenMap] = useState({})

  const toggleFAQ = (index) => {
    setOpenMap((prev) => ({
      ...prev,
      [index]: !prev[index], // toggle only this FAQ
    }))
  }

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
      </div>

      {/* Stats strip */}
      
    <div className="px-8 md:px-16 lg:px-24 -mt-12 relative z-10">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    {[
      { icon: '/globe.svg', label: 'Global factories', value: '10K+' },
      { icon: '/truck.jpg', label: 'Shipments managed', value: '350+' },
      { icon: '/file.svg', label: 'SKUs sourced', value: '5k+' }
    ].map((s) => (
      <div
        key={s.label}
        className="bg-white rounded-2xl p-6 flex items-center gap-5  hover:shadow-sm transition-shadow duration-300 border-b-4 border-[#213348]"
      >
        <div className="w-14 h-14 flex items-center justify-center bg-[#FBAF43]/20 rounded-full">
          <Image src={s.icon} alt={s.label} width={32} height={32} className="object-contain" />
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-bold text-[#00142B]">{s.value}</p>
          <p className="text-sm md:text-base text-[#00142B]">{s.label}</p>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Recent Work */}
      <div className="py-16 px-8 md:px-16 lg:px-24">
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-extrabold text-[#213348] text-center mb-12">
          Recent Work
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center relative">
          <div className="absolute top-2/4 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent pointer-events-none"></div>
          
          
          

          <div className="hidden lg:block absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent pointer-events-none"></div>
          <div className="hidden lg:block absolute left-2/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent pointer-events-none"></div>
          <div className="hidden lg:block absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent pointer-events-none"></div>

          {clients.map((client) => (
            <div key={client.name} className="group flex items-center justify-center p-4 h-32 cursor-pointer transition-transform hover:scale-105">
              <Image
                src={client.logo}
                alt={client.name}
                width={140}
                height={140}
                className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio FAQ Section - 3 per row, independent toggle */}
      <div className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-extrabold text-[#213348] text-center mb-12">
          FAQS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                <span className="text-gray-500">
                  {openMap[index] ? "−" : "+"}
                </span>
              </button>
              {openMap[index] && (
                <div className="px-6 py-4 bg-white text-gray-700 border-t border-gray-200 transition-all">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
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
