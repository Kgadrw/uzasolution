"use server";

import { z } from "zod";
import { connectToDatabase } from "../../../../../../backend/db/connection";
import Project from "../../../../../../backend/db/models/project";
import AuditLog from "../../../../../../backend/db/models/audit-log";
import { requireAuth } from "../../../../../../backend/auth";
import { ApiError, errorResponse } from "../../../../../../backend/errors";
import { validateRequest } from "../../../../../../backend/validation";
import { emitEvent, notify } from "../../../../../../backend/events";

const reviewSchema = z.object({
  status: z.enum(["approved", "rejected", "partial"]),
  notes: z.string().optional(),
});

export async function PATCH(request, { params }) {
  try {
    const { user } = await requireAuth(request, ["admin"]);
    const payload = await validateRequest(request, reviewSchema);

    await connectToDatabase();

    const project = await Project.findOne({ "milestones._id": params.id });
    if (!project) {
      throw new ApiError(404, "Milestone not found");
    }

    const milestone = project.milestones.id(params.id);
    milestone.status = payload.status;

    await project.save();

    await AuditLog.create({
      actor: user.id,
      action: "milestone_reviewed",
      entity: "milestone",
      entityId: milestone.id,
      details: {
        status: payload.status,
        notes: payload.notes,
        projectId: project.id,
      },
    });

    emitEvent(`milestone.${payload.status}`, {
      projectId: project.id,
      milestoneId: milestone.id,
    });
    notify("beneficiary", `milestone_${payload.status}`, {
      projectId: project.id,
      milestoneId: milestone.id,
    });

    return Response.json({ status: milestone.status });
  } catch (error) {
    return errorResponse(error);
  }
}

