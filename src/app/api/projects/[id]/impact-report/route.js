import connectDB from '@/lib/db/connect'
import Project from '@/lib/db/models/Project'
import Milestone from '@/lib/db/models/Milestone'
import Transaction from '@/lib/db/models/Transaction'
import { successResponse, errorResponse } from '@/lib/utils'

export async function GET(req, { params }) {
  try {
    await connectDB()
    
    const project = await Project.findById(params.id)
      .populate('beneficiary', 'name email location')
    
    if (!project) {
      return errorResponse('Project not found', 404)
    }

    const milestones = await Milestone.find({ project: params.id })
    const transactions = await Transaction.find({ project: params.id })

    const report = {
      project: {
        title: project.title,
        description: project.description,
        status: project.status,
        requestedAmount: project.requestedAmount,
        totalDisbursed: project.totalDisbursed,
      },
      beneficiary: project.beneficiary,
      milestones: milestones.map(m => ({
        title: m.title,
        status: m.status,
        completedAt: m.completedAt,
      })),
      summary: {
        totalTransactions: transactions.length,
        totalExpenses: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
        totalRevenue: transactions.filter(t => t.type === 'revenue').reduce((sum, t) => sum + t.amount, 0),
      },
      generatedAt: new Date(),
    }

    return successResponse({ report })
  } catch (error) {
    console.error('Get impact report error:', error)
    return errorResponse('Failed to generate impact report', 500)
  }
}






