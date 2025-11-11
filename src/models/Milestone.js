import mongoose from 'mongoose';

const { Schema } = mongoose;

const EvidenceSchema = new Schema(
  {
    mediaUrls: [{ type: String }],
    notes: { type: String },
    gps: {
      lat: { type: Number },
      lng: { type: Number },
    },
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    submittedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const MilestoneSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    title: { type: String, required: true },
    criteria: { type: String },
    orderIndex: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'evidence_submitted', 'approved', 'rejected', 'partial'],
      default: 'pending',
    },
    evidence: [EvidenceSchema],
    review: {
      decidedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      decidedAt: { type: Date },
      decisionNotes: { type: String },
    },
  },
  { timestamps: true },
);

MilestoneSchema.index({ project: 1, orderIndex: 1 });

export const Milestone =
  mongoose.models.Milestone || mongoose.model('Milestone', MilestoneSchema);
