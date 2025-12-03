import connectDB from '@/lib/db/connect'
import FundingRequest from '@/lib/db/models/FundingRequest'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function PUT(req, { params, user }) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { rejectionReason } = body

    const request = await FundingRequest.findById(params.id)
    if (!request) {
      return errorResponse('Funding request not found', 404)
    }

    request.status = 'rejected'
    request.reviewedAt = new Date()
    request.reviewedBy = user.userId
    request.rejectionReason = rejectionReason
    await request.save()

    return successResponse({ request, message: 'Funding request rejected' })
  } catch (error) {
    console.error('Reject funding request error:', error)
    return errorResponse('Failed to reject funding request', 500)
  }
}

export const PUT_handler = authMiddleware(PUT, { requireAdmin: true })

export { PUT_handler as PUT }






