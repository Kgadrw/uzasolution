import { z } from 'zod';
import { connectToDatabase } from '../../../../../../lib/db';
import { requireAuth } from '../../../../../../lib/auth';
import { errorResponse, ApiError } from '../../../../../../lib/errors';
import { emitEvent } from '../../../../../../lib/events';
import { notify } from '../../../../../../lib/notifications';
import { Project } from '../../../../../../models/Project';
import { Pledge } from '../../../../../../models/Pledge';
import { Transaction } from '../../../../../../models/Transaction';

const pledgeSchema = z.object({
  amount: z.number().positive(),
  paymentMethod: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export async function POST(request, { params }) {
  try {
    const { user } = await requireAuth(request, ['donor']);
    const { id } = params;
    const payload = pledgeSchema.parse(await request.json());

    await connectToDatabase();

    const project = await Project.findById(id);
    if (!project || project.status !== 'approved') {
      throw new ApiError(404, 'Project not available for pledges');
    }

    const pledge = await Pledge.create({
      project: id,
      donor: user.id,
      amount: payload.amount,
      paymentMethod: payload.paymentMethod,
      status: 'pledged',
      paymentReference: `mock-${Date.now()}`,
      metadata: payload.metadata,
    });

    await Transaction.create({
      project: id,
      user: user.id,
      type: 'pledge',
      amount: payload.amount,
      status: 'confirmed',
      pledge: pledge.id,
      metadata: payload.metadata,
    });

    project.totalPledged += payload.amount;
    await project.save();

    emitEvent('pledge.confirmed', {
      pledgeId: pledge.id,
      projectId: project.id,
      donorId: user.id,
    });

    notify('donor', 'Pledge confirmed and funds held in escrow', {
      pledgeId: pledge.id,
      projectId: project.id,
    });

    return Response.json({
      pledgeId: pledge.id,
      status: pledge.status,
      projectTotalPledged: project.totalPledged,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
