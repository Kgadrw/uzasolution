"use server";

import mongoose, { Schema } from "mongoose";

const ReportSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    url: { type: String, required: true },
    generatedAt: { type: Date, default: Date.now },
    metadata: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export default mongoose.models.Report ||
  mongoose.model("Report", ReportSchema);

