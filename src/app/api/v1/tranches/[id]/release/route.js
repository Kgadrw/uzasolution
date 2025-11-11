import { connectToDatabase } from '../../../../../../lib/db';
import { requireAuth } from '../../../../../../lib/auth';
import { errorResponse, ApiError } from '../../../../../../lib/errors';
import { emitEvent } from '../../../../../../lib/events';
import { notify } from '../../../../../../lib/notifications';
import { Tranche } from '../../../../../../models/Tranche';
import { Project } from '../../../../../../models/Project';
import { Transaction } from '../../../../../../models/Transaction';
import { AuditLog } from '../../../../../../models/AuditLog';

export async function POST(request, { params }) {
  try {
    const { user } = await requireAuth(request, ['admin']);
    const { id } = params;

    await connectToDatabase();

    const tranche = await Tranche.findById(id);
    if (!tranche) {
      throw new ApiError(404, 'Tranche not found');
    }
    if (tranche.status === 'released') {
      return Response.json({ status: 'released', trancheId: tranche.id });
    }
    if (tranche.status !== 'locked') {
      throw new ApiError(400, 'Tranche is not eligible for release');
    }

    const project = await Project.findById(tranche.project);
    if (!project || project.status !== 'approved') {
      throw new ApiError(400, 'Project is not eligible for tranche release');
    }

    const availableEscrow = project.totalPledged - project.currentBalance;
    if (availableEscrow < tranche.amount) {
      throw new ApiError(400, 'Insufficient pledged funds to release tranche');
    }

    tranche.status = 'released';
    tranche.releasedAt = new Date();
    tranche.releasedBy = user.id;
    tranche.paymentReference = `disbursement-${Date.now()}`;
    await tranche.save();

    await Transaction.create({
      project: project.id,
      user: user.id,
      type: 'disbursement',
      amount: tranche.amount,
      status: 'confirmed',
      tranche: tranche.id,
      notes: 'Tranche release',
    });

    project.currentBalance += tranche.amount;
    await project.save();

    await AuditLog.create({
      actor: user.id,
      action: 'tranche_released',
      entity: 'tranche',
      entityId: tranche.id,
      details: {
        projectId: project.id,
        amount: tranche.amount,
      },
    });

    emitEvent('tranche.released', { trancheId: tranche.id, projectId: project.id });
    notify('beneficiary', 'Tranche released', { projectId: project.id, trancheId: tranche.id });

    return Response.json({
      trancheId: tranche.id,
      status: tranche.status,
      projectBalance: project.currentBalance,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
