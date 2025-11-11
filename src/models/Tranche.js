import mongoose from 'mongoose';

const { Schema } = mongoose;

const TrancheSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    amount: { type: Number, required: true },
    conditionMilestone: { type: Schema.Types.ObjectId, ref: 'Milestone' },
    orderIndex: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['locked', 'released', 'failed'],
      default: 'locked',
    },
    releasedAt: { type: Date },
    releasedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    paymentReference: { type: String },
  },
  { timestamps: true },
);

TrancheSchema.index({ project: 1, orderIndex: 1 });

export const Tranche =
  mongoose.models.Tranche || mongoose.model('Tranche', TrancheSchema);
