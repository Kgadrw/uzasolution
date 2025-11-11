"use server";

import { z } from "zod";
import { connectToDatabase } from "../../../../../../backend/db/connection";
import Project from "../../../../../../backend/db/models/project";
import { requireAuth } from "../../../../../../backend/auth";
import { ApiError, errorResponse } from "../../../../../../backend/errors";
import { validateRequest } from "../../../../../../backend/validation";
import { emitEvent, notify } from "../../../../../../backend/events";

const evidenceSchema = z.object({
  media: z
    .array(
      z.object({
        url: z.string().url(),
        type: z.string().optional(),
      })
    )
    .min(1),
  notes: z.string().optional(),
  gps: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});

export async function POST(request, { params }) {
  try {
    const { user } = await requireAuth(request, ["beneficiary"]);
    const payload = await validateRequest(request, evidenceSchema);

    await connectToDatabase();

    const project = await Project.findOne({ "milestones._id": params.id });
    if (!project) {
      throw new ApiError(404, "Milestone not found");
    }
    if (project.owner.toString() !== user.id) {
      throw new ApiError(403, "You do not own this project");
    }

    const milestone = project.milestones.id(params.id);
    milestone.status = "evidence_submitted";
    milestone.evidence.push({
      media: payload.media,
      notes: payload.notes,
      submittedAt: new Date(),
      submittedBy: user.id,
    });

    await project.save();

    emitEvent("milestone.evidence.submitted", {
      projectId: project.id,
      milestoneId: milestone.id,
    });
    notify("admin", "milestone_evidence_submitted", {
      projectId: project.id,
      milestoneId: milestone.id,
    });

    return Response.json({ status: milestone.status });
  } catch (error) {
    return errorResponse(error);
  }
}

