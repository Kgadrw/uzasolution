import { connectToDatabase } from '../../../../../../lib/db';
import { requireAuth } from '../../../../../../lib/auth';
import { errorResponse, ApiError } from '../../../../../../lib/errors';
import { Project } from '../../../../../../models/Project';
import { Transaction } from '../../../../../../models/Transaction';
import { Milestone } from '../../../../../../models/Milestone';
import { Alert } from '../../../../../../models/Alert';
import { Report } from '../../../../../../models/Report';

function summarizeTransactions(transactions) {
  return transactions.reduce(
    (acc, tx) => {
      if (tx.type === 'disbursement') {
        acc.totalDisbursed += tx.amount;
      }
      if (tx.type === 'expense') {
        acc.totalExpenses += tx.amount;
      }
      if (tx.type === 'revenue') {
        acc.totalRevenue += tx.amount;
      }
      return acc;
    },
    { totalDisbursed: 0, totalExpenses: 0, totalRevenue: 0 },
  );
}

export async function GET(request, { params }) {
  try {
    const { user } = await requireAuth(request, ['beneficiary', 'donor', 'admin']);
    const { id } = params;

    await connectToDatabase();

    const project = await Project.findById(id);
    if (!project) {
      throw new ApiError(404, 'Project not found');
    }

    if (
      user.role === 'donor' &&
      project.status !== 'approved' &&
      project.status !== 'completed' &&
      project.status !== 'archived'
    ) {
      throw new ApiError(403, 'Donors can only access reports for approved projects');
    }

    const [transactions, milestones, alerts] = await Promise.all([
      Transaction.find({ project: id }).lean(),
      Milestone.find({ project: id }).lean(),
      Alert.find({ project: id }).lean(),
    ]);

    const totals = summarizeTransactions(transactions);
    const milestoneSummary = milestones.map((milestone) => ({
      id: milestone._id,
      title: milestone.title,
      status: milestone.status,
    }));
    const alertSummary = {
      total: alerts.length,
      open: alerts.filter((alert) => alert.status !== 'resolved').length,
    };

    const reportPayload = {
      project: {
        id: project.id,
        title: project.title,
        status: project.status,
        requestedAmount: project.requestedAmount,
        totalPledged: project.totalPledged,
        currentBalance: project.currentBalance,
      },
      totals,
      milestones: milestoneSummary,
      alerts: alertSummary,
      generatedAt: new Date().toISOString(),
    };

    let reportRecord = await Report.findOne({ project: id });
    if (!reportRecord) {
      reportRecord = await Report.create({
        project: id,
        url: `generated-report://${project.id}`,
        metadata: reportPayload,
      });
    } else {
      reportRecord.metadata = reportPayload;
      reportRecord.generatedAt = new Date();
      await reportRecord.save();
    }

    return Response.json({
      report: {
        url: reportRecord.url,
        generatedAt: reportRecord.generatedAt,
        data: reportPayload,
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
