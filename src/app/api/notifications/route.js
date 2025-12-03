import connectDB from '@/lib/db/connect'
import Notification from '@/lib/db/models/Notification'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { user }) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(req.url)
    const unreadOnly = searchParams.get('unread') === 'true'

    const query = { user: user.userId }
    if (unreadOnly) {
      query.isRead = false
    }

    const notifications = await Notification.find(query)
      .populate('project', 'title')
      .sort({ createdAt: -1 })
      .limit(50)

    return successResponse({ notifications })
  } catch (error) {
    console.error('Get notifications error:', error)
    return errorResponse('Failed to fetch notifications', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }






