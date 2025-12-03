import connectDB from '@/lib/db/connect'
import TopUp from '@/lib/db/models/TopUp'
import Project from '@/lib/db/models/Project'
import { authMiddleware } from '@/lib/auth'
import { validateRequest, createTopUpSchema } from '@/lib/validation'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params, user }) {
  try {
    await connectDB()
    
    const project = await Project.findById(params.id)
    if (!project) {
      return errorResponse('Project not found', 404)
    }

    const topUps = await TopUp.find({ project: params.id })
      .sort({ createdAt: -1 })

    return successResponse({ topUps })
  } catch (error) {
    console.error('Get top-ups error:', error)
    return errorResponse('Failed to fetch top-ups', 500)
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

    const validation = await validateRequest(createTopUpSchema)(req)
    if (!validation.success) {
      return errorResponse('Validation failed', 400, validation.error)
    }

    // Calculate score based on project health, margin, etc.
    const Transaction = (await import('@/lib/db/models/Transaction')).default
    const transactions = await Transaction.find({ project: params.id })
    const totalRevenue = transactions.filter(t => t.type === 'revenue').reduce((sum, t) => sum + t.amount, 0)
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    const margin = totalRevenue > 0 ? ((totalRevenue - totalExpenses) / totalRevenue) * 100 : 0

    // Simple scoring (0-100)
    let score = 50
    if (project.health === 'on_track') score += 20
    if (margin > 20) score += 15
    if (project.kpis?.anomalyCount === 0) score += 15

    const topUp = new TopUp({
      ...validation.data,
      project: params.id,
      score,
    })

    await topUp.save()

    return successResponse({ topUp }, 201)
  } catch (error) {
    console.error('Create top-up error:', error)
    return errorResponse('Failed to create top-up request', 500)
  }
}

export const GET_handler = authMiddleware(GET)
export const POST_handler = authMiddleware(POST)

export { GET_handler as GET, POST_handler as POST }






