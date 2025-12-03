import connectDB from '@/lib/db/connect'
import Payment from '@/lib/db/models/Payment'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params, user }) {
  try {
    await connectDB()
    
    const payment = await Payment.findById(params.id)
      .populate('project', 'title')
      .populate('pledge')

    if (!payment) {
      return errorResponse('Payment not found', 404)
    }

    return successResponse({ payment })
  } catch (error) {
    console.error('Get payment error:', error)
    return errorResponse('Failed to fetch payment', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }






