import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connect'
import User from '@/lib/db/models/User'
import { verifyToken, generateToken, generateRefreshToken } from '@/lib/auth'
import { errorResponse, successResponse } from '@/lib/utils'

export async function POST(req) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { refreshToken } = body

    if (!refreshToken) {
      return errorResponse('Refresh token required', 400)
    }

    const decoded = verifyToken(refreshToken)
    if (!decoded || decoded.type !== 'refresh') {
      return errorResponse('Invalid refresh token', 401)
    }

    const user = await User.findById(decoded.userId)
    if (!user || user.refreshToken !== refreshToken) {
      return errorResponse('Invalid refresh token', 401)
    }

    const newToken = generateToken(user)
    const newRefreshToken = generateRefreshToken(user)

    user.refreshToken = newRefreshToken
    await user.save()

    return successResponse({
      token: newToken,
      refreshToken: newRefreshToken,
    })
  } catch (error) {
    console.error('Refresh error:', error)
    return errorResponse('Token refresh failed', 500)
  }
}






