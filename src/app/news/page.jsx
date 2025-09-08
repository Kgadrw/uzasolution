'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { newsItems } from './data'
import { motion } from 'framer-motion'


const Footer = dynamic(() => import('../../components/footer'))
const Navbar = dynamic(() => import('../../components/navbar'))

export default function NewsPage() {
  const container = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08 }
    },
  }
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 }
  }
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
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((n) => (
            <Link key={n.slug} href={`/news/${n.slug}`} className="group">
              <motion.article variants={item} className="bg-white/70 backdrop-blur rounded-xl overflow-hidden border border-white/40 shadow-sm flex flex-col hover:-translate-y-1 transition-transform">
                <div className="relative h-48">
                  <Image src={n.cover || n.image || '/news1.jpg'} alt={n.title} fill className="object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs uppercase tracking-widest text-[#FBAF43]">{new Date(n.date).toLocaleDateString()}</p>
                  <h2 className="mt-2 text-xl font-bold text-[#213348] group-hover:text-[#FBAF43] transition-colors">{n.title}</h2>
                  <p className="mt-2 text-gray-700 text-sm flex-1">{n.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[#FBAF43] font-semibold">
                    Read article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* Existing compact insights section (optional) */}
      <Footer />
    </div>
  )
}


