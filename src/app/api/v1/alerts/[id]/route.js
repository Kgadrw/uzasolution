"use server";

import { z } from "zod";
import { connectToDatabase } from "../../../../../backend/db/connection";
import Alert from "../../../../../backend/db/models/alert";
import Project from "../../../../../backend/db/models/project";
import Tranche from "../../../../../backend/db/models/tranche";
import { requireAuth } from "../../../../../backend/auth";
import { ApiError, errorResponse } from "../../../../../backend/errors";
import { validateRequest } from "../../../../../backend/validation";
import { emitEvent, notify } from "../../../../../backend/events";

const updateSchema = z.object({
  status: z.enum(["request_more_info", "freeze_project", "dismiss", "resolve"]),
  notes: z.string().optional(),
});

const statusMap = {
  request_more_info: "in_review",
  freeze_project: "escalated",
  dismiss: "resolved",
  resolve: "resolved",
};

export async function PATCH(request, { params }) {
  try {
    const { user } = await requireAuth(request, ["admin"]);
    const payload = await validateRequest(request, updateSchema);

    await connectToDatabase();

    const alert = await Alert.findById(params.id).populate("transaction");
    if (!alert) {
      throw new ApiError(404, "Alert not found");
    }

    alert.status = statusMap[payload.status] ?? alert.status;
    alert.notes = payload.notes ?? alert.notes;
    await alert.save();

    if (payload.status === "freeze_project") {
      const project = await Project.findById(alert.transaction.project);
      if (project) {
        project.status = "frozen";
        await project.save();
        await Tranche.updateMany(
          { project: project.id },
          { $set: { status: "locked" } }
        );
      }
    }

    emitEvent("alert.updated", {
      alertId: alert.id,
      status: alert.status,
      actorId: user.id,
    });
    notify("beneficiary", "alert_updated", {
      alertId: alert.id,
      status: alert.status,
    });

    return Response.json({ status: alert.status });
  } catch (error) {
    return errorResponse(error);
  }
}

