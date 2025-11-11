"use server";

import mongoose, { Schema } from "mongoose";

const BudgetItemSchema = new Schema(
  {
    label: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const MilestoneSchema = new Schema(
  {
    title: { type: String, required: true },
    criteria: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "evidence_submitted", "approved", "rejected", "partial"],
      default: "pending",
    },
    evidence: [
      {
        media: [
          {
            url: String,
            type: String,
          },
        ],
        notes: String,
        submittedAt: Date,
        submittedBy: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    orderIndex: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ProjectSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      lat: Number,
      lng: Number,
      address: String,
    },
    requestedAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending_review", "approved", "rejected", "frozen", "completed"],
      default: "pending_review",
    },
    budgetItems: [BudgetItemSchema],
    attachments: [
      {
        label: String,
        url: String,
      },
    ],
    milestones: [MilestoneSchema],
    totalPledged: { type: Number, default: 0 },
    currentBalance: { type: Number, default: 0 },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);

