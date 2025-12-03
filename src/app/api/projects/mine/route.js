import connectDB from '@/lib/db/connect'
import Project from '@/lib/db/models/Project'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { user }) {
  try {
    await connectDB()
    
    const projects = await Project.find({ beneficiary: user.userId })
      .sort({ createdAt: -1 })

    return successResponse({ projects })
  } catch (error) {
    console.error('Get my projects error:', error)
    return errorResponse('Failed to fetch projects', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }






