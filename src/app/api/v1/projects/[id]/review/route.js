import { z } from 'zod';
import { connectToDatabase } from '../../../../../../lib/db';
import { requireAuth } from '../../../../../../lib/auth';
import { errorResponse, ApiError } from '../../../../../../lib/errors';
import { emitEvent } from '../../../../../../lib/events';
import { notify } from '../../../../../../lib/notifications';
import { Project } from '../../../../../../models/Project';
import { Tranche } from '../../../../../../models/Tranche';
import { AuditLog } from '../../../../../../models/AuditLog';

const reviewSchema = z.object({
  decision: z.enum(['approved', 'rejected']),
  adminNotes: z.string().optional(),
  tranchePlan: z
    .array(
      z.object({
        amount: z.number().positive(),
        conditionMilestoneId: z.string().optional(),
        orderIndex: z.number().int().min(0).optional(),
      }),
    )
    .optional(),
});

export async function PATCH(request, { params }) {
  try {
    const { user } = await requireAuth(request, ['admin']);
    const { id } = params;
    const body = await request.json();
    const payload = reviewSchema.parse(body);

    await connectToDatabase();

    const project = await Project.findById(id);
    if (!project) {
      throw new ApiError(404, 'Project not found');
    }

    project.status = payload.decision === 'approved' ? 'approved' : 'rejected';
    project.adminNotes = payload.adminNotes;
    if (payload.decision === 'approved') {
      project.approvedAt = new Date();
    }
    await project.save();

    await Tranche.deleteMany({ project: id });

    if (payload.decision === 'approved') {
      const tranchePlan = payload.tranchePlan;
      if (!tranchePlan || tranchePlan.length === 0) {
        throw new ApiError(400, 'Approved projects require a tranche plan');
      }

      await Tranche.insertMany(
        tranchePlan.map((tranche, index) => ({
          project: id,
          amount: tranche.amount,
          conditionMilestone: tranche.conditionMilestoneId,
          orderIndex: tranche.orderIndex ?? index,
        })),
      );
    }

    await AuditLog.create({
      actor: user.id,
      action: payload.decision === 'approved' ? 'project_approved' : 'project_rejected',
      entity: 'project',
      entityId: project.id,
      details: {
        notes: payload.adminNotes,
        tranchePlan: payload.tranchePlan,
      },
    });

    emitEvent(
      payload.decision === 'approved' ? 'project.approved' : 'project.rejected',
      { projectId: project.id },
    );

    notify('beneficiary', `Project ${payload.decision}`, {
      projectId: project.id,
      status: project.status,
    });

    return Response.json({
      projectId: project.id,
      status: project.status,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
