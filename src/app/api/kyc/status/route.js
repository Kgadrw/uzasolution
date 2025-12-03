import connectDB from '@/lib/db/connect'
import KYC from '@/lib/db/models/KYC'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { user }) {
  try {
    await connectDB()
    
    const kyc = await KYC.findOne({ user: user.userId })
      .sort({ createdAt: -1 })
      .populate('project', 'title')

    if (!kyc) {
      return successResponse({ 
        status: 'pending',
        message: 'No KYC submission found' 
      })
    }

    return successResponse({ kyc })
  } catch (error) {
    console.error('Get KYC status error:', error)
    return errorResponse('Failed to fetch KYC status', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }






