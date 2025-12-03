import connectDB from '@/lib/db/connect'
import KYC from '@/lib/db/models/KYC'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { user }) {
  try {
    await connectDB()
    
    const kycs = await KYC.find({ status: 'pending' })
      .populate('user', 'name email phone')
      .populate('project', 'title')
      .sort({ createdAt: -1 })

    return successResponse({ kycs })
  } catch (error) {
    console.error('Get pending KYC error:', error)
    return errorResponse('Failed to fetch pending KYC', 500)
  }
}

export const GET_handler = authMiddleware(GET, { requireAdmin: true })

export { GET_handler as GET }






