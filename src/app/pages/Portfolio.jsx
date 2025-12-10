'use client'

import React from 'react'
import { ArrowRight, Globe, TrendingUp, Zap, CheckCircle2 } from 'lucide-react'

export default function Portfolio() {
  return (
    <section className="w-full bg-white text-gray-900 font-sans">

      {/* Hero / Company Overview */}
      <div className="relative w-full bg-[#13212F] text-white py-32 px-8 md:px-16 lg:px-24 flex flex-col items-center text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-6 leading-tight">UZA Solutions Ltd</h1>
        <p className="text-xl md:text-2xl max-w-3xl mb-8">
          Making Trade Simpler, Faster, and More Affordable for African Businesses
        </p>
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl space-y-3 max-w-3xl shadow-lg">
          <p><strong>Hong Kong Address:</strong> New City, 2 Lei Yue Mun Road, Kwun Kong, Hong Kong</p>
          <p><strong>Rwanda Address:</strong> Nyarurembo, Kiyovu, Nyarugenge District, Kigali City, Rwanda</p>
          <p><strong>Registration / TIN:</strong> 122907893</p>
        </div>
      </div>

      {/* Stats / Infographic */}
      <div className="py-20 px-8 md:px-16 lg:px-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <Globe className="w-14 h-14 text-[#FBAF43] mb-4" />
            <h3 className="text-4xl font-extrabold mb-2">50+</h3>
            <p className="text-gray-700 text-lg">Global Partners</p>
          </div>
          <div className="flex flex-col items-center">
            <TrendingUp className="w-14 h-14 text-[#FBAF43] mb-4" />
            <h3 className="text-4xl font-extrabold mb-2">500+</h3>
            <p className="text-gray-700 text-lg">Successful Orders</p>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="w-14 h-14 text-[#FBAF43] mb-4" />
            <h3 className="text-4xl font-extrabold mb-2">100%</h3>
            <p className="text-gray-700 text-lg">Customer Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Banking Partners Cards */}
      <div className="py-20 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Banking Partners</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {[
            {
              country: 'Hong Kong',
              details: [
                'Bank Name: JP Morgan Chase HONG KONG BRANCH',
                'Account Name: UZA SOLUTIONS Limited',
                'Account Number: 63115235394',
                'SWIFT Code: CHASHKHHXXX',
                'Address: CHARTER HOUSE, 8 CONNAUGHT ROAD, CENTRAL'
              ]
            },
            {
              country: 'Rwanda',
              details: [
                'Bank Name: Equity Bank',
                'Account Name: UZA SOLUTIONS Ltd',
                'Account Number (USD): 4013201237332'
              ]
            }
          ].map((bank, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 className="font-bold text-xl text-[#FBAF43] mb-4">{bank.country}</h3>
              <ul className="list-none space-y-2">
                {bank.details.map((d, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#FBAF43]" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Products & Supply */}
      <div className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Products & Supply Capacity</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: 'Construction & Building Materials',
              items: [
                'Steel bars (HRB400E and other grades)',
                'Cement and cement-related products',
                'Tiles, ceramics, and sanitary ware',
                'Pipes & fittings (PVC, PPR, HDPE, GI)',
                'Valves, taps, plumbing accessories',
                'Roofing sheets and profiles',
                'Aluminum doors, windows, partitions',
                'Glass panels, balustrades, cladding systems',
                'Scaffolding and safety materials',
                'Paints, coatings, decorative products'
              ]
            },
            {
              title: 'Finishing Materials & House Equipment',
              items: [
                'Kitchen cabinets and countertops',
                'Wardrobes and interior fittings',
                'Bathroom fittings (toilets, sinks, bathtubs, showers)',
                'Lighting systems (LED, solar)',
                'Flooring solutions (wood, vinyl, laminate)',
                'Furniture (residential, office, hospitality)',
                'Smart home systems and appliances'
              ]
            },
            {
              title: 'Industrial & Construction Equipment',
              items: [
                'Concrete mixers, vibrators, bar benders',
                'Irrigation systems and pumps',
                'Generators and transformers',
                'Fuji Elevators – partnership for specialized orders',
                'Specialized construction machinery (on request)'
              ]
            }
          ].map((cat, idx) => (
            <div key={idx} className="bg-[#F8FAFC] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-bold text-[#FBAF43] mb-4">{cat.title}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {cat.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us / Infographic */}
      <div className="py-20 px-8 md:px-16 lg:px-24 bg-[#F8FAFC]">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[
            { icon: <Globe className="w-14 h-14 text-[#FBAF43] mx-auto mb-4" />, title: 'Direct from Manufacturers', desc: 'Bypass middlemen for right products at right price' },
            { icon: <TrendingUp className="w-14 h-14 text-[#FBAF43] mx-auto mb-4" />, title: 'Capacity for Any Order', desc: 'Small or large-scale imports handled efficiently' },
            { icon: <Zap className="w-14 h-14 text-[#FBAF43] mx-auto mb-4" />, title: 'Customization Options', desc: 'Branded, modified, or tailored products' }
          ].map((f, idx) => (
            <div key={idx} className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
              {f.icon}
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-700">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information / Call to Action */}
      <div className="py-20 px-8 md:px-16 lg:px-24 bg-[#13212F] text-white text-center rounded-t-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg md:text-xl mb-6">Email: info@uzasolutionsltd.com | Phone: +250 788 371 081</p>
        <a href="https://www.uzabulk.com" className="inline-flex items-center gap-2 bg-[#FBAF43] text-[#13212F] px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-yellow-500 transition-all duration-300">
          Visit UzaBulk.com <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  )
}
