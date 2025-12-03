import mongoose from 'mongoose'

const alertSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  type: {
    type: String,
    enum: ['anomaly', 'kyc_expired', 'milestone_overdue', 'risk', 'other'],
    required: true,
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  },
  title: String,
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'resolved', 'dismissed'],
    default: 'open',
  },
  raisedAt: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: Date,
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  metadata: mongoose.Schema.Types.Mixed,
}, {
  timestamps: true,
})

alertSchema.index({ project: 1, status: 1 })
alertSchema.index({ status: 1, severity: 1 })

export default mongoose.models.Alert || mongoose.model('Alert', alertSchema)


