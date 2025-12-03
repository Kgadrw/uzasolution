import connectDB from '@/lib/db/connect'
import TopUp from '@/lib/db/models/TopUp'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function PUT(req, { params, user }) {
  try {
    await connectDB()
    
    const topUp = await TopUp.findById(params.id).populate('project')
    if (!topUp) {
      return errorResponse('Top-up request not found', 404)
    }

    topUp.status = 'approved'
    topUp.reviewedAt = new Date()
    topUp.reviewedBy = user.userId
    await topUp.save()

    return successResponse({ topUp, message: 'Top-up approved' })
  } catch (error) {
    console.error('Approve top-up error:', error)
    return errorResponse('Failed to approve top-up', 500)
  }
}

export const PUT_handler = authMiddleware(PUT, { requireAdmin: true })

export { PUT_handler as PUT }






