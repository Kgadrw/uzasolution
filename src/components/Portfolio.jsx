'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Portfolio() {
  return (
    <section className="w-full bg-white text-gray-900">
      {/* Hero / Company Overview */}
      <div className="relative w-full bg-[#13212F] text-white py-20 px-8 md:px-16 lg:px-24">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          UZA Solutions Ltd – Company Portfolio
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mb-4">
          Rwandan-owned company dedicated to making trade simpler, faster, and more affordable.
        </p>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg space-y-3">
          <p><strong>Hong Kong Address:</strong> New City, 2 Lei Yue Mun Road, Kwun Kong, Hong Kong</p>
          <p><strong>Rwanda Address:</strong> Nyarurembo, Kiyovu, Nyarugenge District, Kigali City, Rwanda</p>
          <p><strong>Registration / TIN:</strong> 122907893</p>
        </div>
      </div>

      {/* Banking Partners */}
      <div className="py-16 px-8 md:px-16 lg:px-24 bg-[#F8FAFC]">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Banking Partners</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-3">
            <h3 className="font-semibold text-lg mb-2">Hong Kong</h3>
            <p><strong>Bank Name:</strong> JP Morgan Chase HONG KONG BRANCH</p>
            <p><strong>Account Name:</strong> UZA SOLUTIONS Limited</p>
            <p><strong>Account Number:</strong> 63115235394</p>
            <p><strong>SWIFT Code:</strong> CHASHKHHXXX</p>
            <p><strong>Address:</strong> CHARTER HOUSE, 8 CONNAUGHT ROAD, CENTRAL</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg space-y-3">
            <h3 className="font-semibold text-lg mb-2">Rwanda</h3>
            <p><strong>Bank Name:</strong> Equity Bank</p>
            <p><strong>Account Name:</strong> UZA SOLUTIONS Ltd</p>
            <p><strong>Account Number (USD):</strong> 4013201237332</p>
          </div>
        </div>
      </div>

      {/* About Us */}
      <div className="py-16 px-8 md:px-16 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">About Us</h2>
        <p className="text-lg leading-relaxed mb-4">
          UZA Solutions Ltd is a Rwandan-owned company dedicated to making trade simpler, faster, and more affordable.
          Through <a href="https://www.uzabulk.com" className="text-[#FBAF43] underline">UzaBulk.com</a>, we connect businesses directly with vetted global and regional manufacturers.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Since we started, we have successfully imported and supplied construction equipment, finishing products, industrial machines, and packaging materials. Our strength lies in sourcing directly from factories, adapting to client requirements, and delivering reliably.
        </p>
      </div>

      {/* Products & Supply Capacity */}
      <div className="py-16 px-8 md:px-16 lg:px-24 bg-[#F8FAFC]">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Products & Supply Capacity</h2>
        
        <div className="space-y-12">
          {/* Construction & Building Materials */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Construction & Building Materials</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Steel bars (HRB400E and other grades)</li>
              <li>Cement and cement-related products</li>
              <li>Tiles, ceramics, and sanitary ware</li>
              <li>Pipes & fittings (PVC, PPR, HDPE, GI)</li>
              <li>Valves, taps, and plumbing accessories</li>
              <li>Roofing sheets and profiles</li>
              <li>Aluminum doors, windows, and partitions</li>
              <li>Glass panels, balustrades, and cladding systems</li>
              <li>Scaffolding and site safety materials</li>
              <li>Paints, coatings, and decorative products</li>
            </ul>
          </div>

          {/* Finishing Materials & House Equipment */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Finishing Materials & House Equipment</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Kitchen cabinets and countertops</li>
              <li>Wardrobes and interior fittings</li>
              <li>Bathroom fittings (toilets, sinks, bathtubs, showers, mixers)</li>
              <li>Lighting systems (indoor/outdoor, LED, solar)</li>
              <li>Flooring solutions (wood, vinyl, laminate, specialty finishes)</li>
              <li>Furniture (residential, office, hospitality)</li>
              <li>Smart home systems and appliances</li>
            </ul>
          </div>

          {/* Industrial & Construction Equipment */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Industrial & Construction Equipment</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Concrete mixers, vibrators, and bar benders</li>
              <li>Irrigation systems and pumps</li>
              <li>Generators and transformers</li>
              <li>Fuji Elevators – partnership for processing elevator orders</li>
              <li>Specialized construction machinery (on request)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 px-8 md:px-16 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose Us</h2>
        <ul className="list-disc list-inside space-y-3 text-lg">
          <li>Direct from Manufacturers – bypass middlemen for right products at right price</li>
          <li>Capacity for Any Order – small or large-scale imports handled efficiently</li>
          <li>Customization Options – branded, modified, or tailored products</li>
          <li>Proven Supply Experience in Rwanda – supporting contractors, wholesalers, and businesses</li>
          <li>Trusted Logistics – partners like Maersk ensure safe, timely deliveries</li>
        </ul>
      </div>

      {/* Experience & Capability */}
      <div className="py-16 px-8 md:px-16 lg:px-24 bg-[#F8FAFC]">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Experience & Capability</h2>
        <p className="text-lg leading-relaxed mb-4">
          UZA Solutions has built a reputation for reliability in Rwanda’s construction and business supply chain. We have delivered construction equipment, packaging solutions, finishing products, and industrial machines for contractors and businesses.
        </p>
        <p className="text-lg leading-relaxed">
          Our ongoing partnership with Fuji Elevators demonstrates our ability to handle specialized, high-value orders, positioning us as a long-term partner for both complex projects and routine supplies.
        </p>
      </div>

      {/* Legal & Compliance */}
      <div className="py-16 px-8 md:px-16 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Legal & Compliance</h2>
        <ul className="list-disc list-inside space-y-3 text-lg">
          <li>Fully registered company in Rwanda</li>
          <li>Tax compliant (TIN: 122907893)</li>
          <li>Imports and supplies meet international and national quality standards</li>
          <li>Certificates of Conformity (CoC), warranties, and compliance documents provided where required</li>
        </ul>
      </div>

      {/* Contact Information */}
      <div className="py-16 px-8 md:px-16 lg:px-24 bg-[#F8FAFC]">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Contact Information</h2>
        <p className="text-lg mb-2"><strong>Email:</strong> info@uzasolutionsltd.com</p>
        <p className="text-lg mb-2"><strong>Phone:</strong> ‪+250 788 371 081‬‬</p>
        <p className="text-lg mb-2"><strong>Websites:</strong> <a href="https://www.uzasolutionsltd.com" className="text-[#FBAF43] underline">www.uzasolutionsltd.com</a> | <a href="https://www.uzabulk.com" className="text-[#FBAF43] underline">www.uzabulk.com</a></p>
        <p className="text-lg"><strong>Local Address:</strong> Nyarurembo, Kiyovu, Nyarugenge District, Kigali City, Rwanda</p>
      </div>
    </section>
  )
}
