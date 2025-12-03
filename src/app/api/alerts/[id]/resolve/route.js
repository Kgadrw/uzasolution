import connectDB from '@/lib/db/connect'
import Alert from '@/lib/db/models/Alert'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function PUT(req, { params, user }) {
  try {
    await connectDB()
    
    const alert = await Alert.findById(params.id)
    if (!alert) {
      return errorResponse('Alert not found', 404)
    }

    alert.status = 'resolved'
    alert.resolvedAt = new Date()
    alert.resolvedBy = user.userId
    await alert.save()

    return successResponse({ alert, message: 'Alert resolved' })
  } catch (error) {
    console.error('Resolve alert error:', error)
    return errorResponse('Failed to resolve alert', 500)
  }
}

export const PUT_handler = authMiddleware(PUT, { requireAdmin: true })

export { PUT_handler as PUT }






