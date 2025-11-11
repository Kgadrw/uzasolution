import mongoose from 'mongoose';

const { Schema } = mongoose;

const GpsSchema = new Schema(
  {
    lat: { type: Number },
    lng: { type: Number },
  },
  { _id: false },
);

const TransactionSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['expense', 'revenue', 'pledge', 'disbursement'],
      required: true,
    },
    amount: { type: Number, required: true },
    category: { type: String },
    status: {
      type: String,
      enum: ['recorded', 'confirmed', 'flagged', 'rejected'],
      default: 'recorded',
    },
    mediaRefs: [{ type: String }],
    gps: GpsSchema,
    occurredAt: { type: Date, default: Date.now },
    notes: { type: String },
    pledge: { type: Schema.Types.ObjectId, ref: 'Pledge' },
    tranche: { type: Schema.Types.ObjectId, ref: 'Tranche' },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

TransactionSchema.index({ project: 1, occurredAt: -1 });

export const Transaction =
  mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
