'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, User, Phone, Heart, Users, UserPlus } from 'lucide-react'

export default function UZAEmpowerSignup() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setFormData(prev => ({ ...prev, role }))
    setErrors(prev => ({ ...prev, role: '' }))
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = 'Phone number must be at least 10 characters'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select your role'
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
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrors({ 
          general: data.message || 'Registration failed' 
        })
        setIsLoading(false)
        return
      }

      // Store token and user data
      if (data.data?.token) {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))
      }

      // Redirect based on role
      const role = formData.role
      if (role === 'donor') {
        router.push('/uzasempower/login/donor/dashboard')
      } else if (role === 'beneficiary') {
        router.push('/uzasempower/login/beneficiary/dashboard')
      } else {
        router.push('/uzasempower/login')
      }
    } catch (error) {
      console.error('Signup error:', error)
      setErrors({ 
        general: 'An error occurred. Please try again.' 
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden" style={{ overflow: 'hidden' }}>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          >
            <h1 className="text-2xl md:text-3xl font-extrabold text-blue-600">
              Create Account
            </h1>
          </motion.div>
          <p className="text-sm text-gray-600">
            Join UZA Empower and make a difference
          </p>
        </div>

        {/* Signup Form */}
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

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-3">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleSelect('donor')}
                  className={`p-4 border-2 ${
                    selectedRole === 'donor'
                      ? 'border-[#FBAF43] bg-[#FBAF43]/10'
                      : 'border-gray-300'
                  }`}
                >
                  <Heart className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'donor' ? 'text-[#E5243B]' : 'text-gray-400'}`} fill={selectedRole === 'donor' ? 'currentColor' : 'none'} />
                  <span className={`text-sm font-semibold ${selectedRole === 'donor' ? 'text-[#E5243B]' : 'text-gray-600'}`}>
                    Donor
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelect('beneficiary')}
                  className={`p-4 border-2 ${
                    selectedRole === 'beneficiary'
                      ? 'border-[#FBAF43] bg-[#FBAF43]/10'
                      : 'border-gray-300'
                  }`}
                >
                  <Users className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'beneficiary' ? 'text-[#00689D]' : 'text-gray-400'}`} />
                  <span className={`text-sm font-semibold ${selectedRole === 'beneficiary' ? 'text-[#00689D]' : 'text-gray-600'}`}>
                    Beneficiary
                  </span>
                </button>
              </div>
              {errors.role && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium"
                >
                  {errors.role}
                </motion.p>
              )}
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
                  focusedField === 'name' ? 'text-[#FBAF43]' : 'text-gray-400'
                }`}>
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`block w-full pl-10 pr-3 py-2.5 border-2 focus:outline-none focus:ring-2 focus:ring-[#FBAF43]/20 text-sm ${
                    errors.name 
                      ? 'border-red-400 focus:border-red-500' 
                      : focusedField === 'name'
                      ? 'border-[#FBAF43] bg-white'
                      : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>

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

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
                  focusedField === 'phone' ? 'text-[#FBAF43]' : 'text-gray-400'
                }`}>
                  <Phone className="h-4 w-4" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className={`block w-full pl-10 pr-3 py-2.5 border-2 focus:outline-none focus:ring-2 focus:ring-[#FBAF43]/20 text-sm ${
                    errors.phone 
                      ? 'border-red-400 focus:border-red-500' 
                      : focusedField === 'phone'
                      ? 'border-[#FBAF43] bg-white'
                      : 'border-gray-300'
                  }`}
                  placeholder="+250 788 123 456"
                />
              </div>
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium"
                >
                  {errors.phone}
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
                  placeholder="At least 8 characters"
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
                  focusedField === 'confirmPassword' ? 'text-[#FBAF43]' : 'text-gray-400'
                }`}>
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  className={`block w-full pl-10 pr-10 py-2.5 border-2 focus:outline-none focus:ring-2 focus:ring-[#FBAF43]/20 text-sm ${
                    errors.confirmPassword 
                      ? 'border-red-400 focus:border-red-500' 
                      : focusedField === 'confirmPassword'
                      ? 'border-[#FBAF43] bg-white'
                      : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
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
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </>
              )}
            </motion.button>

          </form>

          {/* Login Link */}
          <div className="mt-6 pt-5 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/uzasempower/login" 
                className="text-[#FBAF43] font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

