'use client'

import React from 'react'

export default function Contact() {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative w-full h-[35vh] md:h-[40vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('/hero3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
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

          {/* Upgraded Contact Form */}
          <div className="bg-gradient-to-br from-[#fef9f0] to-[#fff4e0] py-12 px-6 md:px-10 rounded-2xl shadow-2xl border border-[#fbe1a6]">
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                  <input type="text" placeholder="John"
                    className="w-full rounded-xl px-4 py-3 border border-[#fcd77f] bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                  <input type="text" placeholder="Doe"
                    className="w-full rounded-xl px-4 py-3 border border-[#fcd77f] bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" placeholder="you@company.com"
                  className="w-full rounded-xl px-4 py-3 border border-[#fcd77f] bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input type="text" placeholder="UZA Solutions"
                  className="w-full rounded-xl px-4 py-3 border border-[#fcd77f] bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea placeholder="Tell us how we can help" rows={5}
                  className="w-full rounded-xl px-4 py-3 border border-[#fcd77f] bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm resize-none transition-all"
                ></textarea>
              </div>
              <button type="button" 
                className="w-full md:w-auto inline-flex justify-center items-center bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-200"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
