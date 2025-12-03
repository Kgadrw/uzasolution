import connectDB from '@/lib/db/connect'
import Notification from '@/lib/db/models/Notification'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function PUT(req, { params, user }) {
  try {
    await connectDB()
    
    const notification = await Notification.findOne({
      _id: params.id,
      user: user.userId,
    })

    if (!notification) {
      return errorResponse('Notification not found', 404)
    }

    notification.isRead = true
    notification.readAt = new Date()
    await notification.save()

    return successResponse({ notification, message: 'Notification marked as read' })
  } catch (error) {
    console.error('Mark notification read error:', error)
    return errorResponse('Failed to mark notification as read', 500)
  }
}

export const PUT_handler = authMiddleware(PUT)

export { PUT_handler as PUT }






