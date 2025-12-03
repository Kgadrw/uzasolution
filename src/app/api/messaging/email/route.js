import connectDB from '@/lib/db/connect'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function POST(req, { user }) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { to, subject, message } = body

    // TODO: Integrate with email service (nodemailer, SendGrid, etc.)
    console.log('Email:', { to, subject, message, sentBy: user.userId })

    return successResponse({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Send email error:', error)
    return errorResponse('Failed to send email', 500)
  }
}

export const POST_handler = authMiddleware(POST, { requireAdmin: true })

export { POST_handler as POST }






