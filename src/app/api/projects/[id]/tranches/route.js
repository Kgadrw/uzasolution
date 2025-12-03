import connectDB from '@/lib/db/connect'
import Project from '@/lib/db/models/Project'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params, user }) {
  try {
    await connectDB()
    
    const project = await Project.findById(params.id).select('tranches')
    if (!project) {
      return errorResponse('Project not found', 404)
    }

    return successResponse({ tranches: project.tranches })
  } catch (error) {
    console.error('Get tranches error:', error)
    return errorResponse('Failed to fetch tranches', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }






