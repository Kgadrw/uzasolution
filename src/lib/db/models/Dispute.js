import mongoose from 'mongoose'

const disputeSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  raisedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['transaction', 'milestone', 'payment', 'other'],
    required: true,
  },
  title: String,
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'under_review', 'resolved', 'dismissed'],
    default: 'pending',
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
  resolution: String,
  relatedEntity: {
    type: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true,
})

disputeSchema.index({ project: 1, status: 1 })
disputeSchema.index({ raisedBy: 1 })

export default mongoose.models.Dispute || mongoose.model('Dispute', disputeSchema)


