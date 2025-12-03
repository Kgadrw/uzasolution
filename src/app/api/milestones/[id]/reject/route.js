import connectDB from '@/lib/db/connect'
import Milestone from '@/lib/db/models/Milestone'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function PUT(req, { params, user }) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { rejectionReason } = body

    const milestone = await Milestone.findById(params.id)
    if (!milestone) {
      return errorResponse('Milestone not found', 404)
    }

    milestone.status = 'rejected'
    milestone.reviewedAt = new Date()
    milestone.reviewedBy = user.userId
    milestone.adminComment = rejectionReason || 'Evidence does not meet requirements'
    await milestone.save()

    return successResponse({ milestone, message: 'Milestone rejected' })
  } catch (error) {
    console.error('Reject milestone error:', error)
    return errorResponse('Failed to reject milestone', 500)
  }
}

export const PUT_handler = authMiddleware(PUT, { requireAdmin: true })

export { PUT_handler as PUT }






