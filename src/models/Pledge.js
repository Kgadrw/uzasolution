import mongoose from 'mongoose';

const { Schema } = mongoose;

const PledgeSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    donor: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String },
    paymentReference: { type: String },
    status: {
      type: String,
      enum: ['initiated', 'pledged', 'failed', 'refunded'],
      default: 'initiated',
    },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

PledgeSchema.index({ project: 1, donor: 1 });

export const Pledge =
  mongoose.models.Pledge || mongoose.model('Pledge', PledgeSchema);
