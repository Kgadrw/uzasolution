"use server";

import { z } from "zod";
import { connectToDatabase } from "../../../../../../backend/db/connection";
import Project from "../../../../../../backend/db/models/project";
import Transaction from "../../../../../../backend/db/models/transaction";
import Alert from "../../../../../../backend/db/models/alert";
import { requireAuth } from "../../../../../../backend/auth";
import { ApiError, errorResponse } from "../../../../../../backend/errors";
import { validateRequest } from "../../../../../../backend/validation";
import { emitEvent, notify } from "../../../../../../backend/events";

const transactionSchema = z.object({
  type: z.enum(["expense", "revenue"]),
  amount: z.number().positive(),
  category: z.string().optional(),
  notes: z.string().optional(),
  media: z
    .array(
      z.object({
        url: z.string().url(),
        type: z.string().optional(),
      })
    )
    .optional(),
  gps: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  occurredAt: z.string().optional(),
});

function maybeCreateAlert(transaction, project) {
  const flags = [];

  if (transaction.amount > project.requestedAmount * 0.5) {
    flags.push("velocity_spike");
  }
  if (transaction.media?.length >= 2) {
    const uniqueUrls = new Set(transaction.media.map((media) => media.url));
    if (uniqueUrls.size !== transaction.media.length) {
      flags.push("duplicate_receipt");
    }
  }

  if (!flags.length) {
    return null;
  }

  const severity = flags.includes("velocity_spike") ? "high" : "medium";
  return Alert.create({
    transaction: transaction.id,
    rules: flags,
    severity,
  });
}

export async function POST(request, { params }) {
  try {
    const { user } = await requireAuth(request, ["beneficiary"]);
    const payload = await validateRequest(request, transactionSchema);

    await connectToDatabase();

    const project = await Project.findById(params.id);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    if (project.owner.toString() !== user.id) {
      throw new ApiError(403, "You do not own this project");
    }

    const transaction = await Transaction.create({
      project: project.id,
      user: user.id,
      type: payload.type,
      amount: payload.amount,
      category: payload.category,
      status: "recorded",
      media: payload.media,
      gps: payload.gps,
      notes: payload.notes,
      occurredAt: payload.occurredAt ? new Date(payload.occurredAt) : undefined,
    });

    if (payload.type === "expense") {
      project.currentBalance -= payload.amount;
      if (project.currentBalance < 0) {
        project.currentBalance = 0;
      }
    } else {
      project.currentBalance += payload.amount;
    }
    await project.save();

    emitEvent("transaction.recorded", {
      transactionId: transaction.id,
      projectId: project.id,
    });

    const alert = await maybeCreateAlert(transaction, project);
    if (alert) {
      emitEvent("alert.created", { alertId: alert.id });
      notify("admin", "risk_alert", {
        projectId: project.id,
        alertId: alert.id,
      });
    }

    return Response.json(
      {
        transactionId: transaction.id,
        status: transaction.status,
        currentBalance: project.currentBalance,
        alertId: alert?.id ?? null,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}

