'use client'

import { useEffect, useState } from 'react'
import client, { urlFor } from '../sanityClient'
import Link from 'next/link'
import { Globe, Target } from 'lucide-react'

// GROQ Query
const aboutUsQuery = `
  *[_type == "about"][0] {
    title,
    aboutText,
    overviewTitle,
    overviewText,
    missionTitle,
    missionText,
    ctaTitle,
    ctaText,
    ctaLink,
    image
  }
`

export default function AboutUs() {
  const [data, setData] = useState(null)

  useEffect(() => {
    client.fetch(aboutUsQuery).then(setData)
  }, [])

  if (!data) return null

  return (
    <section id="about" className="py-20 px-6 bg-gray-50">
      {/* Mobile View */}
      <div className="max-w-7xl mx-auto block lg:hidden space-y-12">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 font-[Montserrat] mb-4 text-center">
            {data.title?.split('UZA')[0]} <span className="text-[#FBAF43]">UZA Solutions</span>
          </h3>
          <p className="text-[1.075rem] text-gray-700 font-[Montserrat] leading-relaxed text-center">
            {data.aboutText}
          </p>

          {data.image && (
            <img
              src={urlFor(data.image).url()}
              alt="About Us"
              className="mx-auto mt-6 w-60 h-auto rounded-md shadow"
            />
          )}
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800 font-[Montserrat] mb-2 flex items-center justify-center gap-2 text-center">
            <Globe size={20} className="text-[#FBAF43]" />
            {data.overviewTitle}
          </h4>
          <p className="text-base text-gray-600 font-[Montserrat] text-center">
            {data.overviewText}
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800 font-[Monospace] mb-2 flex items-center justify-center gap-2 text-center">
            <Target size={20} className="text-[#FBAF43]" />
            {data.missionTitle}
          </h4>
          <p className="text-base text-gray-600 font-[Montserrat] text-center">
            {data.missionText}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm text-center">
          <h4 className="text-xl font-semibold text-gray-900 font-[Monospace] mb-1">
            {data.ctaTitle}
          </h4>
          <p className="text-base text-gray-600 font-[Montserrat] mb-4">
            {data.ctaText}
          </p>
          <Link
            href={data.ctaLink}
            className="inline-block bg-[#FBAF43] hover:bg-[#e59e3b] text-white text-base font-medium font-[Montserrat] py-2.5 px-5 rounded-md transition"
          >
            Partner with Us
          </Link>
        </div>
      </div>

      {/* Desktop View */}
      <div className="max-w-7xl mx-auto overflow-x-auto hidden lg:table">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-xl font-semibold text-gray-800 font-[Montserrat] text-left">
                {data.title}
              </th>
              <th className="px-6 py-4 text-xl font-semibold text-gray-800 font-[Montserrat] text-center">
                <div className="flex items-center justify-center gap-2">
                  <Globe size={20} className="text-[#FBAF43]" />
                  {data.overviewTitle}
                </div>
              </th>
              <th className="px-6 py-4 text-xl font-semibold text-gray-800 font-[Montserrat] text-center">
                <div className="flex items-center justify-center gap-2">
                  <Target size={20} className="text-[#FBAF43]" />
                  {data.missionTitle}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-top">
              <td className="px-6 py-6 text-gray-700 font-[Montserrat] text-[1.075rem] leading-relaxed">
                {data.aboutText}
                {data.image && (
                  <img
                    src={urlFor(data.image).url()}
                    alt="About Us"
                    className="mt-4 w-60 h-auto rounded-md shadow"
                  />
                )}
              </td>
              <td className="px-6 py-6 text-gray-600 font-[Montserrat] text-base">
                {data.overviewText}
              </td>
              <td className="px-6 py-6 text-gray-600 font-[Montserrat] text-base">
                {data.missionText}
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="px-6 py-6">
                <div className="bg-white border border-gray-200 rounded-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 font-[Montserrat] mb-1 text-left">
                      {data.ctaTitle}
                    </h4>
                    <p className="text-base text-gray-600 font-[Montserrat] text-left">
                      {data.ctaText}
                    </p>
                  </div>
                  <Link
                    href={data.ctaLink}
                    className="inline-block bg-[#FBAF43] hover:bg-[#e59e3b] text-white text-base font-medium font-[Montserrat] py-2.5 px-5 rounded-md transition whitespace-nowrap"
                  >
                    Partner with Us
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
