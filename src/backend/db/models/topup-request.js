"use server";

import mongoose, { Schema } from "mongoose";

const TopupRequestSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    requester: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    purpose: { type: String, required: true },
    expectedRoi: String,
    autoScore: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    decisionBy: { type: Schema.Types.ObjectId, ref: "User" },
    decisionNotes: String,
  },
  { timestamps: true }
);

export default mongoose.models.TopupRequest ||
  mongoose.model("TopupRequest", TopupRequestSchema);

