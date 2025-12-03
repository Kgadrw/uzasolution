import connectDB from '@/lib/db/connect'
import Transaction from '@/lib/db/models/Transaction'
import Media from '@/lib/db/models/Media'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function POST(req, { params, user }) {
  try {
    await connectDB()
    
    const transaction = await Transaction.findById(params.id)
    if (!transaction) {
      return errorResponse('Transaction not found', 404)
    }

    const formData = await req.formData()
    const mediaFiles = []

    // Handle multiple file uploads
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const fileUrl = `/uploads/${Date.now()}-${value.name}`
        
        const media = new Media({
          url: fileUrl,
          filename: value.name,
          originalName: value.name,
          mimeType: value.type,
          size: value.size,
          uploadedBy: user.userId,
          entityType: 'transaction',
          entityId: transaction._id,
        })
        await media.save()

        mediaFiles.push({
          url: fileUrl,
          type: value.type,
          uploadedAt: new Date(),
        })
      }
    }

    transaction.media = [...(transaction.media || []), ...mediaFiles]
    transaction.proofStatus = 'uploaded'
    await transaction.save()

    return successResponse({ transaction, message: 'Media uploaded successfully' })
  } catch (error) {
    console.error('Upload transaction media error:', error)
    return errorResponse('Failed to upload media', 500)
  }
}

export const POST_handler = authMiddleware(POST)

export { POST_handler as POST }






