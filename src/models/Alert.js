import mongoose from 'mongoose';

const { Schema } = mongoose;

const AlertResponseSchema = new Schema(
  {
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    mediaRefs: [{ type: String }],
    submittedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const AlertSchema = new Schema(
  {
    transaction: { type: Schema.Types.ObjectId, ref: 'Transaction', index: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    rule: { type: String, required: true },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'in_review', 'resolved', 'escalated'],
      default: 'open',
    },
    notes: { type: String },
    responses: [AlertResponseSchema],
    resolvedAt: { type: Date },
    resolvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

AlertSchema.index({ status: 1, severity: -1 });

export const Alert =
  mongoose.models.Alert || mongoose.model('Alert', AlertSchema);
