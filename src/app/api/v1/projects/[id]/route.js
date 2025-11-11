"use server";

import { z } from "zod";
import { connectToDatabase } from "../../../../../backend/db/connection";
import Project from "../../../../../backend/db/models/project";
import Report from "../../../../../backend/db/models/report";
import AuditLog from "../../../../../backend/db/models/audit-log";
import { requireAuth } from "../../../../../backend/auth";
import { ApiError, errorResponse } from "../../../../../backend/errors";
import { emitEvent } from "../../../../../backend/events";
import { serializeProject } from "../../../../../backend/dto";
import { validateRequest } from "../../../../../backend/validation";

const updateSchema = z.object({
  status: z.enum(["completed"]).optional(),
});

export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    const project = await Project.findById(params.id);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    return Response.json({ project: serializeProject(project) });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request, { params }) {
  try {
    const { user } = await requireAuth(request, ["beneficiary", "admin"]);

    const payload = await validateRequest(request, updateSchema);

    await connectToDatabase();

    const project = await Project.findById(params.id);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    if (user.role === "beneficiary" && project.owner.toString() !== user.id) {
      throw new ApiError(403, "You do not own this project");
    }

    if (payload.status) {
      project.status = payload.status;
    }

    await project.save();

    await AuditLog.create({
      actor: user.id,
      action: "project_updated",
      entity: "project",
      entityId: project.id,
      details: payload,
    });

    if (payload.status === "completed") {
      const report = await Report.create({
        project: project.id,
        url: `https://reports.uzasolutions.com/${project.id}.pdf`,
        metadata: {
          generatedBy: user.id,
        },
      });

      emitEvent("project.completed", {
        projectId: project.id,
        reportId: report.id,
      });
    }

    return Response.json({ project: serializeProject(project) });
  } catch (error) {
    return errorResponse(error);
  }
}

