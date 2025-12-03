import connectDB from '@/lib/db/connect'
import Project from '@/lib/db/models/Project'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function PUT(req, { params, user }) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { status } = body

    const project = await Project.findById(params.id)
    if (!project) {
      return errorResponse('Project not found', 404)
    }

    project.status = status
    
    if (status === 'approved') {
      project.approvedAt = new Date()
      project.approvedBy = user.userId
    }

    await project.save()

    return successResponse({ project, message: `Project ${status}` })
  } catch (error) {
    console.error('Update project status error:', error)
    return errorResponse('Failed to update project status', 500)
  }
}

export const PUT_handler = authMiddleware(PUT, { requireAdmin: true })

export { PUT_handler as PUT }






