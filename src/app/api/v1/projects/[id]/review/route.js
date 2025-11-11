"use server";

import { z } from "zod";
import { connectToDatabase } from "../../../../../../backend/db/connection";
import Project from "../../../../../../backend/db/models/project";
import Tranche from "../../../../../../backend/db/models/tranche";
import AuditLog from "../../../../../../backend/db/models/audit-log";
import { requireAuth } from "../../../../../../backend/auth";
import { ApiError, errorResponse } from "../../../../../../backend/errors";
import { validateRequest } from "../../../../../../backend/validation";
import { emitEvent, notify } from "../../../../../../backend/events";

const reviewSchema = z.object({
  decision: z.enum(["approved", "rejected"]),
  notes: z.string().optional(),
  tranches: z
    .array(
      z.object({
        amount: z.number().positive(),
        conditionMilestoneId: z.string().optional(),
      })
    )
    .optional(),
});

export async function PATCH(request, { params }) {
  try {
    const { user } = await requireAuth(request, ["admin"]);
    const payload = await validateRequest(request, reviewSchema);

    await connectToDatabase();

    const project = await Project.findById(params.id);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    project.status = payload.decision;
    await project.save();

    await AuditLog.create({
      actor: user.id,
      action: "project_reviewed",
      entity: "project",
      entityId: project.id,
      details: {
        decision: payload.decision,
        notes: payload.notes,
      },
    });

    if (payload.decision === "approved" && payload.tranches?.length) {
      await Tranche.deleteMany({ project: project.id });
      const tranches = payload.tranches.map((tranche, index) => ({
        project: project.id,
        amount: tranche.amount,
        conditionMilestoneId: tranche.conditionMilestoneId,
        orderIndex: index,
      }));
      await Tranche.insertMany(tranches);
    }

    emitEvent(`project.${payload.decision}`, {
      projectId: project.id,
      reviewerId: user.id,
    });
    notify("beneficiary", `project_${payload.decision}`, {
      projectId: project.id,
    });

    return Response.json({ status: project.status });
  } catch (error) {
    return errorResponse(error);
  }
}

