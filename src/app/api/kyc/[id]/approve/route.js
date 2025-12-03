import connectDB from '@/lib/db/connect'
import KYC from '@/lib/db/models/KYC'
import User from '@/lib/db/models/User'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function PUT(req, { params, user }) {
  try {
    await connectDB()
    
    const kyc = await KYC.findById(params.id).populate('user')
    if (!kyc) {
      return errorResponse('KYC submission not found', 404)
    }

    kyc.status = 'verified'
    kyc.reviewedAt = new Date()
    kyc.reviewedBy = user.userId
    await kyc.save()

    // Update user KYC status
    await User.findByIdAndUpdate(kyc.user._id, {
      kycStatus: 'verified',
    })

    return successResponse({ kyc, message: 'KYC approved successfully' })
  } catch (error) {
    console.error('Approve KYC error:', error)
    return errorResponse('Failed to approve KYC', 500)
  }
}

export const PUT_handler = authMiddleware(PUT, { requireAdmin: true })

export { PUT_handler as PUT }






