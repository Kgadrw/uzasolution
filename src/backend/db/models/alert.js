"use server";

import mongoose, { Schema } from "mongoose";

const AlertSchema = new Schema(
  {
    transaction: { type: Schema.Types.ObjectId, ref: "Transaction", required: true },
    rules: [{ type: String }],
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in_review", "resolved", "escalated"],
      default: "open",
    },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.models.Alert || mongoose.model("Alert", AlertSchema);

