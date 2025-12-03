import connectDB from '@/lib/db/connect'
import Milestone from '@/lib/db/models/Milestone'
import Project from '@/lib/db/models/Project'
import { authMiddleware } from '@/lib/auth'
import { validateRequest, createMilestoneSchema } from '@/lib/validation'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params }) {
  try {
    await connectDB()
    
    const milestones = await Milestone.find({ project: params.id })
      .sort({ number: 1 })

    return successResponse({ milestones })
  } catch (error) {
    console.error('Get milestones error:', error)
    return errorResponse('Failed to fetch milestones', 500)
  }
}

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

    const validation = await validateRequest(createMilestoneSchema)(req)
    if (!validation.success) {
      return errorResponse('Validation failed', 400, validation.error)
    }

    const count = await Milestone.countDocuments({ project: params.id })

    const milestone = new Milestone({
      ...validation.data,
      project: params.id,
      number: count + 1,
      targetDate: validation.data.targetDate ? new Date(validation.data.targetDate) : null,
    })

    await milestone.save()

    return successResponse({ milestone }, 201)
  } catch (error) {
    console.error('Create milestone error:', error)
    return errorResponse('Failed to create milestone', 500)
  }
}

export const GET_handler = GET
export const POST_handler = authMiddleware(POST)

export { GET_handler as GET, POST_handler as POST }






