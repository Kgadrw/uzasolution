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

        {/* Partners Grid - Static */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div key={partner.name} className="flex items-center justify-center group cursor-pointer">
              <div className="relative w-full h-32 flex items-center justify-center p-6">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={120}
                  height={120}
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
      </div>
    </section>
  )
}
