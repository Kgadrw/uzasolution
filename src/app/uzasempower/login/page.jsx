'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import { login, storeAuthData, getDashboardRoute } from '@/lib/api/auth'

export default function UZAEmpowerLogin() {
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
    // Clear errors when user starts typing
    if (errors[name] || errors.general) {
      setErrors({})
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
    
    // Validate form
    if (!validateForm()) {
      return
    }

    // Clear previous errors and set loading
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

      // Store authentication data
      const { user, token, refreshToken } = result.data
      storeAuthData(user, token, refreshToken)

      // Get dashboard route based on role
      const dashboardRoute = getDashboardRoute(user.role)
      
      // Navigate to dashboard
      router.push(dashboardRoute)
      
    } catch (error) {
      // Handle unexpected errors
      console.error('Login error:', error)
      setErrors({ 
        general: error.message || 'An unexpected error occurred. Please try again.' 
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen bg-white flex items-center justify-center p-4 relative" style={{ overflow: 'hidden', height: '100vh' }}>
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Login Form */}
            <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white p-6 sm:p-8 border border-gray-200"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* General Error */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm"
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
                  className={`block w-full pl-10 pr-3 py-2.5 border-2 focus:outline-none focus:ring-2 focus:ring-[#FBAF43]/20 text-sm ${
                    errors.email 
                      ? 'border-red-400 focus:border-red-500' 
                      : focusedField === 'email'
                      ? 'border-[#FBAF43] bg-white'
                      : 'border-gray-300'
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
                  className={`block w-full pl-10 pr-10 py-2.5 border-2 focus:outline-none focus:ring-2 focus:ring-[#FBAF43]/20 text-sm ${
                    errors.password 
                      ? 'border-red-400 focus:border-red-500' 
                      : focusedField === 'password'
                      ? 'border-[#FBAF43] bg-white'
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
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
                <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-700 font-medium cursor-pointer">
                  Remember me
                </label>
                </div>
                  <Link
                href="#" 
                className="text-xs font-semibold text-[#FBAF43]"
                  >
                Forgot password?
                  </Link>
          </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#FBAF43] text-white font-semibold py-2.5 px-4 text-sm flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </motion.button>

          </form>

          {/* Sign Up Link */}
          <div className="mt-6 pt-5 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-600">
              Don't have an account?{' '}
            <Link
                href="/uzasempower/signup" 
                className="text-[#FBAF43] font-semibold"
            >
                Create an account
            </Link>
            </p>
          </div>
        </motion.div>
          </motion.div>
    </div>
  )
}
