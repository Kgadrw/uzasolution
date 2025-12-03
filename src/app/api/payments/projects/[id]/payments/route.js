import connectDB from '@/lib/db/connect'
import Payment from '@/lib/db/models/Payment'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params, user }) {
  try {
    await connectDB()
    
    const payments = await Payment.find({ project: params.id })
      .populate('pledge')
      .sort({ createdAt: -1 })

    return successResponse({ payments })
  } catch (error) {
    console.error('Get project payments error:', error)
    return errorResponse('Failed to fetch payments', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }






