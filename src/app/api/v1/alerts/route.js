import { connectToDatabase } from '../../../../lib/db';
import { requireAuth } from '../../../../lib/auth';
import { errorResponse } from '../../../../lib/errors';
import { Alert } from '../../../../models/Alert';

export async function GET(request) {
  try {
    await requireAuth(request, ['admin']);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const severity = searchParams.get('severity');
    const projectId = searchParams.get('projectId');

    await connectToDatabase();

    const query = {};
    if (status) {
      query.status = status;
    }
    if (severity) {
      query.severity = severity;
    }
    if (projectId) {
      query.project = projectId;
    }

    const alerts = await Alert.find(query)
      .sort({ createdAt: -1 })
      .populate('transaction')
      .lean();

    return Response.json({ alerts });
  } catch (error) {
    return errorResponse(error);
  }
}
