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

    const tranche = project.tranches.id(params.trancheId)
    if (!tranche) {
      return errorResponse('Tranche not found', 404)
    }

    tranche.status = 'frozen'
    await project.save()

    return successResponse({ tranche, message: 'Tranche frozen' })
  } catch (error) {
    console.error('Freeze tranche error:', error)
    return errorResponse('Failed to freeze tranche', 500)
  }
}

export const POST_handler = authMiddleware(POST, { requireAdmin: true })

export { POST_handler as POST }






