'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Alice M., CEO, Global Trade Ltd.',
      comment:
        'UZA Solutions transformed the way we source products. Their platform saved us both time and money.',
    },
    {
      name: 'James K., Entrepreneur, Kigali',
      comment:
        'The logistics support is unmatched. I can now scale my business with confidence thanks to UZA.',
    },
    {
      name: 'Sarah T., Supply Chain Manager',
      comment:
        'Professional, innovative, and impactful. UZA Solutions truly understands Africa’s trade ecosystem.',
    },
    {
      name: 'Michael B., Founder, TradeAfrica',
      comment:
        'From sourcing to delivery, everything is smooth and transparent with UZA Solutions.',
    },
    {
      name: 'Linda K., Business Owner',
      comment:
        'The professionalism and speed blew me away. Highly recommended for growing businesses.',
    },
  ]

  // Duplicate testimonials for smooth infinite scrolling
  const loopedTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#F8FAFC] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#FBAF43] mb-12">
          What Our Clients Say
        </h2>

        {/* Slider */}
        <div className="relative w-full overflow-hidden py-4">
          <motion.div
            className="flex gap-6"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              repeat: Infinity,
              duration: 50, // slower sliding
              ease: 'linear',
            }}
          >
            {loopedTestimonials.map((t, i) => (
              <div
                key={i}
                className="min-w-[300px] max-w-sm bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between"
              >
                <Quote className="w-6 h-6 text-[#FBAF43] mb-3 opacity-70" />
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  “{t.comment}”
                </p>
                <h4 className="font-semibold text-gray-900 text-sm mt-auto">
                  {t.name}
                </h4>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
