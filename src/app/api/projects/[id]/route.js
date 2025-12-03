import connectDB from '@/lib/db/connect'
import Project from '@/lib/db/models/Project'
import Milestone from '@/lib/db/models/Milestone'
import Transaction from '@/lib/db/models/Transaction'
import { authMiddleware } from '@/lib/auth'
import { validateRequest, updateProjectSchema } from '@/lib/validation'
import { successResponse, errorResponse, calculateKPIs } from '@/lib/utils'

async function GET(req, { params }) {
  try {
    await connectDB()
    
    const project = await Project.findById(params.id)
      .populate('beneficiary', 'name email phone location')
      .populate('approvedBy', 'name')

    if (!project) {
      return errorResponse('Project not found', 404)
    }

    return successResponse({ project })
  } catch (error) {
    console.error('Get project error:', error)
    return errorResponse('Failed to fetch project', 500)
  }
}

async function PUT(req, { params, user }) {
  try {
    await connectDB()
    
    const project = await Project.findById(params.id)
    if (!project) {
      return errorResponse('Project not found', 404)
    }

    // Check ownership or admin
    if (project.beneficiary.toString() !== user.userId && user.role !== 'admin') {
      return errorResponse('Forbidden', 403)
    }

    const validation = await validateRequest(updateProjectSchema)(req)
    if (!validation.success) {
      return errorResponse('Validation failed', 400, validation.error)
    }

    Object.assign(project, validation.data)
    await project.save()

    return successResponse({ project })
  } catch (error) {
    console.error('Update project error:', error)
    return errorResponse('Failed to update project', 500)
  }
}

export const GET_handler = GET
export const PUT_handler = authMiddleware(PUT)

export { GET_handler as GET, PUT_handler as PUT }






