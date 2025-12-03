import connectDB from '@/lib/db/connect'
import Transaction from '@/lib/db/models/Transaction'
import Project from '@/lib/db/models/Project'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params, user }) {
  try {
    await connectDB()
    
    const project = await Project.findById(params.id)
    if (!project) {
      return errorResponse('Project not found', 404)
    }

    const transactions = await Transaction.find({ project: params.id })
      .sort({ date: -1 })

    const summary = {
      totalExpenses: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
      totalRevenue: transactions.filter(t => t.type === 'revenue').reduce((sum, t) => sum + t.amount, 0),
      totalDisbursements: transactions.filter(t => t.type === 'disbursement').reduce((sum, t) => sum + t.amount, 0),
      currentBalance: project.totalDisbursed || 0,
    }

    return successResponse({ transactions, summary })
  } catch (error) {
    console.error('Get ledger error:', error)
    return errorResponse('Failed to fetch ledger', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }






