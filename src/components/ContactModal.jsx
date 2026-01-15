'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2, Rocket, X } from 'lucide-react'

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', or null
  const [errors, setErrors] = useState({})
  const [showRocket, setShowRocket] = useState(false)
  const formRef = useRef(null)
  const modalRef = useRef(null)

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setSubmitStatus(null)

    try {
      // Send email using API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          message: formData.message
        })
      })

      if (response.ok) {
        // Success
        setShowRocket(true)
        setSubmitStatus('success')
        setIsLoading(false)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          message: ''
        })
        
        // Hide rocket after animation and close modal after delay
        setTimeout(() => {
          setShowRocket(false)
        }, 2000)
        
        setTimeout(() => {
          onClose()
          setSubmitStatus(null)
        }, 3000)
      } else {
        // Error
        setSubmitStatus('error')
        setIsLoading(false)
      }

    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      message: ''
    })
    setErrors({})
    setSubmitStatus(null)
    onClose()
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent">
                    Contact Us
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    We'll get back to you within 1 business day
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Contact Info */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Email</p>
                    <p className="text-gray-600">info@uzasolutions.com</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Phone</p>
                    <p className="text-gray-600">+250 788 371 081</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Location</p>
                    <p className="text-gray-600">Kigali, Rwanda</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="p-6">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First name *
                      </label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className={`w-full rounded-lg px-4 py-3 border bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm transition-all ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last name *
                      </label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className={`w-full rounded-lg px-4 py-3 border bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm transition-all ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@company.com"
                      className={`w-full rounded-lg px-4 py-3 border bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="UZA Solutions"
                      className="w-full rounded-lg px-4 py-3 border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help"
                      rows={5}
                      className={`w-full rounded-lg px-4 py-3 border bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm resize-none transition-all ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-red-100 text-red-800 rounded-lg border border-red-200"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Failed to send message. Please try again.</span>
                    </motion.div>
                  )}

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-green-100 text-green-800 rounded-lg border border-green-200"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Message sent successfully!</span>
                    </motion.div>
                  )}

                  <div className="relative">
                    <button 
                      type="submit" 
                      disabled={isLoading || submitStatus === 'success'}
                      className={`w-full inline-flex justify-center items-center gap-2 font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ${
                        submitStatus === 'success' 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : isLoading 
                            ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                            : 'bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900'
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {isLoading ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2"
                          >
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending...</span>
                          </motion.div>
                        ) : submitStatus === 'success' ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Sent!</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="send"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            <span>Send message</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>

                    {/* Flying Rocket Animation */}
                    <AnimatePresence>
                      {showRocket && (
                        <motion.div
                          initial={{ 
                            opacity: 0, 
                            scale: 0.5,
                            x: 0,
                            y: 0
                          }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1,
                            x: [0, -20, -40, -60, -80, -100, -120, -140, -160, -180, -200],
                            y: [0, -10, -20, -30, -40, -50, -60, -70, -80, -90, -100]
                          }}
                          exit={{ 
                            opacity: 0, 
                            scale: 0.5,
                            x: -200,
                            y: -100
                          }}
                          transition={{ 
                            duration: 2,
                            ease: "easeOut"
                          }}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                        >
                          <Rocket className="w-6 h-6 text-[#FBAF43] drop-shadow-lg" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
