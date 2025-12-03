import connectDB from '@/lib/db/connect'
import Pledge from '@/lib/db/models/Pledge'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { user }) {
  try {
    await connectDB()
    
    const pledges = await Pledge.find({ donor: user.userId })
      .populate('project', 'title description status')
      .sort({ createdAt: -1 })

    return successResponse({ pledges })
  } catch (error) {
    console.error('Get pledges error:', error)
    return errorResponse('Failed to fetch pledges', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }






