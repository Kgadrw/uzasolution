'use client'
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

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
    const videos = [
    { src: "https://www.youtube.com/embed/xVJa3Lypjww", title: "Main Story", type: "youtube" },
    { src: "https://www.youtube.com/embed/2FCvn0r4EUs", title: "Short Intro", type: "youtube" },
    { src: "https://www.youtube.com/embed/Prs33Sr-HKs", title: "Vision", type: "youtube" },
  ];

  const [currentVideo, setCurrentVideo] = useState(0);

  const faqs = [
    {
      question: "Company Overview",
      answer: (
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>Name:</strong> UZA Solutions Ltd</li>
          <li><strong>HK:</strong> New City, 2 Lei Yue Mun Rd</li>
          <li><strong>Rwanda:</strong> Nyarurembo, Kiyovu, Kigali</li>
          <li><strong>TIN:</strong> 122907893</li>
        </ul>
      ),
    },
    {
      question: "Banking – HK",
      answer: <p className="text-sm">JP Morgan Chase HK <br />Acc: UZA SOLUTIONS Limited <br />No: 63115235394 <br />SWIFT: CHASHKHHXXX <br />Charter House, 8 Connaught Rd</p>,
    },
    {
      question: "Banking – Rwanda",
      answer: <p className="text-sm">Equity Bank <br />Acc: UZA SOLUTIONS Ltd <br />No (USD): 4013201237332</p>,
    },
    {
      question: "Products",
      answer: <p className="text-sm"><strong>Construction:</strong> Steel, Cement, Tiles, Pipes <br /><strong>Finishing:</strong> Cabinets, Wardrobes, Lighting <br /><strong>Industrial:</strong> Mixers, Pumps, Generators, Fuji Elevators</p>,
    },
    {
      question: "Why Choose Us",
      answer: <p className="text-sm">Direct from manufacturers <br />Any order size <br />Customization & branding <br />Proven supply <br />Trusted logistics</p>,
    },
    {
      question: "Experience",
      answer: <p className="text-sm">Delivered construction equipment, finishing products & machines in Rwanda. Fuji Elevators partnership for high-value orders.</p>,
    },
    {
      question: "Contact",
      answer: <p className="text-sm">info@uzasolutionsltd.com <br />+250 788 371 081 <br />uzasolutionsltd.com • uzabulk.com <br />Kigali, Rwanda</p>,
    },
    {
      question: "Legal",
      answer: <p className="text-sm">Registered in Rwanda <br />Tax compliant (TIN: 122907893) <br />Meets quality standards <br />CoC, warranties, compliance docs</p>,
    },
  ];

  const [openFAQs, setOpenFAQs] = useState({})

  const toggleFAQ = (index) => {
    setOpenFAQs(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <section className="w-full bg-white text-gray-900 pt-24">
      {/* Recent Work */}
      <div className="relative py-16 px-8 md:px-16 lg:px-24 bg-white">
        {/* Decorative Vertical Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-300/30 to-transparent"></div>
          <div className="absolute left-2/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-300/30 to-transparent"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
        {/* Portfolio Description */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                We've partnered with leading businesses across Africa to deliver comprehensive supply chain solutions, from sourcing and procurement to logistics and delivery. Our portfolio showcases successful collaborations with companies in water management, healthcare, food services, construction, and global logistics.
              </p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Each partnership represents our commitment to simplifying trade, reducing costs, and enabling African businesses to scale globally with confidence.
              </p>
            </div>
            <div className="relative w-full h-64 md:h-80 overflow-hidden">
              <Image
                src="/portfolio.jpg"
                alt="Portfolio"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden pb-4">
          <motion.div 
            className="flex gap-4"
            animate={{ 
              x: [0, -((192 + 16) * clients.length)]
            }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear"
              }
            }}
          >
            {/* Duplicate clients for seamless loop */}
            {[...clients, ...clients].map((client, index) => (
              <div key={`${client.name}-${index}`} className="flex-shrink-0 w-48 group cursor-pointer">
                <div className="rounded-2xl overflow-hidden transition-all duration-300">
                  <div className="relative w-full h-48 flex items-center justify-center p-6">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={120}
                      height={120}
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent text-center mb-12">
          FAQs
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm md:text-base">
                    {faq.question}
                  </span>
                  <ChevronRight 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      openFAQs[index] ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {openFAQs[index] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-700 text-sm leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Section - Interactive Video Selection */}
      <div className="py-16 px-8 md:px-16 lg:px-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-4">
              Our Story in Motion
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
              Choose a video to learn more about UZA Solutions and our mission to transform Africa's supply chain.
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group cursor-pointer transition-all duration-300 ${
                  currentVideo === index 
                    ? 'transform scale-105' 
                    : 'hover:transform hover:scale-102'
                }`}
                onClick={() => setCurrentVideo(index)}
              >
                {/* Video Thumbnail/Preview */}
                <div className={`relative aspect-video rounded-2xl overflow-hidden transition-all duration-300 ${
                  currentVideo === index 
                    ? 'ring-4 ring-[#FBAF43]' 
                    : ''
                }`}>
                  {video.type === "youtube" ? (
                    <iframe
                      className="w-full h-full"
                      src={`${video.src}?enablejsapi=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ display: 'block' }}
                    ></iframe>
                  ) : (
                    <video
                      className="w-full h-full object-cover"
                      src={video.src}
                      title={video.title}
                      controls
                      playsInline
                      preload="metadata"
                      style={{ display: 'block' }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      
    </section>
  )
}
