"use server";

import mongoose, { Schema } from "mongoose";

const PledgeSchema = new Schema(
  {
    donor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["initiated", "pledged", "failed"],
      default: "initiated",
    },
    paymentMethod: { type: String },
    paymentReference: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Pledge ||
  mongoose.model("Pledge", PledgeSchema);

