import connectDB from '@/lib/db/connect'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function POST(req, { user }) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { phone, message } = body

    // TODO: Integrate with WhatsApp API
    console.log('WhatsApp:', { phone, message, sentBy: user.userId })

    return successResponse({ message: 'WhatsApp message sent successfully' })
  } catch (error) {
    console.error('Send WhatsApp error:', error)
    return errorResponse('Failed to send WhatsApp message', 500)
  }
}

export const POST_handler = authMiddleware(POST, { requireAdmin: true })

export { POST_handler as POST }






