import connectDB from '@/lib/db/connect'
import FundingRequest from '@/lib/db/models/FundingRequest'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params, user }) {
  try {
    await connectDB()
    
    const request = await FundingRequest.findById(params.id)
      .populate('project', 'title beneficiary')

    if (!request) {
      return errorResponse('Funding request not found', 404)
    }

    return successResponse({ request })
  } catch (error) {
    console.error('Get funding request error:', error)
    return errorResponse('Failed to fetch funding request', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }






