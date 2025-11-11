import { z } from 'zod';
import { connectToDatabase } from '../../../../../../lib/db';
import { requireAuth } from '../../../../../../lib/auth';
import { errorResponse, ApiError } from '../../../../../../lib/errors';
import { emitEvent } from '../../../../../../lib/events';
import { notify } from '../../../../../../lib/notifications';
import { Project } from '../../../../../../models/Project';
import { Transaction } from '../../../../../../models/Transaction';
import { Alert } from '../../../../../../models/Alert';

const transactionSchema = z.object({
  type: z.enum(['expense', 'revenue']),
  amount: z.number().positive(),
  category: z.string().optional(),
  receiptMedia: z.array(z.string()).optional().default([]),
  gps: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  timestamp: z.coerce.date().optional(),
  notes: z.string().optional(),
});

function evaluateRisk(transaction, project) {
  const alerts = [];

  if (transaction.type === 'expense' && transaction.amount > project.currentBalance + 1) {
    alerts.push({
      rule: 'insufficient_balance',
      severity: 'high',
      notes: 'Expense recorded exceeds current balance',
    });
  }

  const bigSpendThreshold = project.requestedAmount * 0.5;
  if (transaction.amount > bigSpendThreshold) {
    alerts.push({
      rule: 'velocity_spike',
      severity: 'medium',
      notes: 'Expense is large compared to project request',
    });
  }

  return alerts;
}

export async function POST(request, { params }) {
  try {
    const { user } = await requireAuth(request, ['beneficiary']);
    const { id } = params;
    const payload = transactionSchema.parse(await request.json());

    await connectToDatabase();

    const project = await Project.findById(id);
    if (!project) {
      throw new ApiError(404, 'Project not found');
    }
    if (project.owner.toString() !== user.id.toString()) {
      throw new ApiError(403, 'You do not own this project');
    }

    const transaction = await Transaction.create({
      project: id,
      user: user.id,
      type: payload.type,
      amount: payload.amount,
      category: payload.category,
      mediaRefs: payload.receiptMedia,
      gps: payload.gps,
      occurredAt: payload.timestamp ?? new Date(),
      notes: payload.notes,
      status: 'recorded',
    });

    if (payload.type === 'expense') {
      project.currentBalance = Math.max(project.currentBalance - payload.amount, 0);
    } else if (payload.type === 'revenue') {
      project.currentBalance += payload.amount;
    }
    await project.save();

    emitEvent('transaction.recorded', { transactionId: transaction.id });
    notify('beneficiary', 'Transaction logged', {
      transactionId: transaction.id,
      projectId: project.id,
    });

    const alerts = evaluateRisk(payload, project);
    let createdAlerts = [];
    if (alerts.length > 0) {
      createdAlerts = await Alert.insertMany(
        alerts.map((alert) => ({
          project: project.id,
          transaction: transaction.id,
          rule: alert.rule,
          severity: alert.severity,
          notes: alert.notes,
        })),
      );

      createdAlerts.forEach((alert) => {
        emitEvent('alert.created', { alertId: alert.id });
        notify('admin', 'New risk alert raised', { alertId: alert.id });
      });
    }

    return Response.json({
      transaction,
      alerts: createdAlerts,
      projectBalance: project.currentBalance,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
