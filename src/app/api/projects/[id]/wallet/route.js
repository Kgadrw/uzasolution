import connectDB from '@/lib/db/connect'
import Project from '@/lib/db/models/Project'
import Transaction from '@/lib/db/models/Transaction'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params, user }) {
  try {
    await connectDB()
    
    const project = await Project.findById(params.id)
    if (!project) {
      return errorResponse('Project not found', 404)
    }

    // Get all transactions for balance calculation
    const transactions = await Transaction.find({ project: params.id })
      .sort({ date: -1 })

    // Calculate current balance
    let balance = project.totalDisbursed || 0
    transactions.forEach(t => {
      if (t.type === 'expense') {
        balance -= t.amount
      } else if (t.type === 'revenue') {
        balance += t.amount
      } else if (t.type === 'disbursement') {
        balance += t.amount
      }
    })

    // Find pending tranche
    const pendingTranche = project.tranches?.find(t => 
      t.status === 'in_escrow' || t.status === 'pending'
    )

    return successResponse({
      balance,
      total_disbursed: project.totalDisbursed || 0,
      pending_tranche: pendingTranche ? {
        id: pendingTranche._id,
        number: pendingTranche.number,
        amount: pendingTranche.amount,
        status: pendingTranche.status,
        milestone: pendingTranche.milestone
      } : null
    })
  } catch (error) {
    console.error('Get wallet error:', error)
    return errorResponse('Failed to fetch wallet', 500)
  }
}

export const GET_handler = authMiddleware(GET)

export { GET_handler as GET }

