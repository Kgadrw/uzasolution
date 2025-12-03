import mongoose from 'mongoose'

const fundingRequestSchema = new mongoose.Schema({
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
  supportingNotes: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
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

fundingRequestSchema.index({ project: 1, status: 1 })
fundingRequestSchema.index({ status: 1 })

export default mongoose.models.FundingRequest || mongoose.model('FundingRequest', fundingRequestSchema)


