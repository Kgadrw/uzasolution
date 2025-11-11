import { z } from 'zod';
import { connectToDatabase } from '../../../../../../lib/db';
import { requireAuth } from '../../../../../../lib/auth';
import { errorResponse, ApiError } from '../../../../../../lib/errors';
import { emitEvent } from '../../../../../../lib/events';
import { notify } from '../../../../../../lib/notifications';
import { Project } from '../../../../../../models/Project';
import { TopUpRequest } from '../../../../../../models/TopUpRequest';
import { Alert } from '../../../../../../models/Alert';
import { Transaction } from '../../../../../../models/Transaction';

const topUpSchema = z.object({
  amount: z.number().positive(),
  purpose: z.string().min(5),
  expectedRoi: z.number().min(0).max(100).optional(),
});

async function computeAutoScore(projectId) {
  const [alerts, transactions] = await Promise.all([
    Alert.countDocuments({ project: projectId, status: { $ne: 'resolved' } }),
    Transaction.countDocuments({ project: projectId, type: 'expense' }),
  ]);

  const baseScore = 80;
  const alertPenalty = alerts * 10;
  const activityBoost = Math.min(transactions * 2, 20);

  return Math.max(0, Math.min(100, baseScore - alertPenalty + activityBoost));
}

export async function POST(request, { params }) {
  try {
    const { user } = await requireAuth(request, ['beneficiary']);
    const { id } = params;
    const payload = topUpSchema.parse(await request.json());

    await connectToDatabase();

    const project = await Project.findById(id);
    if (!project) {
      throw new ApiError(404, 'Project not found');
    }
    if (project.owner.toString() !== user.id.toString()) {
      throw new ApiError(403, 'You do not own this project');
    }

    const autoScore = await computeAutoScore(project.id);

    const topUpRequest = await TopUpRequest.create({
      project: project.id,
      requestedBy: user.id,
      amount: payload.amount,
      purpose: payload.purpose,
      expectedRoi: payload.expectedRoi,
      autoScore,
      status: 'pending',
    });

    emitEvent('topup.scored', { topUpId: topUpRequest.id, score: autoScore });
    notify('admin', 'Top-up request pending review', {
      topUpId: topUpRequest.id,
      projectId: project.id,
      score: autoScore,
    });

    return Response.json({
      topUpId: topUpRequest.id,
      autoScore,
      status: topUpRequest.status,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
