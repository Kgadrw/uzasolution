import connectDB from '@/lib/db/connect'
import Project from '@/lib/db/models/Project'
import Transaction from '@/lib/db/models/Transaction'
import { successResponse, errorResponse, calculateKPIs } from '@/lib/utils'

export async function GET(req, { params }) {
  try {
    await connectDB()
    
    const project = await Project.findById(params.id)
    if (!project) {
      return errorResponse('Project not found', 404)
    }

    const transactions = await Transaction.find({ project: params.id })
    const kpis = calculateKPIs(transactions, project.budget, project.totalDisbursed)

    return successResponse({ kpis })
  } catch (error) {
    console.error('Get KPIs error:', error)
    return errorResponse('Failed to fetch KPIs', 500)
  }
}






