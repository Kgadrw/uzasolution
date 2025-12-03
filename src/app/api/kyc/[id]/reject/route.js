import connectDB from '@/lib/db/connect'
import KYC from '@/lib/db/models/KYC'
import User from '@/lib/db/models/User'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function PUT(req, { params, user }) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { rejectionReason } = body

    const kyc = await KYC.findById(params.id).populate('user')
    if (!kyc) {
      return errorResponse('KYC submission not found', 404)
    }

    kyc.status = 'rejected'
    kyc.reviewedAt = new Date()
    kyc.reviewedBy = user.userId
    kyc.rejectionReason = rejectionReason || 'Documents do not meet requirements'
    await kyc.save()

    // Update user KYC status
    await User.findByIdAndUpdate(kyc.user._id, {
      kycStatus: 'rejected',
    })

    return successResponse({ kyc, message: 'KYC rejected' })
  } catch (error) {
    console.error('Reject KYC error:', error)
    return errorResponse('Failed to reject KYC', 500)
  }
}

export const PUT_handler = authMiddleware(PUT, { requireAdmin: true })

export { PUT_handler as PUT }






