"use server";

import mongoose, { Schema } from "mongoose";

const TrancheSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    amount: { type: Number, required: true },
    conditionMilestoneId: { type: Schema.Types.ObjectId, ref: "Project.milestones" },
    orderIndex: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["locked", "released", "failed"],
      default: "locked",
    },
    releasedAt: Date,
    releasedBy: { type: Schema.Types.ObjectId, ref: "User" },
    paymentReference: String,
  },
  { timestamps: true }
);

export default mongoose.models.Tranche ||
  mongoose.model("Tranche", TrancheSchema);

