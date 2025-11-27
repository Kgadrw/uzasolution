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
    <section className="w-full bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative h-[520px] md:h-[640px] overflow-hidden">
          <Image src="/mall.jpg" alt="Portfolio hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00142B]/95 via-[#00142B]/75 to-transparent" />
          <div className="relative z-10 h-full px-8 md:px-16 lg:px-24 flex items-center">
            <div className="max-w-3xl text-white">
              <div className="flex items-center mb-4">
                <span className="w-1.5 h-6 bg-[#FBAF43] rounded mr-3" />
                <span className="uppercase text-xs tracking-widest text-[#FBAF43] font-bold">Portfolio</span>
              </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">Building Africa’s modern supply engine</h1>
            <p className="mt-4 text-base md:text-lg text-gray-200">
                Sourcing, logistics, and digital infrastructure for reliable imports and regional trade.
              </p>
            <div className="mt-6 flex gap-3">
              <a href="#work" className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-5 py-2.5 rounded-full transition-all">
                  Explore work <ArrowRight className="w-4 h-4" />
                </a>
              <a href="#contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-full transition-all">
                  Get in touch
                </a>
              </div>
            </div>
        </div>
      </div>

      {/* Testimonial Video Section */}
      <div className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ minHeight: '500px' }}>
            <video
              className="w-full h-full object-cover"
              src="/testimonial.mp4"
              title="Testimonial"
              controls
              playsInline
              autoPlay
              muted
              loop
              style={{ minHeight: '500px' }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Recent Work */}
      <div className="py-16 px-8 md:px-16 lg:px-24">
        <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent text-center mb-12">
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

      {/* FAQ Section */}
      <div className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent text-center mb-12">
          FAQs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-3 bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center"
              >
                <span className="font-semibold text-gray-800 text-sm md:text-base">{faq.question}</span>
                <span className="text-gray-500 text-lg">{openFAQs[index] ? "−" : "+"}</span>
              </button>
              {openFAQs[index] && (
                <div className="px-6 py-4 bg-white text-gray-700 border-t border-gray-200 text-sm transition-all">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Video Section - Interactive Video Selection */}
      <div className="py-16 px-8 md:px-16 lg:px-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-4">
              Our Story in Motion
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                <div className={`relative aspect-video rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                  currentVideo === index 
                    ? 'ring-4 ring-[#FBAF43] shadow-2xl' 
                    : 'group-hover:shadow-xl'
                }`}>
                  {video.type === "youtube" ? (
                    <iframe
                      className="w-full h-full"
                      src={video.src}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      className="w-full h-full object-cover"
                      src={video.src}
                      title={video.title}
                      controls
                      playsInline
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
