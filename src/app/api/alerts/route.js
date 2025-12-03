import connectDB from '@/lib/db/connect'
import Alert from '@/lib/db/models/Alert'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { user }) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const severity = searchParams.get('severity')

    const query = {}
    if (status) query.status = status
    if (severity) query.severity = severity

    const alerts = await Alert.find(query)
      .populate('project', 'title beneficiary')
      .sort({ createdAt: -1 })

    return successResponse({ alerts })
  } catch (error) {
    console.error('Get alerts error:', error)
    return errorResponse('Failed to fetch alerts', 500)
  }
}

export const GET_handler = authMiddleware(GET, { requireAdmin: true })

export { GET_handler as GET }






