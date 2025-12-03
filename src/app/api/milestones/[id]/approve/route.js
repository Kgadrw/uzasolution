import connectDB from '@/lib/db/connect'
import Milestone from '@/lib/db/models/Milestone'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function PUT(req, { params, user }) {
  try {
    await connectDB()
    
    const milestone = await Milestone.findById(params.id).populate('project')
    if (!milestone) {
      return errorResponse('Milestone not found', 404)
    }

    const body = await req.json()
    const { adminComment } = body

    milestone.status = 'approved'
    milestone.reviewedAt = new Date()
    milestone.reviewedBy = user.userId
    milestone.completedAt = new Date()
    if (adminComment) {
      milestone.adminComment = adminComment
    }
    await milestone.save()

    return successResponse({ milestone, message: 'Milestone approved' })
  } catch (error) {
    console.error('Approve milestone error:', error)
    return errorResponse('Failed to approve milestone', 500)
  }
}

export const PUT_handler = authMiddleware(PUT, { requireAdmin: true })

export { PUT_handler as PUT }






