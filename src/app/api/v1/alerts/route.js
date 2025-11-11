"use server";

import { connectToDatabase } from "../../../../backend/db/connection";
import Alert from "../../../../backend/db/models/alert";
import { requireAuth } from "../../../../backend/auth";
import { errorResponse } from "../../../../backend/errors";

export async function GET(request) {
  try {
    await requireAuth(request, ["admin"]);
    await connectToDatabase();

    const alerts = await Alert.find({})
      .populate({
        path: "transaction",
        select: "project amount type status createdAt",
      })
      .sort({ createdAt: -1 });

    return Response.json({ alerts });
  } catch (error) {
    return errorResponse(error);
  }
}

