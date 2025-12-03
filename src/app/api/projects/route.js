import connectDB from '@/lib/db/connect'
import Project from '@/lib/db/models/Project'
import { authMiddleware } from '@/lib/auth'
import { validateRequest, createProjectSchema } from '@/lib/validation'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const query = {}
    if (status) query.status = status
    if (category) query.category = category

    const projects = await Project.find(query)
      .populate('beneficiary', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)

    const total = await Project.countDocuments(query)

    return successResponse({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get projects error:', error)
    return errorResponse('Failed to fetch projects', 500)
  }
}

async function POST(req, { user }) {
  try {
    await connectDB()
    
    const validation = await validateRequest(createProjectSchema)(req)
    if (!validation.success) {
      return errorResponse('Validation failed', 400, validation.error)
    }

    const data = validation.data

    const project = new Project({
      ...data,
      beneficiary: user.userId,
      status: 'pending',
    })

    // Create initial milestones if provided
    if (data.milestones && data.milestones.length > 0) {
      const Milestone = (await import('@/lib/db/models/Milestone')).default
      const milestones = await Promise.all(
        data.milestones.map((m, index) =>
          new Milestone({
            project: project._id,
            title: m.title,
            description: m.description,
            targetDate: m.targetDate ? new Date(m.targetDate) : null,
            number: index + 1,
          }).save()
        )
      )
      // You can link milestones to tranches later
    }

    await project.save()

    return successResponse({ project }, 201)
  } catch (error) {
    console.error('Create project error:', error)
    return errorResponse('Failed to create project', 500)
  }
}

export const GET_handler = GET
export const POST_handler = authMiddleware(POST)

export { GET_handler as GET, POST_handler as POST }






