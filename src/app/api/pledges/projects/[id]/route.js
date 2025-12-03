import connectDB from '@/lib/db/connect'
import Pledge from '@/lib/db/models/Pledge'
import { successResponse, errorResponse } from '@/lib/utils'

export async function GET(req, { params }) {
  try {
    await connectDB()
    
    const pledges = await Pledge.find({ project: params.id })
      .populate('donor', 'name email')
      .sort({ createdAt: -1 })

    return successResponse({ pledges })
  } catch (error) {
    console.error('Get project pledges error:', error)
    return errorResponse('Failed to fetch pledges', 500)
  }
}






