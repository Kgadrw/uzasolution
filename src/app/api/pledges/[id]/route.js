import connectDB from '@/lib/db/connect'
import Pledge from '@/lib/db/models/Pledge'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params, user }) {
  try {
    await connectDB()
    
    const pledge = await Pledge.findById(params.id)
      .populate('project', 'title description')
      .populate('donor', 'name email')

    if (!pledge) {
      return errorResponse('Pledge not found', 404)
    }

    return successResponse({ pledge })
  } catch (error) {
    console.error('Get pledge error:', error)
    return errorResponse('Failed to fetch pledge', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }






