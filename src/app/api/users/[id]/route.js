import connectDB from '@/lib/db/connect'
import User from '@/lib/db/models/User'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params, user }) {
  try {
    await connectDB()
    
    // Check if user is admin
    if (user.role !== 'admin') {
      return errorResponse('Forbidden - Admin access required', 403)
    }

    const userDoc = await User.findById(params.id)
    if (!userDoc) {
      return errorResponse('User not found', 404)
    }

    return successResponse({ user: userDoc.toJSON() })
  } catch (error) {
    console.error('Get user error:', error)
    return errorResponse('Failed to fetch user', 500)
  }
}

export const GET_handler = authMiddleware(GET, { requireAdmin: true })

export { GET_handler as GET }






