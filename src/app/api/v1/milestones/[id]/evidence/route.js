import { z } from 'zod';
import { connectToDatabase } from '../../../../../../lib/db';
import { requireAuth } from '../../../../../../lib/auth';
import { errorResponse, ApiError } from '../../../../../../lib/errors';
import { emitEvent } from '../../../../../../lib/events';
import { notify } from '../../../../../../lib/notifications';
import { Milestone } from '../../../../../../models/Milestone';
import { Project } from '../../../../../../models/Project';

const evidenceSchema = z.object({
  mediaFiles: z.array(z.string()).min(1),
  notes: z.string().optional(),
  gps: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  timestamp: z.coerce.date().optional(),
});

export async function POST(request, { params }) {
  try {
    const { user } = await requireAuth(request, ['beneficiary']);
    const { id } = params;
    const payload = evidenceSchema.parse(await request.json());

    await connectToDatabase();

    const milestone = await Milestone.findById(id);
    if (!milestone) {
      throw new ApiError(404, 'Milestone not found');
    }

    const project = await Project.findById(milestone.project);
    if (!project) {
      throw new ApiError(404, 'Project not found for milestone');
    }
    if (project.owner.toString() !== user.id.toString()) {
      throw new ApiError(403, 'You do not own this project');
    }

    milestone.evidence.push({
      mediaUrls: payload.mediaFiles,
      notes: payload.notes,
      gps: payload.gps,
      submittedBy: user.id,
      submittedAt: payload.timestamp ?? new Date(),
    });
    milestone.status = 'evidence_submitted';
    await milestone.save();

    emitEvent('milestone.evidence.submitted', { milestoneId: milestone.id });
    notify('admin', 'Milestone evidence submitted', {
      milestoneId: milestone.id,
      projectId: project.id,
    });

    return Response.json({
      milestoneId: milestone.id,
      status: milestone.status,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
