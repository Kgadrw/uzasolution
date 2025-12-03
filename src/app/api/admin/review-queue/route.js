import connectDB from '@/lib/db/connect'
import Project from '@/lib/db/models/Project'
import KYC from '@/lib/db/models/KYC'
import FundingRequest from '@/lib/db/models/FundingRequest'
import Milestone from '@/lib/db/models/Milestone'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { user }) {
  try {
    await connectDB()
    
    const [pendingProjects, pendingKYC, pendingFunding, pendingMilestones] = await Promise.all([
      Project.find({ status: 'pending' }).populate('beneficiary', 'name email').limit(10),
      KYC.find({ status: 'pending' }).populate('user', 'name email').limit(10),
      FundingRequest.find({ status: 'pending' }).populate('project', 'title').limit(10),
      Milestone.find({ status: 'evidence_submitted' }).populate('project', 'title').limit(10),
    ])

    return successResponse({
      pendingProjects,
      pendingKYC,
      pendingFunding,
      pendingMilestones,
    })
  } catch (error) {
    console.error('Get review queue error:', error)
    return errorResponse('Failed to fetch review queue', 500)
  }
}

export const GET_handler = authMiddleware(GET, { requireAdmin: true })

export { GET_handler as GET }






