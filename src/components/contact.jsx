'use client'

import React from 'react'

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="flex items-center mb-4">
            <span className="w-1 h-5 bg-[#FBAF43] rounded mr-3"></span>
            <p className="text-sm font-semibold text-[#FBAF43] uppercase tracking-wider">Contact</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">Let’s talk about your next order</h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Reach out for sourcing, logistics, partnerships, or general inquiries. We’ll get back within 1 business day.
          </p>
          <div className="mt-8 space-y-2 text-gray-800">
            <p><strong>Email:</strong> info@uzasolutionsltd.com</p>
            <p><strong>Phone:</strong> +250 788 371 081</p>
            <p><strong>Address:</strong> Nyarurembo, Kiyovu, Nyarugenge, Kigali, Rwanda</p>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md py-10 rounded-xl shadow-lg p-6 md:p-8 border border-white/40">
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                <input type="text" className="w-full rounded-md px-3 py-2 bg-white/40 backdrop-blur placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] border border-white/50" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                <input type="text" className="w-full rounded-md px-3 py-2 bg-white/40 backdrop-blur placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] border border-white/50" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full rounded-md px-3 py-2 bg-white/40 backdrop-blur placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] border border-white/50" placeholder="you@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input type="text" className="w-full rounded-md px-3 py-2 bg-white/40 backdrop-blur placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] border border-white/50" placeholder="UZA Solutions" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea className="w-full rounded-md px-3 py-2 h-28 resize-none bg-white/40 backdrop-blur placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] border border-white/50" placeholder="Tell us how we can help"></textarea>
            </div>
            <button type="button" className="inline-flex items-center justify-center bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-5 py-3 rounded-md transition-all duration-200 w-full md:w-auto">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}


