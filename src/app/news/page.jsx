'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { FileText } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = dynamic(() => import('../../components/footer'))
const Navbar = dynamic(() => import('../../components/navbar'))

export default function NewsPage() {
  return (
    <div>
      <Navbar initialSolid />
      {/* Hero */}
      <section className="relative h-[320px] md:h-[420px] w-full">
        <Image src="/hero2.jpg" alt="News hero" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00142B]/95 via-[#00142B]/75 to-transparent" />
        <div className="relative z-10 h-full px-8 md:px-16 lg:px-24 flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent">UZA Insights & News</h1>
            <p className="mt-3 text-gray-200">Stories and analysis shaping Africa's trade revolution.</p>
          </div>
        </div>
      </section>

      {/* No News Available Section */}
      <section className="py-16 md:py-20 lg:py-24 px-8 md:px-16 lg:px-24 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#213348] mb-4">
            No News Available
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
            We're currently working on bringing you the latest insights and stories about Africa's trade revolution. 
            Check back soon for updates and news from UZA Solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm md:text-base bg-[#FBAF43] hover:bg-[#E59E3B] text-white transition-colors duration-300"
            >
              Get in Touch
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm md:text-base border-2 border-gray-300 hover:border-[#FBAF43] text-[#213348] hover:text-[#FBAF43] transition-colors duration-300"
            >
              Back to Home
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}


