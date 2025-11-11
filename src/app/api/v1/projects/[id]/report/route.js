"use server";

import { connectToDatabase } from "../../../../../../backend/db/connection";
import Report from "../../../../../../backend/db/models/report";
import Project from "../../../../../../backend/db/models/project";
import { requireAuth } from "../../../../../../backend/auth";
import { ApiError, errorResponse } from "../../../../../../backend/errors";

export async function GET(request, { params }) {
  try {
    await requireAuth(request, ["donor", "admin", "beneficiary"]);
    await connectToDatabase();

    const project = await Project.findById(params.id);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    const report = await Report.findOne({ project: project.id }).sort({
      createdAt: -1,
    });

    if (!report) {
      throw new ApiError(404, "Report not available yet");
    }

    return Response.json({
      report: {
        id: report.id,
        url: report.url,
        generatedAt: report.generatedAt,
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}

