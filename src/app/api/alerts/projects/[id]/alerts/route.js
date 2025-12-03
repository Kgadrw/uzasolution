import connectDB from '@/lib/db/connect'
import Alert from '@/lib/db/models/Alert'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params, user }) {
  try {
    await connectDB()
    
    const alerts = await Alert.find({ project: params.id })
      .sort({ createdAt: -1 })

    return successResponse({ alerts })
  } catch (error) {
    console.error('Get project alerts error:', error)
    return errorResponse('Failed to fetch alerts', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }






