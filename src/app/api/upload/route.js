import connectDB from '@/lib/db/connect'
import Media from '@/lib/db/models/Media'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse, sanitizeFileName } from '@/lib/utils'

async function POST(req, { user }) {
  try {
    await connectDB()
    
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return errorResponse('No file provided', 400)
    }

    const fileUrl = `/uploads/${Date.now()}-${sanitizeFileName(file.name)}`

    const media = new Media({
      url: fileUrl,
      filename: file.name,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      uploadedBy: user.userId,
      isPublic: false,
    })

    await media.save()

    return successResponse({ media }, 201)
  } catch (error) {
    console.error('Upload error:', error)
    return errorResponse('Failed to upload file', 500)
  }
}

export const POST_handler = authMiddleware(POST)

export { POST_handler as POST }






