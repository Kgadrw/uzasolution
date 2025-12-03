import connectDB from '@/lib/db/connect'
import Dispute from '@/lib/db/models/Dispute'
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

    const body = await req.json()
    const { type, title, description, relatedEntity } = body

    const dispute = new Dispute({
      project: params.id,
      raisedBy: user.userId,
      type: type || 'other',
      title,
      description,
      relatedEntity,
    })

    await dispute.save()

    return successResponse({ dispute }, 201)
  } catch (error) {
    console.error('Create dispute error:', error)
    return errorResponse('Failed to create dispute', 500)
  }
}

export const POST_handler = authMiddleware(POST)

export { POST_handler as POST }






