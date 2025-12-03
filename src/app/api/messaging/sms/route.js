import connectDB from '@/lib/db/connect'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function POST(req, { user }) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { phone, message } = body

    // TODO: Integrate with SMS provider (Twilio, etc.)
    console.log('SMS:', { phone, message, sentBy: user.userId })

    return successResponse({ message: 'SMS sent successfully' })
  } catch (error) {
    console.error('Send SMS error:', error)
    return errorResponse('Failed to send SMS', 500)
  }
}

export const POST_handler = authMiddleware(POST, { requireAdmin: true })

export { POST_handler as POST }






