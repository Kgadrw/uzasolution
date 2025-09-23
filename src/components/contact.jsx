'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function Contact() {
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
  const formRef = useRef(null)

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
      // Create the email content
      const emailContent = `
New Contact Form Submission

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company || 'Not provided'}

Message:
${formData.message}

---
This message was sent from the UZA Solutions contact form.
      `.trim()

      // Send email using a simple mailto approach
      const subject = `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`
      const mailtoLink = `mailto:info@uzasolutions.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`
      
      // Open mailto link
      window.open(mailtoLink, '_blank')
      
      // Simulate success (since mailto doesn't provide feedback)
      setTimeout(() => {
        setSubmitStatus('success')
        setIsLoading(false)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          message: ''
        })
      }, 1000)

    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative w-full h-[60vh] md:h-[40vh] flex items-center justify-center"
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
              <p><strong>Email:</strong> info@uzasolutions.com</p>
              <p><strong>Phone:</strong> +250 788 371 081</p>
              <p><strong>Address:</strong> Nyarurembo, Kiyovu, Nyarugenge, Kigali, Rwanda</p>
            </div>
          </div>

          {/* Upgraded Contact Form */}
          <div className="bg-gradient-to-br from-[#fef9f0] to-[#fff4e0] py-12 px-6 md:px-10 rounded-2xl shadow-2xl border border-[#fbe1a6]">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First name *</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className={`w-full rounded-xl px-4 py-3 border bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm transition-all ${
                      errors.firstName ? 'border-red-500' : 'border-[#fcd77f]'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last name *</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className={`w-full rounded-xl px-4 py-3 border bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm transition-all ${
                      errors.lastName ? 'border-red-500' : 'border-[#fcd77f]'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@company.com"
                  className={`w-full rounded-xl px-4 py-3 border bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm transition-all ${
                    errors.email ? 'border-red-500' : 'border-[#fcd77f]'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="UZA Solutions"
                  className="w-full rounded-xl px-4 py-3 border border-[#fcd77f] bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help"
                  rows={5}
                  className={`w-full rounded-xl px-4 py-3 border bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] shadow-sm resize-none transition-all ${
                    errors.message ? 'border-red-500' : 'border-[#fcd77f]'
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-green-100 text-green-800 rounded-xl border border-green-200"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Message sent successfully! Your default email client will open.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-100 text-red-800 rounded-xl border border-red-200"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Failed to send message. Please try again.</span>
                </motion.div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full md:w-auto inline-flex justify-center items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] disabled:bg-gray-400 disabled:cursor-not-allowed text-gray-900 font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
