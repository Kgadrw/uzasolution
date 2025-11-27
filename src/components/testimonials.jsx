'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'IRIBA Water Group Ltd',
      comment:
        'UZA Solutions has been instrumental in supplying us with high-quality equipment and materials. Their reliability and expertise in water industry solutions have helped us maintain our operations seamlessly.',
    },
    {
      name: 'Lindo Care',
      comment:
        'The healthcare sector requires precision and reliability. UZA Solutions has consistently delivered on their promise of sourcing and delivering healthcare-related products with exceptional quality and timeliness.',
    },
    {
      name: 'Home Foods',
      comment:
        'From packaging solutions to food equipment, UZA Solutions has been our trusted partner. Their understanding of the food industry needs and their ability to source quality products has been outstanding.',
    },
    {
      name: 'Elite Restaurant',
      comment:
        'UZA Solutions has provided us with customized materials and equipment that perfectly match our restaurant\'s needs. Their attention to detail and commitment to quality is remarkable.',
    },
    {
      name: 'ORVIA Group Ltd',
      comment:
        'Working with UZA Solutions for our construction and finishing products has been a game-changer. Their comprehensive supply chain solutions have significantly improved our project delivery timelines.',
    },
    {
      name: 'Fuji Elevators Partnership',
      comment:
        'Our strategic partnership with UZA Solutions has enabled us to deliver specialized equipment across Africa. Their logistics expertise and local market knowledge are invaluable.',
    },
    {
      name: 'Maersk Logistics',
      comment:
        'UZA Solutions has been a reliable partner in ensuring smooth trade operations. Their commitment to excellence in logistics coordination has made our collaboration seamless and efficient.',
    },
  ]

  const loopedTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="py-6 px-6 md:px-12 lg:px-24 bg-[#F8FAFC] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-12">
          Trusted by Industry Leaders
        </h2>

        {/* -------- First Row -------- */}
        <div className="relative w-full overflow-hidden py-4">
          <motion.div
            className="flex gap-3"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              repeat: Infinity,
              duration: 50,
              ease: 'linear',
            }}
          >
            {loopedTestimonials.map((t, i) => (
              <div
                key={i}
                className="min-w-[180px] max-w-[200px] bg-white/80 backdrop-blur rounded-xl shadow-lg p-3 flex flex-col justify-between border border-gray-200/50"
              >
                <Quote className="w-4 h-4 text-[#FBAF43] mb-2 opacity-70" />
                <p className="text-gray-700 text-xs leading-relaxed mb-2">
                  "{t.comment}"
                </p>
                <h4 className="font-semibold text-gray-900 text-xs mt-auto">
                  {t.name}
                </h4>
              </div>
            ))}
          </motion.div>
        </div>

        {/* -------- Second Row (Opposite Direction) -------- */}
        <div className="relative w-full overflow-hidden py-4 mt-8">
          <motion.div
            className="flex gap-3"
            animate={{ x: ['-100%', '0%'] }} // reverse direction
            transition={{
              repeat: Infinity,
              duration: 50,
              ease: 'linear',
            }}
          >
            {loopedTestimonials.map((t, i) => (
              <div
                key={i + loopedTestimonials.length} // unique key
                className="min-w-[180px] max-w-[200px] bg-white/80 backdrop-blur rounded-xl shadow-lg p-3 flex flex-col justify-between border border-gray-200/50"
              >
                <Quote className="w-4 h-4 text-[#FBAF43] mb-2 opacity-70" />
                <p className="text-gray-700 text-xs leading-relaxed mb-2">
                  "{t.comment}"
                </p>
                <h4 className="font-semibold text-gray-900 text-xs mt-auto">
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
