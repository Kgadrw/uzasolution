import connectDB from '@/lib/db/connect'
import TopUp from '@/lib/db/models/TopUp'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params, user }) {
  try {
    await connectDB()
    
    const topUp = await TopUp.findById(params.id)
      .populate('project', 'title description category')
      .populate('beneficiary', 'name email')
      .populate('reviewedBy', 'name email')

    if (!topUp) {
      return errorResponse('Top-up request not found', 404)
    }

    // Check access permissions
    const isOwner = topUp.beneficiary._id.toString() === user.userId
    const isAdmin = user.role === 'admin'
    
    if (!isOwner && !isAdmin) {
      return errorResponse('Forbidden', 403)
    }

    return successResponse({ topUp })
  } catch (error) {
    console.error('Get top-up error:', error)
    return errorResponse('Failed to fetch top-up request', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }

