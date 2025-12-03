import mongoose from 'mongoose'

const evidenceSchema = new mongoose.Schema({
  url: String,
  type: String,
  description: String,
  uploadedAt: Date,
}, { _id: false })

const milestoneSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  targetDate: Date,
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'evidence_submitted', 'approved', 'rejected'],
    default: 'not_started',
  },
  evidence: [evidenceSchema],
  submittedAt: Date,
  reviewedAt: Date,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  adminComment: String,
  trancheAmount: Number,
  trancheId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  completedAt: Date,
}, {
  timestamps: true,
})

milestoneSchema.index({ project: 1, status: 1 })
milestoneSchema.index({ status: 1 })

export default mongoose.models.Milestone || mongoose.model('Milestone', milestoneSchema)


