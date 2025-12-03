import connectDB from '@/lib/db/connect'
import FundingRequest from '@/lib/db/models/FundingRequest'
import { authMiddleware } from '@/lib/auth'
import { validateRequest, createFundingRequestSchema } from '@/lib/validation'
import { successResponse, errorResponse } from '@/lib/utils'

async function POST(req, { user }) {
  try {
    await connectDB()
    
    const validation = await validateRequest(createFundingRequestSchema)(req)
    if (!validation.success) {
      return errorResponse('Validation failed', 400, validation.error)
    }

    const fundingRequest = new FundingRequest({
      ...validation.data,
      project: validation.data.projectId,
    })
    await fundingRequest.save()

    return successResponse({ fundingRequest }, 201)
  } catch (error) {
    console.error('Create funding request error:', error)
    return errorResponse('Failed to create funding request', 500)
  }
}

export const POST_handler = authMiddleware(POST)

export { POST_handler as POST }






