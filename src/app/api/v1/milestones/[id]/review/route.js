import { z } from 'zod';
import { connectToDatabase } from '../../../../../../lib/db';
import { requireAuth } from '../../../../../../lib/auth';
import { errorResponse, ApiError } from '../../../../../../lib/errors';
import { emitEvent } from '../../../../../../lib/events';
import { notify } from '../../../../../../lib/notifications';
import { Milestone } from '../../../../../../models/Milestone';
import { AuditLog } from '../../../../../../models/AuditLog';

const reviewSchema = z.object({
  status: z.enum(['approved', 'rejected', 'partial']),
  notes: z.string().optional(),
});

export async function PATCH(request, { params }) {
  try {
    const { user } = await requireAuth(request, ['admin']);
    const { id } = params;
    const payload = reviewSchema.parse(await request.json());

    await connectToDatabase();

    const milestone = await Milestone.findById(id);
    if (!milestone) {
      throw new ApiError(404, 'Milestone not found');
    }

    milestone.status = payload.status;
    milestone.review = {
      decidedBy: user.id,
      decidedAt: new Date(),
      decisionNotes: payload.notes,
    };
    await milestone.save();

    await AuditLog.create({
      actor: user.id,
      action: 'milestone_review',
      entity: 'milestone',
      entityId: milestone.id,
      details: {
        status: payload.status,
        notes: payload.notes,
      },
    });

    emitEvent('milestone.reviewed', { milestoneId: milestone.id, status: payload.status });
    notify('beneficiary', 'Milestone review decision', {
      milestoneId: milestone.id,
      status: payload.status,
    });

    return Response.json({
      milestoneId: milestone.id,
      status: milestone.status,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
