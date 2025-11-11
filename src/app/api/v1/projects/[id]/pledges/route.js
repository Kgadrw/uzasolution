"use server";

import { z } from "zod";
import { connectToDatabase } from "../../../../../../backend/db/connection";
import Project from "../../../../../../backend/db/models/project";
import Pledge from "../../../../../../backend/db/models/pledge";
import Transaction from "../../../../../../backend/db/models/transaction";
import { requireAuth } from "../../../../../../backend/auth";
import { ApiError, errorResponse } from "../../../../../../backend/errors";
import { validateRequest } from "../../../../../../backend/validation";
import { emitEvent, notify } from "../../../../../../backend/events";

const pledgeSchema = z.object({
  amount: z.number().positive(),
  paymentMethod: z.string().min(2),
});

export async function POST(request, { params }) {
  try {
    const { user } = await requireAuth(request, ["donor"]);
    const payload = await validateRequest(request, pledgeSchema);

    await connectToDatabase();

    const project = await Project.findById(params.id);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    if (project.status !== "approved") {
      throw new ApiError(400, "Project is not accepting pledges");
    }

    const pledge = await Pledge.create({
      donor: user.id,
      project: project.id,
      amount: payload.amount,
      paymentMethod: payload.paymentMethod,
      status: "pledged",
      paymentReference: `pledge-${Date.now()}`,
    });

    await Transaction.create({
      project: project.id,
      user: user.id,
      type: "pledge",
      amount: payload.amount,
      status: "confirmed",
      pledge: pledge.id,
      notes: `Pledge via ${payload.paymentMethod}`,
    });

    project.totalPledged += payload.amount;
    await project.save();

    emitEvent("pledge.confirmed", { pledgeId: pledge.id, projectId: project.id });
    notify("donor", "pledge_confirmed", { projectId: project.id });

    return Response.json(
      {
        pledgeId: pledge.id,
        status: pledge.status,
        totalPledged: project.totalPledged,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}

