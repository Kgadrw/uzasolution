import connectDB from '@/lib/db/connect'
import Project from '@/lib/db/models/Project'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params }) {
  try {
    await connectDB()
    
    const project = await Project.findById(params.id)
      .select('budget requestedAmount totalDisbursed')

    if (!project) {
      return errorResponse('Project not found', 404)
    }

    return successResponse({ budget: project.budget, requestedAmount: project.requestedAmount, totalDisbursed: project.totalDisbursed })
  } catch (error) {
    console.error('Get budget error:', error)
    return errorResponse('Failed to fetch budget', 500)
  }
}

async function PUT(req, { params, user }) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { budget } = body

    const project = await Project.findById(params.id)
    if (!project) {
      return errorResponse('Project not found', 404)
    }

    // Check ownership
    if (project.beneficiary.toString() !== user.userId) {
      return errorResponse('Forbidden', 403)
    }

    project.budget = budget
    await project.save()

    return successResponse({ project })
  } catch (error) {
    console.error('Update budget error:', error)
    return errorResponse('Failed to update budget', 500)
  }
}

export const GET_handler = GET
export const PUT_handler = authMiddleware(PUT)

export { GET_handler as GET, PUT_handler as PUT }






