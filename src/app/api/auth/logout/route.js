import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connect'
import User from '@/lib/db/models/User'
import { authMiddleware } from '@/lib/auth'
import { successResponse } from '@/lib/utils'

async function handler(req, { user }) {
  try {
    await connectDB()
    
    await User.findByIdAndUpdate(user.userId, {
      $unset: { refreshToken: 1 },
    })

    return successResponse({ message: 'Logout successful' })
  } catch (error) {
    console.error('Logout error:', error)
    return successResponse({ message: 'Logout successful' }) // Always succeed
  }
}

export const POST = authMiddleware(handler)






