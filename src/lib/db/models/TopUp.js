import mongoose from 'mongoose'

const topUpSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  requestedAmount: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  milestoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Milestone',
  },
  expectedRevenue: Number,
  expectedTimeline: String,
  supportingNotes: String,
  supportingFiles: [String],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  score: Number, // Auto-calculated score
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: Date,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rejectionReason: String,
}, {
  timestamps: true,
})

topUpSchema.index({ project: 1, status: 1 })
topUpSchema.index({ status: 1 })

export default mongoose.models.TopUp || mongoose.model('TopUp', topUpSchema)


