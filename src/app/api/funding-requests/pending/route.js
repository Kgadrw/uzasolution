import connectDB from '@/lib/db/connect'
import FundingRequest from '@/lib/db/models/FundingRequest'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { user }) {
  try {
    await connectDB()
    
    const requests = await FundingRequest.find({ status: 'pending' })
      .populate('project', 'title beneficiary')
      .sort({ createdAt: -1 })

    return successResponse({ requests })
  } catch (error) {
    console.error('Get pending funding requests error:', error)
    return errorResponse('Failed to fetch pending requests', 500)
  }
}

export const GET_handler = authMiddleware(GET, { requireAdmin: true })

export { GET_handler as GET }






