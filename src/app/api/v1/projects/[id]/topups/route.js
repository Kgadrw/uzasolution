"use server";

import { z } from "zod";
import { connectToDatabase } from "../../../../../../backend/db/connection";
import Project from "../../../../../../backend/db/models/project";
import TopupRequest from "../../../../../../backend/db/models/topup-request";
import { requireAuth } from "../../../../../../backend/auth";
import { ApiError, errorResponse } from "../../../../../../backend/errors";
import { validateRequest } from "../../../../../../backend/validation";
import { emitEvent, notify } from "../../../../../../backend/events";
import { computeTopupScore } from "../../../../../../backend/scoring";

const topupSchema = z.object({
  amount: z.number().positive(),
  purpose: z.string().min(10),
  expectedRoi: z.string().optional(),
});

export async function POST(request, { params }) {
  try {
    const { user } = await requireAuth(request, ["beneficiary"]);
    const payload = await validateRequest(request, topupSchema);

    await connectToDatabase();

    const project = await Project.findById(params.id);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    if (project.owner.toString() !== user.id) {
      throw new ApiError(403, "You do not own this project");
    }

    const score = computeTopupScore({
      margin: project.currentBalance / Math.max(project.requestedAmount, 1),
      anomalies: 0,
      consistency: 1,
      runRate: project.totalPledged ? project.currentBalance / project.totalPledged : 0,
    });

    const topupRequest = await TopupRequest.create({
      project: project.id,
      requester: user.id,
      amount: payload.amount,
      purpose: payload.purpose,
      expectedRoi: payload.expectedRoi,
      autoScore: score,
    });

    emitEvent("topup.scored", { topupId: topupRequest.id, score });
    notify("admin", "topup_pending_review", {
      projectId: project.id,
      topupId: topupRequest.id,
      score,
    });

    return Response.json(
      {
        topupId: topupRequest.id,
        status: topupRequest.status,
        autoScore: score,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}

