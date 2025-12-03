import connectDB from '@/lib/db/connect'
import Project from '@/lib/db/models/Project'
import Transaction from '@/lib/db/models/Transaction'
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

    if (tranche.status !== 'in_escrow') {
      return errorResponse('Tranche is not in escrow', 400)
    }

    tranche.status = 'released'
    tranche.releasedAt = new Date()
    tranche.releasedBy = user.userId

    project.totalDisbursed = (project.totalDisbursed || 0) + tranche.amount
    await project.save()

    // Create transaction record
    const transaction = new Transaction({
      project: project._id,
      type: 'disbursement',
      category: 'Funding',
      amount: tranche.amount,
      description: `Tranche ${tranche.number} release`,
      createdBy: user.userId,
    })
    await transaction.save()

    return successResponse({ tranche, message: 'Tranche released successfully' })
  } catch (error) {
    console.error('Release tranche error:', error)
    return errorResponse('Failed to release tranche', 500)
  }
}

export const POST_handler = authMiddleware(POST, { requireAdmin: true })

export { POST_handler as POST }






