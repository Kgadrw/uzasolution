import connectDB from '@/lib/db/connect'
import Project from '@/lib/db/models/Project'
import Alert from '@/lib/db/models/Alert'
import { authMiddleware } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/utils'

async function GET(req, { user }) {
  try {
    await connectDB()
    
    const projects = await Project.find({ status: { $in: ['active', 'approved'] } })
      .populate('beneficiary', 'name location')
      .select('title health status location')

    const alerts = await Alert.find({ status: 'open' })
      .populate('project', 'title location')

    const heatmap = {
      projects: projects.map(p => ({
        id: p._id,
        title: p.title,
        health: p.health,
        location: p.location,
        riskLevel: p.health === 'at_risk' ? 'high' : p.health === 'on_track' ? 'low' : 'medium',
      })),
      alerts: alerts.map(a => ({
        id: a._id,
        type: a.type,
        severity: a.severity,
        project: a.project,
      })),
    }

    return successResponse({ heatmap })
  } catch (error) {
    console.error('Get risk heatmap error:', error)
    return errorResponse('Failed to fetch risk heatmap', 500)
  }
}

export const GET_handler = authMiddleware(GET, { requireAdmin: true })

export { GET_handler as GET }






