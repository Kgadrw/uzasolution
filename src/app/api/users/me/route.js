import connectDB from '@/lib/db/connect'
import User from '@/lib/db/models/User'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { user }) {
  try {
    await connectDB()
    
    const userDoc = await User.findById(user.userId)
    if (!userDoc) {
      return errorResponse('User not found', 404)
    }

    return successResponse({ user: userDoc.toJSON() })
  } catch (error) {
    console.error('Get user error:', error)
    return errorResponse('Failed to fetch user', 500)
  }
}

async function PUT(req, { user }) {
  try {
    await connectDB()
    
    const body = await req.json()
    const allowedUpdates = ['name', 'phone', 'location', 'bankAccount', 'momoNumber', 'businessName']
    const updates = {}

    Object.keys(body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = body[key]
      }
    })

    const userDoc = await User.findByIdAndUpdate(
      user.userId,
      { $set: updates },
      { new: true, runValidators: true }
    )

    if (!userDoc) {
      return errorResponse('User not found', 404)
    }

    return successResponse({ user: userDoc.toJSON() })
  } catch (error) {
    console.error('Update user error:', error)
    return errorResponse('Failed to update user', 500)
  }
}

export const GET_handler = authMiddleware(GET)
export const PUT_handler = authMiddleware(PUT)

export { GET_handler as GET, PUT_handler as PUT }






