import connectDB from '@/lib/db/connect'
import TopUp from '@/lib/db/models/TopUp'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function PUT(req, { params, user }) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { rejectionReason } = body

    const topUp = await TopUp.findById(params.id)
    if (!topUp) {
      return errorResponse('Top-up request not found', 404)
    }

    topUp.status = 'rejected'
    topUp.reviewedAt = new Date()
    topUp.reviewedBy = user.userId
    topUp.rejectionReason = rejectionReason
    await topUp.save()

    return successResponse({ topUp, message: 'Top-up rejected' })
  } catch (error) {
    console.error('Reject top-up error:', error)
    return errorResponse('Failed to reject top-up', 500)
  }
}

export const PUT_handler = authMiddleware(PUT, { requireAdmin: true })

export { PUT_handler as PUT }






