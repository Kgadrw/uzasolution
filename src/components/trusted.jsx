'use client'
import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function WhySection() {
  return (
    <section className="relative w-full bg-[#F8FAFC] font-sans py-12 px-6 md:px-12 lg:px-24">
      <div className="relative overflow-hidden rounded-2xl bg-[#13212F] text-white min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/7.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-[#13212F]/70" />
        <div className="relative z-10 text-center px-4 py-12">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-4">Let's Build Africa's Trade Future Together</h1>
          <p className="text-sm md:text-base lg:text-lg mb-8 max-w-2xl mx-auto text-gray-200">
            Join us in revolutionizing trade for African businesses and creating global opportunities.
          </p>
          <Link href="/contact">
      <button className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl">
        Partner with us
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </Link>
        </div>
      </div>
    </section>
  )
}
