import connectDB from '@/lib/db/connect'
import Milestone from '@/lib/db/models/Milestone'
import Media from '@/lib/db/models/Media'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function POST(req, { params, user }) {
  try {
    await connectDB()
    
    const milestone = await Milestone.findById(params.id)
    if (!milestone) {
      return errorResponse('Milestone not found', 404)
    }

    const formData = await req.formData()
    const evidenceFiles = []

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
          entityType: 'milestone',
          entityId: milestone._id,
        })
        await media.save()

        evidenceFiles.push({
          url: fileUrl,
          type: value.type,
          description: formData.get(`description_${key}`) || '',
          uploadedAt: new Date(),
        })
      }
    }

    if (evidenceFiles.length === 0) {
      return errorResponse('At least one evidence file is required', 400)
    }

    milestone.evidence = [...(milestone.evidence || []), ...evidenceFiles]
    milestone.status = 'evidence_submitted'
    milestone.submittedAt = new Date()
    await milestone.save()

    return successResponse({ milestone, message: 'Evidence uploaded successfully' })
  } catch (error) {
    console.error('Upload evidence error:', error)
    return errorResponse('Failed to upload evidence', 500)
  }
}

export const POST_handler = authMiddleware(POST)

export { POST_handler as POST }






