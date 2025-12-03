import connectDB from '@/lib/db/connect'
import Project from '@/lib/db/models/Project'
import KYC from '@/lib/db/models/KYC'
import Alert from '@/lib/db/models/Alert'
import FundingRequest from '@/lib/db/models/FundingRequest'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { user }) {
  try {
    await connectDB()
    
    const [
      totalProjects,
      pendingReview,
      activeProjects,
      totalFunds,
      totalDisbursed,
      pendingTranches,
      alertsCount,
      kycPending,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: 'pending' }),
      Project.countDocuments({ status: 'active' }),
      Project.aggregate([{ $group: { _id: null, total: { $sum: '$requestedAmount' } } }]),
      Project.aggregate([{ $group: { _id: null, total: { $sum: '$totalDisbursed' } } }]),
      Project.countDocuments({ 'tranches.status': 'in_escrow' }),
      Alert.countDocuments({ status: 'open' }),
      KYC.countDocuments({ status: 'pending' }),
    ])

    const dashboard = {
      totalProjects,
      pendingReview,
      activeProjects,
      totalFunds: totalFunds[0]?.total || 0,
      totalDisbursed: totalDisbursed[0]?.total || 0,
      pendingTranches,
      alertsCount,
      kycPending,
      recentProjects: await Project.find()
        .populate('beneficiary', 'name')
        .sort({ createdAt: -1 })
        .limit(5),
    }

    return successResponse({ dashboard })
  } catch (error) {
    console.error('Get admin dashboard error:', error)
    return errorResponse('Failed to fetch dashboard data', 500)
  }
}

export const GET_handler = authMiddleware(GET, { requireAdmin: true })

export { GET_handler as GET }






