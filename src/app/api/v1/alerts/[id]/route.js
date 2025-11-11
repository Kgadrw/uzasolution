import { z } from 'zod';
import { connectToDatabase } from '../../../../../lib/db';
import { requireAuth } from '../../../../../lib/auth';
import { errorResponse, ApiError } from '../../../../../lib/errors';
import { emitEvent } from '../../../../../lib/events';
import { notify } from '../../../../../lib/notifications';
import { Alert } from '../../../../../models/Alert';
import { Project } from '../../../../../models/Project';
import { Tranche } from '../../../../../models/Tranche';
import { AuditLog } from '../../../../../models/AuditLog';

const updateSchema = z.object({
  action: z.enum(['request_more_info', 'freeze_project', 'dismiss', 'escalate']),
  message: z.string().optional(),
});

export async function PATCH(request, { params }) {
  try {
    const { user } = await requireAuth(request, ['admin']);
    const { id } = params;
    const payload = updateSchema.parse(await request.json());

    await connectToDatabase();

    const alert = await Alert.findById(id);
    if (!alert) {
      throw new ApiError(404, 'Alert not found');
    }

    const project = await Project.findById(alert.project);
    if (!project) {
      throw new ApiError(404, 'Associated project not found');
    }

    let newStatus = alert.status;

    switch (payload.action) {
      case 'request_more_info':
        newStatus = 'in_review';
        alert.responses.push({
          submittedBy: user.id,
          message: payload.message ?? 'Additional information requested',
          submittedAt: new Date(),
        });
        notify('beneficiary', 'More information requested for alert', {
          alertId: alert.id,
          projectId: project.id,
        });
        break;
      case 'freeze_project':
        project.status = 'frozen';
        await Tranche.updateMany({ project: project.id }, { status: 'locked' });
        newStatus = 'escalated';
        notify('beneficiary', 'Project has been frozen pending review', {
          projectId: project.id,
          alertId: alert.id,
        });
        break;
      case 'dismiss':
        newStatus = 'resolved';
        alert.resolvedAt = new Date();
        alert.resolvedBy = user.id;
        break;
      case 'escalate':
        newStatus = 'escalated';
        break;
      default:
        break;
    }

    alert.status = newStatus;
    if (payload.message) {
      alert.notes = payload.message;
    }
    await alert.save();
    await project.save();

    await AuditLog.create({
      actor: user.id,
      action: `alert_${payload.action}`,
      entity: 'alert',
      entityId: alert.id,
      details: {
        projectId: project.id,
        message: payload.message,
      },
    });

    emitEvent('alert.updated', { alertId: alert.id, action: payload.action });

    return Response.json({
      alertId: alert.id,
      status: alert.status,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
