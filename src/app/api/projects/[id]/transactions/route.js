import connectDB from '@/lib/db/connect'
import Transaction from '@/lib/db/models/Transaction'
import Project from '@/lib/db/models/Project'
import { authMiddleware } from '@/lib/auth'
import { validateRequest, createTransactionSchema } from '@/lib/validation'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { params, user }) {
  try {
    await connectDB()
    
    const project = await Project.findById(params.id)
    if (!project) {
      return errorResponse('Project not found', 404)
    }

    // Check access
    if (project.beneficiary.toString() !== user.userId && user.role !== 'admin' && user.role !== 'donor') {
      return errorResponse('Forbidden', 403)
    }

    const transactions = await Transaction.find({ project: params.id })
      .sort({ date: -1 })

    return successResponse({ transactions })
  } catch (error) {
    console.error('Get transactions error:', error)
    return errorResponse('Failed to fetch transactions', 500)
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

    const validation = await validateRequest(createTransactionSchema)(req)
    if (!validation.success) {
      return errorResponse('Validation failed', 400, validation.error)
    }

    const data = validation.data

    // Calculate balance
    const lastTransaction = await Transaction.findOne({ project: params.id })
      .sort({ date: -1 })

    let balance = project.totalDisbursed || 0
    if (lastTransaction) {
      balance = lastTransaction.balance
    }

    if (data.type === 'expense') {
      balance -= data.amount
    } else if (data.type === 'revenue') {
      balance += data.amount
    } else if (data.type === 'disbursement') {
      balance += data.amount
    }

    const transaction = new Transaction({
      ...data,
      project: params.id,
      balance,
      date: data.date ? new Date(data.date) : new Date(),
      createdBy: user.userId,
    })

    await transaction.save()

    return successResponse({ transaction }, 201)
  } catch (error) {
    console.error('Create transaction error:', error)
    return errorResponse('Failed to create transaction', 500)
  }
}

export const GET_handler = authMiddleware(GET)
export const POST_handler = authMiddleware(POST)

export { GET_handler as GET, POST_handler as POST }






