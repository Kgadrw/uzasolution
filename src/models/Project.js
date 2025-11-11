import mongoose from 'mongoose';

const { Schema } = mongoose;

const LocationSchema = new Schema(
  {
    address: { type: String },
    lat: { type: Number },
    lng: { type: Number },
  },
  { _id: false },
);

const BudgetItemSchema = new Schema(
  {
    lineItem: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false },
);

const MilestonePlanSchema = new Schema(
  {
    summary: { type: String },
    notes: { type: String },
  },
  { _id: false },
);

const ProjectSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['pending_review', 'approved', 'rejected', 'frozen', 'completed', 'archived'],
      default: 'pending_review',
    },
    location: LocationSchema,
    requestedAmount: { type: Number, required: true },
    budgetItems: [BudgetItemSchema],
    milestonePlan: MilestonePlanSchema,
    attachments: [{ type: String }],
    adminNotes: { type: String },
    analyticsSnapshot: { type: Schema.Types.Mixed },
    currentBalance: { type: Number, default: 0 },
    totalPledged: { type: Number, default: 0 },
    archived: { type: Boolean, default: false },
    approvedAt: { type: Date },
    frozenAt: { type: Date },
  },
  { timestamps: true },
);

ProjectSchema.index({ status: 1 });
ProjectSchema.index({ owner: 1, status: 1 });

export const Project =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema);
