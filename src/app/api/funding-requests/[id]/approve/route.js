import connectDB from '@/lib/db/connect'
import FundingRequest from '@/lib/db/models/FundingRequest'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function PUT(req, { params, user }) {
  try {
    await connectDB()
    
    const request = await FundingRequest.findById(params.id).populate('project')
    if (!request) {
      return errorResponse('Funding request not found', 404)
    }

    request.status = 'approved'
    request.reviewedAt = new Date()
    request.reviewedBy = user.userId
    await request.save()

    return successResponse({ request, message: 'Funding request approved' })
  } catch (error) {
    console.error('Approve funding request error:', error)
    return errorResponse('Failed to approve funding request', 500)
  }
}

export const PUT_handler = authMiddleware(PUT, { requireAdmin: true })

export { PUT_handler as PUT }






