'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export default function ComingSoonModal({ 
  isOpen,
  onClose,
  title, 
  description, 
  features = [], 
  launchDate = "Q2 2025",
  serviceType = "service"
}) {
  const [email, setEmail] = useState('')
  const modalRef = React.useRef(null)

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose()
    }
  }

  const handleNotifyMe = (e) => {
    e.preventDefault()
    // Handle email notification signup
    if (email) {
      // You can add API call here to save email
      alert(`Thanks! We'll notify you at ${email} when ${title} launches.`)
      setEmail('')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            ref={modalRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-[#0E2A44] via-[#1B3A54] to-[#213348] text-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-br from-[#0E2A44] via-[#1B3A54] to-[#213348] border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <div className="inline-flex items-center gap-2 bg-[#FBAF43]/10 border border-[#FBAF43]/20 rounded-full px-4 py-2">
                  <Clock className="w-4 h-4 text-[#FBAF43]" />
                  <span className="text-sm font-medium text-[#FBAF43]">Coming Soon</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 md:px-8 py-6">
                {/* Hero Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-2xl md:text-3xl font-extrabold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {title}
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                  >
                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">What to Expect</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * index }}
                          className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                        >
                          <div className="w-10 h-10 bg-[#FBAF43]/20 rounded-lg flex items-center justify-center mb-3">
                            <div className="w-5 h-5 bg-[#FBAF43] rounded-md" />
                          </div>
                          <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                          <p className="text-gray-400 text-sm">{feature.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 md:p-8 mb-6"
                >
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Stay Updated</h2>
                  <p className="text-gray-300 mb-6 text-center text-sm md:text-base">
                    Be the first to know when {title} launches. Get early access and exclusive updates.
                  </p>
                  
                  <form onSubmit={handleNotifyMe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                    />
                    <button 
                      type="submit"
                      className="px-6 py-3 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold rounded-full transition-colors whitespace-nowrap"
                    >
                      Notify Me
                    </button>
                  </form>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center"
                >
                  <h2 className="text-xl font-bold mb-4">Explore Our Current Solutions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link 
                      href="https://www.uzabulk.com/" 
                      className="group bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                      onClick={onClose}
                    >
                      <h3 className="text-base font-semibold mb-2 group-hover:text-[#FBAF43] transition-colors">UZA Bulk</h3>
                      <p className="text-gray-400 text-sm">Bulk procurement and sourcing platform</p>
                      <div className="mt-3 text-[#FBAF43] text-sm font-medium">Available Now →</div>
                    </Link>
                    
                    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 opacity-60">
                      <h3 className="text-base font-semibold mb-2">UZA Mall</h3>
                      <p className="text-gray-400 text-sm">E-commerce marketplace platform</p>
                      <div className="mt-3 text-gray-500 text-sm">Coming Soon</div>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 opacity-60">
                      <h3 className="text-base font-semibold mb-2">UZA Logistics</h3>
                      <p className="text-gray-400 text-sm">End-to-end logistics management</p>
                      <div className="mt-3 text-gray-500 text-sm">Coming Soon</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
