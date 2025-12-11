'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Heart, Mail, Lock, Eye, EyeOff, Sparkles, TrendingUp } from 'lucide-react'
import dynamic from 'next/dynamic'
import { login, storeAuthData } from '@/lib/api/auth'

const Navbar = dynamic(() => import('../../../../components/navbar'))
const Footer = dynamic(() => import('../../../../components/footer'))

export default function DonorLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setErrors({})
    setIsLoading(true)
    
    try {
      // Call login API
      const result = await login(formData.email, formData.password)

      // Check if login was successful
      if (!result.success) {
        setErrors({ 
          general: result.message || 'Invalid email or password' 
        })
        setIsLoading(false)
        return
      }

      // Verify user is a donor
      const role = result.data.user.role?.toLowerCase()
      if (role !== 'donor') {
        setErrors({ 
          general: 'This login is for donors only. Please use the correct login page.' 
        })
        setIsLoading(false)
        return
      }

      // Store authentication data
      const { user, token, refreshToken } = result.data
      storeAuthData(user, token, refreshToken)

      // Redirect to donor dashboard
      router.push('/uzasempower/login/donor/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ 
        general: error.message || 'An unexpected error occurred. Please try again.' 
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      {/* Top Loading Bar */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
          <motion.div
            className="h-full bg-[#FBAF43]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      )}
      
      <Navbar />
      
      <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#E5243B]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#FBAF43]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-xl mx-auto relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link 
              href="/uzasempower/login"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-[#FBAF43] transition-all duration-300 mb-6 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Partner Selection</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-[#E5243B] to-[#C5192D] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            >
              <Heart className="w-8 h-8 text-white" fill="currentColor" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-3">
              Donor Login
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Sign in to fund projects and create lasting impact
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200/50"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* General Error */}
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm rounded-lg"
                >
                  {errors.general}
                </motion.div>
              )}
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
                    focusedField === 'email' ? 'text-[#FBAF43]' : 'text-gray-400'
                  }`}>
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`block w-full pl-10 pr-3 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FBAF43]/20 transition-all duration-300 bg-gray-50/50 text-sm ${
                      errors.email 
                        ? 'border-red-400 focus:border-red-500' 
                        : focusedField === 'email'
                        ? 'border-[#FBAF43] bg-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-xs text-red-500 font-medium"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
                    focusedField === 'password' ? 'text-[#FBAF43]' : 'text-gray-400'
                  }`}>
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className={`block w-full pl-10 pr-10 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FBAF43]/20 transition-all duration-300 bg-gray-50/50 text-sm ${
                      errors.password 
                        ? 'border-red-400 focus:border-red-500' 
                        : focusedField === 'password'
                        ? 'border-[#FBAF43] bg-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-xs text-red-500 font-medium"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Forgot Password & Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center group cursor-pointer">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#FBAF43] focus:ring-[#FBAF43] border-gray-300 rounded cursor-pointer transition-all"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-700 font-medium cursor-pointer group-hover:text-gray-900 transition-colors">
                    Remember me
                  </label>
                </div>
                <Link 
                  href="#" 
                  className="text-xs font-semibold text-[#FBAF43] hover:text-[#e59e3b] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
                className={`w-full bg-gradient-to-r from-[#FBAF43] to-[#e59e3b] hover:from-[#e59e3b] hover:to-[#FBAF43] text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-sm ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  'Signing in...'
                ) : (
                  'Sign In'
                )}
              </motion.button>

            </form>

            {/* Sign Up Link */}
            <div className="mt-6 pt-5 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-600">
                Don't have an account?{' '}
                <Link 
                  href="/contact" 
                  className="text-[#FBAF43] hover:text-[#e59e3b] font-semibold transition-colors inline-flex items-center gap-1"
                >
                  Contact us to get started
                  <TrendingUp className="w-3.5 h-3.5" />
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

