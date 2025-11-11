"use server";

import { z } from "zod";
import { connectToDatabase } from "../../../../../backend/db/connection";
import Project from "../../../../../backend/db/models/project";
import { requireAuth } from "../../../../../backend/auth";
import { errorResponse } from "../../../../../backend/errors";
import { validateRequest } from "../../../../../backend/validation";
import { emitEvent, notify } from "../../../../../backend/events";
import { serializeProject } from "../../../../../backend/dto";

const createProjectSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  location: z
    .object({
      lat: z.number().optional(),
      lng: z.number().optional(),
      address: z.string().optional(),
    })
    .optional(),
  budget: z
    .array(
      z.object({
        label: z.string(),
        amount: z.number().positive(),
      })
    )
    .min(1),
  requestedAmount: z.number().positive(),
  attachments: z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      })
    )
    .optional()
    .default([]),
  milestones: z
    .array(
      z.object({
        title: z.string(),
        criteria: z.string(),
      })
    )
    .min(1),
});

export async function POST(request) {
  try {
    const { user } = await requireAuth(request, ["beneficiary"]);
    const payload = await validateRequest(request, createProjectSchema);

    await connectToDatabase();

    const project = await Project.create({
      owner: user.id,
      title: payload.title,
      description: payload.description,
      location: payload.location,
      requestedAmount: payload.requestedAmount,
      budgetItems: payload.budget,
      attachments: payload.attachments,
      milestones: payload.milestones.map((milestone, index) => ({
        ...milestone,
        orderIndex: index,
      })),
      status: "pending_review",
    });

    emitEvent("project.created", { projectId: project.id, ownerId: user.id });
    notify("admin", "project_pending_review", {
      projectId: project.id,
      title: project.title,
    });

    return Response.json(
      {
        project: serializeProject(project),
      },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    await connectToDatabase();

    const query = {};
    if (status) {
      query.status = status;
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });

    return Response.json(
      {
        projects: projects.map(serializeProject),
      },
      { status: 200 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}

