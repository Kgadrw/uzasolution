import { z } from 'zod';
import { connectToDatabase } from '../../../../lib/db';
import { validateRequest } from '../../../../lib/validation';
import { requireAuth } from '../../../../lib/auth';
import { errorResponse } from '../../../../lib/errors';
import { emitEvent } from '../../../../lib/events';
import { notify } from '../../../../lib/notifications';
import { Project } from '../../../../models/Project';
import { Milestone } from '../../../../models/Milestone';

const createProjectSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
      address: z.string().optional(),
    })
    .optional(),
  budget: z
    .array(
      z.object({
        lineItem: z.string(),
        amount: z.number().positive(),
      }),
    )
    .min(1),
  requestedAmount: z.number().positive(),
  milestones: z
    .array(
      z.object({
        title: z.string().min(3),
        criteria: z.string().optional(),
      }),
    )
    .min(1),
  attachments: z.array(z.string()).optional().default([]),
});

export async function POST(request) {
  try {
    const { user } = await requireAuth(request, ['beneficiary']);
    const payload = await validateRequest(request, createProjectSchema);

    await connectToDatabase();

    const project = await Project.create({
      owner: user.id,
      title: payload.title,
      description: payload.description,
      requestedAmount: payload.requestedAmount,
      budgetItems: payload.budget,
      attachments: payload.attachments,
      location: payload.location,
      milestonePlan: {
        summary: `${payload.milestones.length} milestones`,
      },
      status: 'pending_review',
    });

    await Milestone.insertMany(
      payload.milestones.map((milestone, index) => ({
        project: project.id,
        title: milestone.title,
        criteria: milestone.criteria,
        orderIndex: index,
      })),
    );

    emitEvent('project.created', { projectId: project.id, ownerId: user.id });
    notify('admin', 'New project pending review', { projectId: project.id });

    return Response.json(
      {
        projectId: project.id,
        status: project.status,
      },
      { status: 201 },
    );
  } catch (error) {
    return errorResponse(error);
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const ownerId = searchParams.get('ownerId');
    const includeMilestones = searchParams.get('includeMilestones') === 'true';

    await connectToDatabase();

    const query = {};
    if (status) {
      query.status = status;
    }
    if (ownerId) {
      query.owner = ownerId;
    }

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .lean();

    if (!includeMilestones) {
      return Response.json({ projects });
    }

    const projectIds = projects.map((project) => project._id);
    const milestones = await Milestone.find({ project: { $in: projectIds } })
      .sort({ orderIndex: 1 })
      .lean();

    const milestonesByProject = milestones.reduce((acc, milestone) => {
      const key = milestone.project.toString();
      acc[key] = acc[key] || [];
      acc[key].push(milestone);
      return acc;
    }, {});

    const enrichedProjects = projects.map((project) => ({
      ...project,
      milestones: milestonesByProject[project._id.toString()] || [],
    }));

    return Response.json({ projects: enrichedProjects });
  } catch (error) {
    return errorResponse(error);
  }
}
