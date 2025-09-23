'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Partners() {
  const partners = [
    {
      name: 'Maersk',
      logo: '/maersk.png',
      description: 'Global shipping and logistics leader'
    },
    {
      name: 'Alibaba',
      logo: '/alibaba.png', 
      description: 'World\'s largest B2B marketplace'
    },
    {
      name: 'ICT Chamber',
      logo: '/ict-chamber.png', 
      description: 'Technology innovation partnership'
    }
  ]

  return (
    <section className="py-16 px-4 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            
            <p className="text-2xl font-semibold text-[#FBAF43] uppercase tracking-wider">
              Our Partners
            </p>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative  p-8  border border-gray-100 transition-all duration-300"
            >
              {/* Logo Container */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-20 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Partner Info */}
              

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FBAF43]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
      </div>
    </section>
  )
}
