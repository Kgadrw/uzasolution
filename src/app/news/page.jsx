'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { newsItems } from './data'

const NewsSection = dynamic(() => import('../../components/news'))
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
            <h1 className="text-3xl md:text-5xl font-extrabold">UZA Insights & News</h1>
            <p className="mt-3 text-gray-200">Stories and analysis shaping Africa’s trade revolution.</p>
          </div>
        </div>
      </section>

      {/* Index grid */}
      <section className="py-14 px-8 md:px-16 lg:px-24 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article key={item.slug} className="bg-[#F8FAFC] rounded-xl overflow-hidden border shadow-sm flex flex-col">
              <div className="relative h-48">
                <Image src={item.cover || item.image || '/news1.jpg'} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs uppercase tracking-widest text-[#FBAF43]">{new Date(item.date).toLocaleDateString()}</p>
                <h2 className="mt-2 text-xl font-bold text-[#213348]">{item.title}</h2>
                <p className="mt-2 text-gray-700 text-sm flex-1">{item.excerpt}</p>
                <Link href={`/news/${item.slug}`} className="mt-4 inline-flex items-center gap-2 text-[#FBAF43] font-semibold">
                  Read article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Existing compact insights section (optional) */}
      <NewsSection />
      <Footer />
    </div>
  )
}


