'use client'

import { useEffect, useState } from 'react'
import { Globe, ShieldCheck, Handshake } from 'lucide-react'
import Link from 'next/link'
import Client from '../sanityClient' // Adjust path if needed

const iconMap = {
  Globe: <Globe size={30} />,
  ShieldCheck: <ShieldCheck size={30} />,
  Handshake: <Handshake size={30} />,
}

export default function AboutUs() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await Client.fetch(`*[_type == "aboutUs"][0]`)
      setData(result)
    }
    fetchData()
  }, [])

  if (!data) return <p className="text-center my-10">Loading...</p>

  return (
    <section id="why" className="py-16 px-6 bg-gray-50">
      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h3 className="text-2xl font-semibold font-[Montserrat] text-gray-900 mb-6">{data.sectionTitle}</h3>
        <p className="text-base text-gray-600 mb-8 font-[Monospace]">{data.sectionDescription}</p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.cards?.map((card, index) => (
            <div key={index} className="bg-white p-6 rounded-lg">
              <div className="mb-4 text-[#FBAF43]">
                {iconMap[card.cardIcon] || <Globe size={30} />}
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 font-[Montserrat]">{card.cardTitle}</h4>
              <p className="text-sm text-gray-600 font-[Montserrat]">{card.cardDescription}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Affiliate Program */}
      <div className="max-w-7xl mx-auto mt-16 bg-white border border-gray-200 p-6 rounded-lg">
        <h3 className="text-2xl font-semibold font-[Montserrat] text-gray-900 text-center mb-6">
          {data.affiliateSectionTitle}
        </h3>
        <p className="text-base text-gray-600 font-[Montserrat] mb-4 text-center">
          {data.affiliateSectionDescription}
        </p>

        {/* Placeholder for Calculator */}
        <div className="text-center mb-6">
          <p className="text-lg text-gray-500 font-[Montserrat]">Coming Soon!</p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href={data.affiliateCtaLink}
            className="inline-block bg-[#FBAF43] hover:bg-[#e59e3b] text-white text-base font-medium font-[Montserrat] py-2 px-5 rounded-md transition"
          >
            {data.affiliateCtaText}
          </Link>
        </div>
      </div>
    </section>
  )
}
