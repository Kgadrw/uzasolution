"use server";

import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["pledge", "disbursement", "expense", "revenue"],
      required: true,
    },
    amount: { type: Number, required: true },
    category: String,
    status: {
      type: String,
      enum: ["initiated", "recorded", "confirmed", "failed"],
      default: "recorded",
    },
    tranche: { type: Schema.Types.ObjectId, ref: "Tranche" },
    pledge: { type: Schema.Types.ObjectId, ref: "Pledge" },
    notes: String,
    media: [
      {
        url: String,
        type: String,
      },
    ],
    gps: {
      lat: Number,
      lng: Number,
    },
    occurredAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);

