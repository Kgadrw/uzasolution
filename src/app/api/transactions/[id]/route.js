import connectDB from '@/lib/db/connect'
import Transaction from '@/lib/db/models/Transaction'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params, user }) {
  try {
    await connectDB()
    
    const transaction = await Transaction.findById(params.id)
      .populate('project', 'title beneficiary')

    if (!transaction) {
      return errorResponse('Transaction not found', 404)
    }

    return successResponse({ transaction })
  } catch (error) {
    console.error('Get transaction error:', error)
    return errorResponse('Failed to fetch transaction', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }






