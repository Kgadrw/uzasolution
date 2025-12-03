import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connect'
import User from '@/lib/db/models/User'
import { validateRequest, registerSchema } from '@/lib/validation'
import { generateToken, generateRefreshToken } from '@/lib/auth'
import { errorResponse, successResponse } from '@/lib/utils'

export async function POST(req) {
  try {
    await connectDB()
    
    const validation = await validateRequest(registerSchema)(req)
    if (!validation.success) {
      return errorResponse('Validation failed', 400, validation.error)
    }

    const { name, email, phone, password, role } = validation.data

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return errorResponse('User with this email already exists', 400)
    }

    // Create user
    const user = new User({
      name,
      email,
      phone,
      password,
      role,
    })

    await user.save()

    const token = generateToken(user)
    const refreshToken = generateRefreshToken(user)

    // Save refresh token
    user.refreshToken = refreshToken
    await user.save()

    return successResponse({
      message: 'User registered successfully',
      user: user.toJSON(),
      token,
      refreshToken,
    }, 201)
  } catch (error) {
    console.error('Register error:', error)
    return errorResponse('Registration failed', 500)
  }
}


