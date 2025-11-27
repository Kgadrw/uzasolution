'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Users, ArrowLeft } from 'lucide-react'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('../../../components/navbar'))
const Footer = dynamic(() => import('../../../components/footer'))

export default function UZAEmpowerLogin() {
  const [selectedRole, setSelectedRole] = useState(null)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/uzasempower"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FBAF43] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to UZA Empower</span>
          </Link>

          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-4">
              Partner with UZA Empower
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Choose how you'd like to get involved in transforming lives across Africa
            </p>
          </motion.div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
            {/* Donor Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 cursor-pointer ${
                selectedRole === 'donor'
                  ? 'border-[#FBAF43] shadow-2xl scale-105'
                  : 'border-gray-200 hover:border-[#FBAF43] hover:shadow-xl'
              }`}
              onClick={() => setSelectedRole('donor')}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-[#E5243B] to-[#C5192D] rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#00142B] mb-4">
                  I'm a Donor
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Fund projects, support entrepreneurs, and create lasting impact in communities across Africa. Your contribution helps transform lives and build sustainable businesses.
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-2 mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FBAF43] mt-1">✓</span>
                    <span>Fund new projects and initiatives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FBAF43] mt-1">✓</span>
                    <span>Support entrepreneurs directly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FBAF43] mt-1">✓</span>
                    <span>Track your impact in real-time</span>
                  </li>
                </ul>
                {selectedRole === 'donor' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full"
                  >
                    <Link
                      href="/uzasempower/login/donor"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-6 py-3 rounded-full transition-all duration-300"
                    >
                      Continue as Donor
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Beneficiary Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 cursor-pointer ${
                selectedRole === 'beneficiary'
                  ? 'border-[#FBAF43] shadow-2xl scale-105'
                  : 'border-gray-200 hover:border-[#FBAF43] hover:shadow-xl'
              }`}
              onClick={() => setSelectedRole('beneficiary')}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-[#19486A] to-[#00689D] rounded-full flex items-center justify-center mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#00142B] mb-4">
                  I Want to Be Empowered
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Join UZA Empower to receive training, equipment, and support to start your own business. Turn your ambition into a sustainable livelihood.
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-2 mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FBAF43] mt-1">✓</span>
                    <span>Free entrepreneurship training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FBAF43] mt-1">✓</span>
                    <span>Lease-to-own equipment financing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FBAF43] mt-1">✓</span>
                    <span>Ongoing mentorship and support</span>
                  </li>
                </ul>
                {selectedRole === 'beneficiary' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full"
                  >
                    <Link
                      href="/uzasempower/login/beneficiary"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-6 py-3 rounded-full transition-all duration-300"
                    >
                      Continue as Beneficiary
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Info Section */}
          <motion.div
            className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-600 mb-4">
              Have questions? We're here to help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#FBAF43] hover:text-[#e59e3b] font-semibold transition-colors"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

