import connectDB from '@/lib/db/connect'
import Pledge from '@/lib/db/models/Pledge'
import Project from '@/lib/db/models/Project'
import { authMiddleware } from '@/lib/auth'
import { validateRequest, createPledgeSchema } from '@/lib/validation'
import { successResponse, errorResponse } from '@/lib/utils'

async function POST(req, { user }) {
  try {
    await connectDB()
    
    if (user.role !== 'donor') {
      return errorResponse('Only donors can create pledges', 403)
    }

    const validation = await validateRequest(createPledgeSchema)(req)
    if (!validation.success) {
      return errorResponse('Validation failed', 400, validation.error)
    }

    const project = await Project.findById(validation.data.projectId)
    if (!project) {
      return errorResponse('Project not found', 404)
    }

    const pledge = new Pledge({
      project: validation.data.projectId,
      donor: user.userId,
      amount: validation.data.amount,
    })

    await pledge.save()

    // Update project total funded
    project.totalFunded = (project.totalFunded || 0) + validation.data.amount
    await project.save()

    return successResponse({ pledge }, 201)
  } catch (error) {
    console.error('Create pledge error:', error)
    return errorResponse('Failed to create pledge', 500)
  }
}

export const POST_handler = authMiddleware(POST)

export { POST_handler as POST }






