import connectDB from '@/lib/db/connect'
import Project from '@/lib/db/models/Project'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function POST(req, { params, user }) {
  try {
    await connectDB()
    
    const project = await Project.findById(params.id)
    if (!project) {
      return errorResponse('Project not found', 404)
    }

    // Check ownership
    if (project.beneficiary.toString() !== user.userId) {
      return errorResponse('Forbidden', 403)
    }

    project.status = 'completed'
    project.completedAt = new Date()
    await project.save()

    return successResponse({ project, message: 'Project marked as completed' })
  } catch (error) {
    console.error('Complete project error:', error)
    return errorResponse('Failed to complete project', 500)
  }
}

export const POST_handler = authMiddleware(POST)

export { POST_handler as POST }






