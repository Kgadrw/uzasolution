import connectDB from '@/lib/db/connect'
import FundingRequest from '@/lib/db/models/FundingRequest'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { user }) {
  try {
    await connectDB()
    
    const Project = (await import('@/lib/db/models/Project')).default
    const projects = await Project.find({ beneficiary: user.userId }).select('_id')
    const projectIds = projects.map(p => p._id)

    const requests = await FundingRequest.find({ project: { $in: projectIds } })
      .populate('project', 'title')
      .sort({ createdAt: -1 })

    return successResponse({ requests })
  } catch (error) {
    console.error('Get funding requests error:', error)
    return errorResponse('Failed to fetch funding requests', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }






