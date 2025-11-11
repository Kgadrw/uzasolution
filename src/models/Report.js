import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReportSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    url: { type: String, required: true },
    generatedAt: { type: Date, default: Date.now },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

export const Report =
  mongoose.models.Report || mongoose.model('Report', ReportSchema);
