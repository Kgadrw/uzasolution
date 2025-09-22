'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '@components/navbar'
import Footer from '@components/footer'

export default function ComingSoon({ 
  title, 
  description, 
  features = [], 
  launchDate = "Q2 2025",
  serviceType = "service"
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E2A44] via-[#1B3A54] to-[#213348] text-white">
      {/* Use existing navbar */}
      <Navbar initialSolid={true} />

      {/* Main Content */}
      <div className="px-8 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#FBAF43]/10 border border-[#FBAF43]/20 rounded-full px-4 py-2 mb-8">
              <Clock className="w-4 h-4 text-[#FBAF43]" />
              <span className="text-sm font-medium text-[#FBAF43]">Coming Soon</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>

            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 rounded-full px-6 py-3">
              <span className="text-[#FBAF43] font-semibold">Expected Launch:</span>
              <span className="text-white">{launchDate}</span>
            </div>
          </motion.div>

          {/* Features Grid */}
          {features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-12">What to Expect</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#FBAF43]/20 rounded-xl flex items-center justify-center mb-4">
                      <div className="w-6 h-6 bg-[#FBAF43] rounded-lg" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Be the first to know when {title} launches. Get early access and exclusive updates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
              />
              <button className="px-6 py-3 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold rounded-lg transition-colors">
                Notify Me
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@uzasolutionsltd.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+250 788 371 081</span>
              </div>
            </div>
          </motion.div>

          {/* Related Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-8">Explore Our Current Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                href="https://www.uzabulk.com/" 
                className="group bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[#FBAF43] transition-colors">UZA Bulk</h3>
                <p className="text-gray-400 text-sm">Bulk procurement and sourcing platform</p>
                <div className="mt-4 text-[#FBAF43] text-sm font-medium">Available Now →</div>
              </Link>
              
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 opacity-60">
                <h3 className="text-lg font-semibold mb-2">UZA Mall</h3>
                <p className="text-gray-400 text-sm">E-commerce marketplace platform</p>
                <div className="mt-4 text-gray-500 text-sm">Coming Soon</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 opacity-60">
                <h3 className="text-lg font-semibold mb-2">UZA Logistics</h3>
                <p className="text-gray-400 text-sm">End-to-end logistics management</p>
                <div className="mt-4 text-gray-500 text-sm">Coming Soon</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Use existing footer */}
      <Footer />
    </div>
  )
}
