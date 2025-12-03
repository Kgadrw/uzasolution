import connectDB from '@/lib/db/connect'
import Media from '@/lib/db/models/Media'
import { successResponse, errorResponse } from '@/lib/utils'

export async function GET(req, { params }) {
  try {
    await connectDB()
    
    const media = await Media.findById(params.id)
      .populate('uploadedBy', 'name')

    if (!media) {
      return errorResponse('Media not found', 404)
    }

    return successResponse({ media })
  } catch (error) {
    console.error('Get media error:', error)
    return errorResponse('Failed to fetch media', 500)
  }
}






