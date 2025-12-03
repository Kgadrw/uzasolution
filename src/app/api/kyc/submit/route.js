import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connect'
import KYC from '@/lib/db/models/KYC'
import User from '@/lib/db/models/User'
import { authMiddleware } from '@/lib/auth'
import { errorResponse, successResponse } from '@/lib/utils'

async function handler(req, { user }) {
  try {
    await connectDB()
    
    const formData = await req.formData()
    const projectId = formData.get('projectId')
    const documents = []

    // Handle file uploads (simplified - you'll need proper file storage)
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // In a real implementation, upload to S3/Cloudinary/etc
        const fileUrl = `/uploads/${Date.now()}-${value.name}`
        documents.push({
          type: key,
          url: fileUrl,
          uploadedAt: new Date(),
        })
      }
    }

    if (documents.length === 0) {
      return errorResponse('At least one document is required', 400)
    }

    const kyc = new KYC({
      user: user.userId,
      project: projectId || null,
      documents,
      status: 'pending',
    })

    await kyc.save()

    // Update user KYC status
    await User.findByIdAndUpdate(user.userId, {
      kycStatus: 'pending',
    })

    return successResponse({ kyc }, 201)
  } catch (error) {
    console.error('KYC submit error:', error)
    return errorResponse('Failed to submit KYC documents', 500)
  }
}

export const POST = authMiddleware(handler)






