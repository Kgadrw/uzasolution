'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const platforms = [
  { id: 1, title: 'UZA Bulk', image: '/1.jpg', link: '#' },
  { id: 2, title: 'UZA Logistics', image: '/2.jpg', link: '#' },
  { id: 3, title: 'UZA Mall', image: '/3.jpg', link: '#' },
  { id: 4, title: 'UZA Cloud', image: '/4.jpg', link: '#' },
]

export default function AboutUs() {
  return (
    <section id="about" className="py-20 px-4 md:px-16 lg:px-24 bg-gradient-to-b from-[#F8FAFC] to-white">
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-[Montserrat] leading-tight">
              Tech-Driven Platforms to Power Africa's Digital Trade Future
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-lg text-gray-600 font-[Roboto] leading-relaxed">
              UZA Solutions streamlines trade with platforms for sourcing, logistics, and cloud services, enabling business growth in the digital age.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300 group"
            >
              Explore
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Platform Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((platform) => (
            <motion.div
              key={platform.id}
              className="relative group cursor-pointer"
              whileHover="hover"
              initial="rest"
              animate="rest"
              variants={{
                rest: {},
                hover: {},
              }}
            >
              {/* Image */}
              <div className="relative w-full h-64 overflow-hidden">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ filter: 'brightness(1.2)' }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={platform.image}
                    alt={platform.title}
                    fill
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </div>

              {/* Texts Below Image */}
              <motion.div
                className="mt-3 text-center flex flex-col gap-2"
                variants={{
                  rest: { opacity: 1, y: 0 },
                  hover: { opacity: 1, y: -5 },
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <h3 className="text-lg font-bold font-[Montserrat]">{platform.title}</h3>
                <Link
                  href={platform.link}
                  className="inline-flex items-center gap-1 text-[#FBAF43] font-semibold text-sm hover:text-[#e59e3b] transition-colors duration-300"
                >
                  Learn More
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
