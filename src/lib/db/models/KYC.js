import mongoose from 'mongoose'

const kycDocumentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['id', 'passport', 'business_registration', 'bank_statement', 'other'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: false })

const kycSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  status: {
    type: String,
    enum: ['pending', 'under_review', 'verified', 'rejected', 'expired'],
    default: 'pending',
  },
  documents: [kycDocumentSchema],
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
  expiresAt: Date,
  notes: String,
}, {
  timestamps: true,
})

kycSchema.index({ user: 1, status: 1 })
kycSchema.index({ status: 1 })

export default mongoose.models.KYC || mongoose.model('KYC', kycSchema)


