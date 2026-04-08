'use client'

import Image from 'next/image'

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
        name: 'Igihe',
        logo: '/igihe.png', 
        description: 'Igihe is a technology company that provides software solutions for businesses.'
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

        {/* Partners Logos - Sliding (Right to Left) */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />

          <div className="partners-marquee flex w-max min-w-full gap-10 md:gap-14 py-2">
            {[...partners, ...partners].map((partner, idx) => (
              <div
                key={`${partner.name}-${idx}`}
                className="flex items-center justify-center"
              >
                <div className="relative h-20 w-40 sm:h-24 sm:w-44 md:h-28 md:w-48 flex items-center justify-center px-4">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={180}
                    height={120}
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
      </div>

      <style jsx>{`
        .partners-marquee {
          animation: partners-scroll 18s linear infinite;
          will-change: transform;
        }

        @keyframes partners-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .partners-marquee {
            animation: none;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
