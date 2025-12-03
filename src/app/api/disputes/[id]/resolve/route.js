import connectDB from '@/lib/db/connect'
import Dispute from '@/lib/db/models/Dispute'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function PUT(req, { params, user }) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { resolution } = body

    const dispute = await Dispute.findById(params.id)
    if (!dispute) {
      return errorResponse('Dispute not found', 404)
    }

    dispute.status = 'resolved'
    dispute.resolvedAt = new Date()
    dispute.resolvedBy = user.userId
    dispute.resolution = resolution
    await dispute.save()

    return successResponse({ dispute, message: 'Dispute resolved' })
  } catch (error) {
    console.error('Resolve dispute error:', error)
    return errorResponse('Failed to resolve dispute', 500)
  }
}

export const PUT_handler = authMiddleware(PUT, { requireAdmin: true })

export { PUT_handler as PUT }






