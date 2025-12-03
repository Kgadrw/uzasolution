import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connect'
import User from '@/lib/db/models/User'
import { validateRequest, loginSchema } from '@/lib/validation'
import { generateToken, generateRefreshToken } from '@/lib/auth'
import { errorResponse, successResponse } from '@/lib/utils'

export async function POST(req) {
  try {
    await connectDB()
    
    const validation = await validateRequest(loginSchema)(req)
    if (!validation.success) {
      return errorResponse('Validation failed', 400, validation.error)
    }

    const { email, password } = validation.data

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return errorResponse('Invalid email or password', 401)
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return errorResponse('Invalid email or password', 401)
    }

    // Check if user is active
    if (!user.isActive) {
      return errorResponse('Account is inactive', 403)
    }

    const token = generateToken(user)
    const refreshToken = generateRefreshToken(user)

    // Update last login and refresh token
    user.lastLogin = new Date()
    user.refreshToken = refreshToken
    await user.save()

    return successResponse({
      message: 'Login successful',
      user: user.toJSON(),
      token,
      refreshToken,
    })
  } catch (error) {
    console.error('Login error:', error)
    return errorResponse('Login failed', 500)
  }
}






