import connectDB from '@/lib/db/connect'
import Dispute from '@/lib/db/models/Dispute'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { user }) {
  try {
    await connectDB()
    
    const disputes = await Dispute.find({ status: 'pending' })
      .populate('project', 'title')
      .populate('raisedBy', 'name email')
      .sort({ createdAt: -1 })

    return successResponse({ disputes })
  } catch (error) {
    console.error('Get pending disputes error:', error)
    return errorResponse('Failed to fetch pending disputes', 500)
  }
}

export const GET_handler = authMiddleware(GET, { requireAdmin: true })

export { GET_handler as GET }






