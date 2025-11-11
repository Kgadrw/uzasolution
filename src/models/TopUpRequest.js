import mongoose from 'mongoose';

const { Schema } = mongoose;

const TopUpRequestSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    requestedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    purpose: { type: String },
    expectedRoi: { type: Number },
    autoScore: { type: Number },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true },
);

TopUpRequestSchema.index({ project: 1, status: 1 });

export const TopUpRequest =
  mongoose.models.TopUpRequest || mongoose.model('TopUpRequest', TopUpRequestSchema);
